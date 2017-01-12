'use strict';

const fs = require('fs');
const EventEmitter = require('events');

const CONFIG_TO_CONSUL_KEY_MAP = [
  ['database', 'MYSQL_DATABASE'],
  ['username', 'MYSQL_USER'],
  ['password', 'MYSQL_PASSWORD'],
  ['dialect', 'MYSQL_DIALECT']
];
const DB_SERVICE_NAME = 'mysql';

/*
 * NOTE: Consul must be accessible on a network the service is
 * on. Consul and services are located on different
 * netwoks due to different value of "network_mode"
 * parameter ("host" for consul and "bridge" as default
 * value for services).  Therefore consul client address
 * must include the host's interface on services' network
 * which also serves as the network's gateway.  It is
 * accomplished by running consul with -client=0.0.0.0
 * which binds to all host's interfaces including the one
 * on services' network.  The gateway IP address must be
 * discovered at each service startup.
 */
let consulPromise = new Promise((resolve, reject) => {
  let Consul = require('consul');
  let consul = Consul({ host: 'consul' });

  let dbWatch = consul.watch({
    method: consul.kv.get,
    options: { key: 'MYSQL_DATABASE' }
  });

  dbWatch.on('error', err => {
    console.log('"consul" hostname does not work for Consul service. Trying default gateway...')

    fs.readFile('/proc/net/route', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      let gateway;

      data.split('\n').some(line => {
        let parts = line.split('\t');

        if (parts[1] !== '00000000') {
          return false;
        }

        gateway = parts[2].match(/.{2}/g).map(hex => parseInt(hex, 16)).reverse().join('.');
        return true;
      });

      if (gateway) {
        resolve(Consul({ host: gateway }));
      } else {
        reject('Unable to parse "/proc/net/route"');
      }

      return;
    });
  });

  dbWatch.on('change', data => {  // eslint-disable-line no-loop-func
    resolve(consul);
  });
});

function getServicesNames(tag) {
  // tag is optional.
  //
  // The function returns a promise of an array of names of all services with specified tag (string)
  // or an array of names of all services if tag is not specified.
  return consulPromise.
    then(consul => consul.catalog.service.list((err, allServices) => {
      if (err) {
        return err;
      }

      return Object.keys(allServices).reduce((rez, serviceName) => {
        let serviceTags = allServices[serviceName];

        if (!tag || serviceTags.indexOf(tag) !== -1) {
          rez.push(serviceName);
        }

        return rez;
      }, []);
    }));
}

function getServiceDetails(serviceName) {
  // The function returns a promise of an object describing a service with specified name. Object format:
  // {
  //   name: "<service name>",
  //   ip: "<service address>",
  //   port: "<service port>",
  //   tags: ["service tag", ...]
  // }
  return consulPromise.
    then(consul => consul.catalog.service.nodes(serviceName, (err, nodesInfo) => {
      if (err) {
        return err;
      }

      let serviceInfo = nodesInfo[0];

      return {
        name: serviceInfo.ServiceName,
        ip: serviceInfo.ServiceAddress || serviceInfo.Address,
        port: serviceInfo.ServicePort,
        tags: serviceInfo.ServiceTags
      };
    }));
}

function getServicesDetails(servicesNames, tag) {
  // The function accepts two optional arguments:
  // 1. [optional, array] names of services. All services if not specified.
  // 2. [optional, string] tag to use for services filtering. Services aren't filtered by tag if not specified
  //
  // The function returns a promise of array of objects. Each object contains details about
  // requested services in the following format:
  // {
  //   name: "<service name>",
  //   ip: "<service address>",
  //   port: "<service port>",
  //   tags: ["service tag", ...]
  // }

  if (arguments.length === 1 && typeof arguments[0] === 'string') {
    servicesNames = undefined;  // eslint-disable-line no-param-reassign
    tag = arguments[0];  // eslint-disable-line no-param-reassign
  }

  return (servicesNames ? Promise.resolve(servicesNames) : getServicesNames()).
    then(servicesNames => Promise.all(servicesNames.map(serviceName => getServiceDetails(serviceName)))).
    then(servicesDetails => servicesDetails.filter(serviceDetails => !tag || serviceDetails.tags.indexOf(tag) !== -1))
}

