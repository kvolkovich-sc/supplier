import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import validator from 'validate.js';
import i18n from '../../i18n/I18nDecorator.react.js';
import './SupplierAddressEditorForm.css';
import SupplierAddressFormConstraints from './SupplierAddressFormConstraints';
import { I18nManager } from 'opuscapita-i18n';
import globalMessages from '../../utils/validatejs/i18n';
import SupplierAddressEditorFormRow from './SupplierAddressEditorFormRow.react.js';
const ADDRESS_TYPES = ['default', 'invoice', 'rma', 'plant'];
import serviceComponent from '@opuscapita/react-loaders/lib/serviceComponent';

/**
 * Supplier address edit form
 */
@i18n
class SupplierAddressEditorForm extends Component {
  static propTypes = {
    supplierAddress: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object,
    editMode: React.PropTypes.oneOf(['edit', 'create', 'create-first', 'view']),
    onSave: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  }

  static defaultProps = {
    editMode: 'create',
    errors: {}
  };

  state = {
    supplierAddress: this.props.supplierAddress,
    errors: this.props.errors || {}
  }

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.props.actionUrl}/isodata` });
    const CountryField = serviceComponent({ serviceRegistry, serviceName: 'isodata' , moduleName: 'isodata-countries', jsFileName: 'countries-bundle' });

    this.externalComponents = { CountryField };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.supplierAddress) {
      this.setState({ supplierAddress: newProps.supplierAddress, errors: newProps.errors || {} });
    }
  }

  validatejsI18N = new I18nManager(this.context.i18n.locale, globalMessages);

  constraints = SupplierAddressFormConstraints(this.validatejsI18N);

  handleSaveOrUpdate = (event) => {
    event.preventDefault();

    const supplierAddress = this.state.supplierAddress;
    let errors = validator(this.state.supplierAddress, this.constraints, { fullMessages: false });
    if (!errors) {
      const editMode = this.props.editMode;

      if (editMode === 'edit') {
        this.props.onUpdate(supplierAddress);
      } else {
        this.props.onSave(supplierAddress);
      }
    } else {
      this.setState({ errors: errors });
    }
  };

  handleCancel = () => {
    const supplierAddress = this.state.supplierAddress;
    this.props.onCancel(supplierAddress);
  };

  handleCountryChange = (fieldName, country) => {
    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.supplierAddress[fieldName], country);
    }

    this.setState({
      supplierAddress: {
        ...this.state.supplierAddress,
        [fieldName]: country
      }
    });
  }

  handleChange = (fieldName, event) => {
    let newValue = event.target.value;

    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.supplierAddress[fieldName], newValue);
    }

    this.setState({
      supplierAddress: {
        ...this.state.supplierAddress,
        [fieldName]: newValue
      }
    });
  }

  handleBlur = (fieldName/* , event*/) => {
    const errors = validator(
      this.state.supplierAddress, {
        [fieldName]: this.constraints[fieldName]
      }, {
        fullMessages: false
      }
    );

    this.setState({
      errors: {
        ...this.state.errors,
        [fieldName]: errors ?
          errors[fieldName].map(msg => ({ message: msg })) :
          []
      }
    });
  }

  renderField = attrs => {
    const { supplierAddress, errors } = this.state;
    const { fieldName, disabled } = attrs;
    const fieldNames = attrs.fieldNames || [fieldName];

    let component = attrs.component ||
      <input className="form-control"
        type="text"
        value={ typeof supplierAddress[fieldName] === 'string' ? supplierAddress[fieldName] : '' }
        onChange={ this.handleChange.bind(this, fieldName) }
        onBlur={ this.handleBlur.bind(this, fieldName) }
        disabled={disabled}
      />;

    let isRequired = fieldNames.some(name => {
      return this.constraints[name] && this.constraints[name].presence;
    });

    let rowErrors = fieldNames.reduce(
      (rez, name) => rez.concat(errors[name] || []),
      []
    );

    return (
      <SupplierAddressEditorFormRow
        labelText={ this.context.i18n.getMessage(`SupplierAddressEditor.Label.${fieldName}`) }
        required={ isRequired }
        rowErrors={ rowErrors }
      >
        { component }
      </SupplierAddressEditorFormRow>
    );
  };

  render() {
    const editMode = this.props.editMode;
    const disabled = editMode === 'view';
    const { supplierAddress } = this.state;
    const { CountryField } = this.externalComponents;

    let message = this.context.i18n.getMessage;

    let typeOptions = [];

    typeOptions.push({
      value: '',
      label: message('SupplierAddressEditor.Select.type'),
      disabled: true
    });

    for (let i = 0; i < ADDRESS_TYPES.length; i++) {
      let type = ADDRESS_TYPES[i];

      typeOptions.push({
        value: type,
        label: message(`SupplierAddressEditor.AddressType.${type}`),
        disabled: disabled
      })
    }

    return (
      <form className="form-horizontal" onSubmit={this.handleSaveOrUpdate}>
        { this.renderField({
            fieldName: 'type',
            component: (
              <select className="form-control"
                value={supplierAddress['type'] || ''}
                onChange={this.handleChange.bind(this, 'type')}
                onBlur={this.handleBlur.bind(this, 'type')}
                disabled={disabled}
              >
                {typeOptions.map((item, index) => {
                  return (<option key={index} disabled={item.disabled} value={item.value}>{item.label}</option>);
                })}
              </select>
            )
          }) }

        { this.renderField({ fieldName: 'name1', disabled: disabled }) }
        { this.renderField({ fieldName: 'name2', disabled: disabled }) }
        { this.renderField({ fieldName: 'name3', disabled: disabled }) }
        { this.renderField({ fieldName: 'street', disabled: disabled }) }
        { this.renderField({ fieldName: 'zipCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'city', disabled: disabled }) }

        { this.renderField({
            fieldName: 'countryId',
            component: (
              <CountryField
                actionUrl={this.props.actionUrl}
                value={supplierAddress['countryId']}
                onChange={this.handleCountryChange.bind(this, 'countryId')}
                onBlur={this.handleBlur.bind(this, 'countryId')}
              />
            )
          })}

        { this.renderField({ fieldName: 'areaCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'state', disabled: disabled }) }
        { this.renderField({ fieldName: 'pobox', disabled: disabled }) }
        { this.renderField({ fieldName: 'poboxZipCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'phoneNo', disabled: disabled }) }
        { this.renderField({ fieldName: 'faxNo', disabled: disabled }) }
        { this.renderField({ fieldName: 'email', disabled: disabled }) }

        <div className="col-sm-12 text-right address-form-submit">
          {editMode !== 'create-first' ? (
            <Button bsStyle="link"
              onClick={this.handleCancel}
            >
            {
              this.context.i18n.getMessage('SupplierAddressEditor.Button.' + (editMode === 'view' ? 'close' : 'cancel'))
            }
            </Button>
          ) : null}
          {editMode !== 'view' ? (
            <Button bsStyle="primary"
              type="submit"
            >{this.context.i18n.getMessage('SupplierAddressEditor.Button.save')}</Button>
          ) : null}
        </div>
      </form>
    );
  }
}

export default SupplierAddressEditorForm;