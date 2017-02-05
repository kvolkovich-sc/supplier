'use strict';

const fs = require('fs');

const SHOW_HIDDEN = true;
const MAX_DEPTH = 9;
const RETRIES_COUNT = 20;
const RETRY_INTERVAL = 1000;  // in milliseconds.

function firstResolved(promises) {
  // The function returns a promise which
  // * resolves with a value of first resolved promise from input array, or
  // * rejects with reasons array - when all input promises gets rejected (order is not observed).
  return new Promise((resolve, reject) => {
    let errors = [];

    promises.forEach((promise, index) => promise.
      then(value => resolve(value)).
      catch(err => promises.length === errors.push(err) && reject(errors))
    );
  })
}

function retriedPromise(promiseFunction) {
  // promiseFunction is an async function returning a promise.
  return new Promise((resolve, reject) => {
    let setDbConnectionTimeout = function() {
      let currentRetry = arguments.length ? arguments[0] : 1;

      promiseFunction().
        then(rez => resolve(rez)).
        catch(err => {
          if (currentRetry === RETRIES_COUNT) {
            reject(err);
          } else {
            setTimeout(setDbConnectionTimeout, RETRY_INTERVAL, currentRetry + 1);
          }
        });
    };

    setDbConnectionTimeout();
  });
}

function retriedCallback(callbackFunction) {
  // callbackFunction is an async function accepting the only argument which is callback.
  return retriedPromise(() => new Promise(
    (resolve, reject) => callbackFunction(
      (err, rez) => err ? reject(err) : resolve(rez)
    )
  ));
}

function _valueDeepSearch(input, value, prefix = '', depth = 0, isHidden = false) {
  if (input === value) {
    return [{
      prefix,
      isHidden,
      depth
    }];
  }

  if (
    depth === MAX_DEPTH ||
    typeof input !== 'object' ||
    input instanceof Date ||
    !input
  ) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.reduce((rez, elem, index) => [
      ...rez,
      ..._valueDeepSearch(
        elem,
        value,
        prefix + '[' + index + ']',
        depth + 1,
        isHidden
      )
    ], []);
  }

  return Object.keys(input).
    reduce((rez, propName) => [
      ...rez,
      ..._valueDeepSearch(
        input[propName],
        value,
        prefix + '.' + propName,
        depth + 1,
        isHidden || propName.charAt(0) === '_'
      )
    ], []);
}

function _sortAndFilter(arr) {
  return arr.
    sort((a, b) => (a.isHidden === b.isHidden) ? (a.depth - b.depth) : (a.isHidden - b.isHidden)).
    filter(a => SHOW_HIDDEN || !a.isHidden).
    map(a => a.prefix);
}

function valueDeepSearch(input, value) {
  return _sortAndFilter(_valueDeepSearch(input, value));
}

function _propDeepSearch(input, value, prefix = '', depth = 0, isHidden = false) {
  if (
    depth === MAX_DEPTH ||
    typeof input !== 'object' ||
    input instanceof Date ||
    !input
  ) {
    return [];
  }


  if (Array.isArray(input)) {
    return input.reduce((rez, elem, index) => [
      ...rez,
      ..._propDeepSearch(
        elem,
        value,
        prefix + '[' + index + ']',
        depth + 1,
        isHidden
      )
    ], []);
  }


  return Object.keys(input).reduce((rez, propName) => [
    ...rez,
    ...(propName === value ?
    [{
      prefix,
      isHidden,
      depth
    }] :
    []
    ),
    ..._propDeepSearch(
      input[propName],
      value,
      prefix + '.' + propName,
      depth + 1,
      isHidden || propName.charAt(0) === '_'
    )
  ], []);
}

function propDeepSearch(input, value) {
  return _sortAndFilter(_propDeepSearch(input, value));
}

let gatewayPromise;

function getGatewayIp() {
  gatewayPromise = gatewayPromise || new Promise((resolve, reject) => fs.readFile(
    '/proc/net/route',
    'utf8',
    (err, data) => {
      if (err) {
        return reject(err);
      }

      data.split('\n').some(line => {
        let parts = line.split('\t');

        if (parts[1] !== '00000000') {
          return false;
        }

        let gateway = parts[2].match(/.{2}/g).map(hex => parseInt(hex, 16)).reverse().join('.');

        if (gateway) {
          resolve(gateway);
        }

        return true;
      });

      return reject('Unable to parse "/proc/net/route" when trying Consul service at default gateway');
    }));

  return gatewayPromise;
}

module.exports = {
  firstResolved,
  retriedPromise,
  retriedCallback,
  propDeepSearch,
  valueDeepSearch,
  getGatewayIp
}