function getHostnamePort(hostname) {
  const dns = require('dns');

  return Promise.all([
    new Promise((resolve, reject) => dns.lookup(hostname, function(err, ip) {
      if (err) {
        reject(err);
      } else {
        resolve(ip);
      }
    })),
    getServicesDetails()
  ]).
    then(([ip, allServices]) => {
      let port;

      for (let curService of allServices) {
        if (curService.ip === ip) {
          port = curService.port;
          break;
        }
      }

      return port;
    });
}

class ConsulEmitter extends EventEmitter {
  integrationServices = {};
  dbConfig = {};

  constructor() {
    super();

    consulPromise.then(consul => {
      for (let [configKey, consulKey] of CONFIG_TO_CONSUL_KEY_MAP) {
        let dbWatch = consul.watch({
          method: consul.kv.get,
          options: { key: consulKey }
        });

        dbWatch.on('error', err => this.emit('dbConfig', 'error', err));

        dbWatch.on('change', data => {  // eslint-disable-line no-loop-func
          console.log(`===== CHANGE EVENT FOR "${consulKey}" KV OF TYPE ${typeof data}`, data);
          if (data && this.dbConfig[configKey] !== data.Value) {
            this.emit(
              'dbConfig',
              this.dbConfig.hasOwnProperty(configKey) ? 'update' : 'add',
              { [configKey]: data.Value }
            );

            this.dbConfig[configKey] = data.Value;
          } else if (!data && this.dbConfig.hasOwnProperty(configKey)) {
            delete this.dbConfig[configKey];
            this.emit('dbConfig', 'delete', { [configKey]: undefined });
          }
        });
      }

      this._watchDbService(consul);
      this._watchIntegrationServices(consul);
    });

    this.on('newListener', (event, listener) => {
      console.log('===== NEW LISTENER FOR EVENT', event);
      switch (event) {
        case 'service':  // Inform new listener about all available services.
          Object.keys(this.integrationServices).forEach(serviceName => {
            let details = {
              ...this.integrationServices[serviceName],
              name: serviceName
            };

            delete details.watch;
            console.log('===== SENDING "add" EVENT TO NEW LISTENER:', details);
            listener('add', details);
          });
          break;
        case 'dbConfig':
          if (Object.keys(this.dbConfig).length) {
            listener('add', this.dbConfig);
          }
          break;
        default:
          throw new Error(`Unknown event "${event}"`);
      }
    });
  }

  _watchDbService(consul) {
    let serviceWatch = consul.watch({
      method: consul.catalog.service.nodes,
      options: {
        service: DB_SERVICE_NAME
      }
    });

    serviceWatch.on('error', err => this.emit('dbConfig', 'error', err));

    serviceWatch.on('change', nodesInfo => {  // NOTE: first event happens immediatelly after watch call.
      console.log(`===== CHANGE EVENT FOR "${DB_SERVICE_NAME}" SERVICE TYPE ${typeof nodesInfo}`, nodesInfo);
      if (nodesInfo.length === 0) {
        // DB service has been unregistered in Consul.
        delete this.dbConfig.host;
        delete this.dbConfig.port;
        this.emit('dbConfig', 'delete', 'host');
        this.emit('dbConfig', 'delete', 'port');
        return;
      }

      let serviceInfo = nodesInfo[0];
      let ip = serviceInfo.ServiceAddress || serviceInfo.Address;
      let port = serviceInfo.ServicePort;

      if (this.dbConfig.hasOwnProperty('host')) {
        // DB service details have been changed in Consul.
        let updatedInfo = {};

        if (ip !== this.dbConfig.host) {
          this.dbConfig.host = updatedInfo.host = ip;
        }

        if (port !== this.dbConfig.port) {
          this.dbConfig.port = updatedInfo.port = port;
        }

        if (Object.keys(updatedInfo).length !== 0) {
          this.emit('dbConfig', 'update', updatedInfo);
        }

        return;
      }

      // DB service has been registered in Consul.
      this.dbConfig = {
        ...this.dbConfig,
        host: ip,
        port
      };

      this.emit('dbConfig', 'add', {
        host: ip,
        port
      });

      return;
    });
  }

