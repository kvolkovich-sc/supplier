import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent-bluebird-promise';
import utils from 'underscore';
import i18n from '../../i18n/I18nDecorator.react.js';
import Button from 'react-bootstrap/lib/Button';
import Alert from '../Alert';
import SupplierAddressListTable from './SupplierAddressListTable.react.js';
import SupplierAddressEditForm from './SupplierAddressEditForm.react.js';

/**
 * Supplier address editor
 *
 * @author Dmitry Divin
 */
@i18n({
  componentName: 'SupplierAddressEditor',
  messages: require('./i18n').default,
})
class SupplierAddressEditor extends Component {

  static propTypes = {
    actionUrl: React.PropTypes.string.isRequired,
    supplierId: React.PropTypes.string.isRequired,
    username: React.PropTypes.string,
    countries: React.PropTypes.array.isRequired,
    readOnly: React.PropTypes.bool,
    dateTimePattern: React.PropTypes.string.isRequired,
    /**
     * Subscribe to persistent data changes
     * @arg0 - dirty state: true - if inner data changed, false if inner changes was reset
     */
    onChange: React.PropTypes.func,
    onUnauthorized: React.PropTypes.func
  };

  static defaultProps = {
    readOnly: false,
    onChange: function(event) {
      if (event.isDirty) {
        console.log('data in form changed');
      } else {
        console.log('data in form committed or canceled')
      }
    }
  };

  state = {
    loadErrors: false
  };

  componentDidMount() {
    this.loadSupplierAddresses();
  }

  componentWillReceiveProps(newProps) {
    let editMode = this.state.editMode;

    if (editMode && this.props.readOnly !== newProps.readOnly) {
      let newState = { globalError: null };

      if (editMode === 'create') {
        newState.supplierAddress = null;
        newState.globalError = null;
      } else if (editMode === 'edit') {
        newState.editMode = 'view';
      } else if (editMode === 'view') {
        newState.editMode = 'edit';
      }
      this.setState(newState);
    }
  }

  componentDidUpdate() {
    let formBlock = ReactDOM.findDOMNode(this.refs.editForm);
    if (formBlock) {
      formBlock.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }

  handleEdit = (supplierAddress) => {
    this.setState({
      supplierAddress: utils.clone(supplierAddress),
      editMode: "edit",
      globalError: null,
      globalMessage: null,
      errors: null
    });
  };

  handleView = (supplierAddress) => {
    this.setState({
      supplierAddress: utils.clone(supplierAddress),
      editMode: "view",
      globalError: null,
      globalMessage: null,
      errors: null
    });
  };

  handleDelete = (supplierAddress) => {
    let actionUrl = this.props.actionUrl;
    let supplierId = this.props.supplierId;

    let arg0 = encodeURIComponent(supplierId);
    let arg1 = encodeURIComponent(supplierAddress.addressId);

    request.del(`${actionUrl}/api/suppliers/${arg0}/addresses/${arg1}`).set(
        'Accept', 'application/json').then(
        (response) => {
          console.log(response);

          let supplierAddresses = this.state.supplierAddresses;
          let index = utils.findIndex(supplierAddresses, { id: supplierAddress.id });
          if (index === -1) {
            throw new Error(`Not found SupplierAddress by id [${supplierAddress.id}]`);
          }

          supplierAddresses.splice(index, 1);

          const message = this.context.i18n.getMessage('SupplierAddressEditor.Message.objectDeleted');
          this.setState({
            supplierAddresses: supplierAddresses,
            supplierAddress: null,
            globalMessage: message,
            globalError: null
          });
        }).catch(errors => {
          if (errors.status === 401) {
            this.props.onUnauthorized();
          } else {
            console.log('Error during deleting SupplierAddress:');
            console.log(errors);
          }
        });
  };

  handleCreate = () => {
    this.props.onChange({ isDirty: true });
    this.setState({ supplierAddress: { address: {} }, editMode: 'create', errors: null });
  };

  handleUpdate = (supplierAddress) => {
    let actionUrl = this.props.actionUrl;
    let supplierId = this.props.supplierId;
    supplierAddress.changedBy = this.props.username;// eslint-disable-line no-param-reassign

    let arg0 = encodeURIComponent(supplierId);
    let arg1 = encodeURIComponent(supplierAddress.addressId);

    request.put(`${actionUrl}/api/suppliers/${arg0}/addresses/${arg1}`).set(
      'Accept', 'application/json').send(supplierAddress).then((response) => {
        console.log(response);

        let updatedSupplierAddress = response.body;

        let supplierAddresses = this.state.supplierAddresses;
        let index = utils.findIndex(supplierAddresses, { id: supplierAddress.id });

        if (index === -1) {
          throw new Error(`Not found SupplierAddress by id [${supplierAddress.id}]`);
        }
        supplierAddresses[index] = updatedSupplierAddress;

        this.props.onChange({ isDirty: false });

        const message = this.context.i18n.getMessage('SupplierAddressEditor.Message.objectUpdated');
        this.setState({
          supplierAddresses: supplierAddresses,
          supplierAddress: null,
          globalMessage: message,
          globalError: null
        });
      }).catch(errors => {
        if (errors.status === 401) {
          this.props.onUnauthorized();
        } else {
          console.log('Error during updating SupplierAddress:');
          console.log(errors);
        }
      });
  };

  generateUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + s4();
  }