  _watchIntegrationServices(consul) {
    let servicesListWatch = consul.watch({
      method: consul.catalog.service.list
    });

    servicesListWatch.on('error', err => this.emit('service', 'error', err));

    servicesListWatch.on('change', allServices => {  // NOTE: first event happens immediatelly after watch call.
      console.log(`===== CHANGE EVENT FOR ALL SERVICES LISTING TYPE ${typeof allServices}`, allServices);
      let updatedServices = Object.keys(allServices).reduce((hash, serviceName) => {
        if (allServices[serviceName].indexOf('external') === -1) {
          return hash;
        }

        if (!this.integrationServices[serviceName]) {  // New service has been registered in Consul.
          this._processIntegrationServiceRegistration(consul, serviceName);
        }

        return {
          ...hash,
          [serviceName]: true
        };
      }, {});

      Object.keys(this.integrationServices).forEach(serviceName => {
        if (!updatedServices[serviceName]) {  // The service has been unregistered in Consul.
          this.integrationServices[serviceName].watch.end();
          delete this.integrationServices[serviceName];
          console.log('===== EMITTING "service" "delete"', { name: serviceName });
          console.log('===== THIS.INTEGRATION-SERVICES IS NOW', this.integrationServices);
          this.emit('service', 'delete', { name: serviceName });
        }
      });
    });
  }

  _processIntegrationServiceRegistration(consul, serviceName) {
    let serviceWatch = consul.watch({
      method: consul.catalog.service.nodes,
      options: {
        service: serviceName
      }
    });

    serviceWatch.on('error', err => this.emit('service', 'error', err));

    serviceWatch.on('change', nodesInfo => {  // NOTE: first event happens immediatelly after watch call.
      console.log(`===== CHANGE EVENT FOR "${serviceName}" SERVICE: TYPE ${typeof nodesInfo}`, nodesInfo);
      let integrationService = this.integrationServices[serviceName];

      if (nodesInfo.length === 0) {
        // The service has been unregistered in Consul => let "consul.catalog.service.list" watch deal with it.
        return;
      }

      let serviceInfo = nodesInfo[0];
      let ip = serviceInfo.ServiceAddress || serviceInfo.Address;
      let port = serviceInfo.ServicePort;

      if (integrationService) {
        // The service details have been changed in Consul.
        let updatedInfo = {};

        if (ip !== integrationService.ip) {
          integrationService.ip = updatedInfo.ip = ip;
        }

        if (port !== integrationService.port) {
          integrationService.port = updatedInfo.port = port;
        }

        if (Object.keys(updatedInfo).length) {
          console.log('===== EMITTING "service" "update"', { ...updatedInfo, name: serviceName });
          console.log('===== THIS.INTEGRATION-SERVICES IS NOW', this.integrationServices);
          this.emit('service', 'update', {
            ...updatedInfo,
            name: serviceName
          });
        }

        return;
      }

      // New service has been registered in Consul.
      this.integrationServices[serviceName] = {
        ip,
        port,
        watch: serviceWatch
      };

      console.log('===== EMITTING "service" "add"', { name: serviceName, ip, port });
      console.log('===== THIS.INTEGRATION-SERVICES IS NOW', this.integrationServices);
      this.emit('service', 'add', {
        name: serviceName,
        ip,
        port
      });

      return;
    });
  }
}

module.exports = {
  getServicesNames,
  getServiceDetails,
  getServicesDetails,
  getHostnamePort,
  emitter: new ConsulEmitter()
};