  handleSave = (supplierAddress) => {
    let actionUrl = this.props.actionUrl;
    let supplierId = this.props.supplierId;

    /* eslint-disable no-param-reassign*/
    supplierAddress.supplierId = supplierId;
    supplierAddress.createdBy = this.props.username;
    supplierAddress.changedBy = this.props.username;

    // generate unique value
    supplierAddress.addressId = this.generateUUID();
    supplierAddress.address.addressId = supplierAddress.addressId;
    /* eslint-enable no-param-reassign*/

    request.post(`${actionUrl}/api/suppliers/${encodeURIComponent(supplierId)}/addresses`).set(
          'Accept', 'application/json').send(supplierAddress).then((response) => {
            console.log(response);
            let supplierAddresses = this.state.supplierAddresses;
            supplierAddresses.push(response.body);

            this.props.onChange({ isDirty: false });

            const message = this.context.i18n.getMessage('SupplierAddressEditor.Message.objectSaved');
            this.setState({
              supplierAddresses: supplierAddresses,
              supplierAddress: null,
              globalMessage: message,
              globalError: null
            });
          }).catch(errors => {
            if (errors.status === 401) {
              this.props.onUnauthorized();
            } else {
              console.log('Error during create SupplierAddress:');
              console.log(errors);
            }
          });
  };

  handleCancel = () => {
    this.props.onChange({ isDirty: false });
    this.setState({ supplierAddress: null, globalError: null, globalMessage: null });
  };

  handleChange = (supplierAddress, name, oldValue, newValue) => {
    // check only updated objects
    // if (supplierAddress.address.addressId) {
    this.props.onChange({ isDirty: true });
    // }
  };

  loadSupplierAddresses() {
    let actionUrl = this.props.actionUrl;
    let supplierId = this.props.supplierId;
    request.get(`${actionUrl}/api/suppliers/${encodeURIComponent(supplierId)}/addresses`).set(
        'Accept', 'application/json').then((response) => {
          console.log(response);
          this.setState({ supplierAddresses: response.body });
        }).catch(errors => {
          if (errors.status === 401) {
            this.props.onUnauthorized();
          } else {
            console.log('Error during retrieving SupplierAddress list:');
            console.log(errors);
          }
        });
  }

  render() {
    const countries = this.props.countries;
    const supplierAddresses = this.state.supplierAddresses;
    const loadErrors = this.state.loadErrors;

    let supplierAddress = this.state.supplierAddress;
    let errors = this.state.errors;
    let editMode = this.state.editMode;

    let readOnly = this.props.readOnly;

    let result;

    if (supplierAddresses !== undefined) {
      if (supplierAddresses.length > 0) {
        result = (
          <div className="table-responsive">
            <SupplierAddressListTable
              countries={countries}
              supplierAddresses={supplierAddresses}
              readOnly={readOnly}
              onEdit={this.handleEdit}
              onDelete={this.handleDelete}
              onView={this.handleView}
            />
          </div>
        );
      } else if (readOnly) {
        supplierAddress = null;
      } else {
        // show create new supplier address if empty
        supplierAddress = {
          address: {}
        };
        errors = {};
        editMode = 'create-first';
      }
    } else if (loadErrors) {
      result = (<div>Load errors</div>);
    } else {
      result = (<div>Loading...</div>);
    }

    return (
      <div>
        <div>
          <h4 className="tab-description">{this.context.i18n.getMessage('SupplierAddressEditor.Title')}</h4>
        </div>

        {this.state.globalMessage && !readOnly ? (
          <Alert bsStyle="info" message={this.state.globalMessage}/>
        ) : null}

        {result}

        {supplierAddress ? (
          <div className="row" ref="editForm">
            <div className="col-md-6">
              {this.state.globalError && !readOnly ? (
                <Alert bsStyle="danger" message={this.state.globalError}/>
              ) : null}

              <SupplierAddressEditForm
                dateTimePattern={this.props.dateTimePattern}
                onChange={this.handleChange}
                supplierAddress={supplierAddress}
                countries={countries}
                errors={errors}
                editMode={editMode}
                onSave={this.handleSave}
                onUpdate={this.handleUpdate}
                onCancel={this.handleCancel}
              />
            </div>
          </div>
        ) : null}

        {!supplierAddress && !readOnly ? (
          <div>
            <Button onClick={this.handleCreate}>{this.context.i18n.getMessage('SupplierAddressEditor.Button.add')}
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default SupplierAddressEditor;
