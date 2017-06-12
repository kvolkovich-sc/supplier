import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import validator from 'validate.js';
import i18n from '../../i18n/I18nDecorator.react.js';
import './SupplierBankAccountEditForm.css';
import SupplierBankAccountFormConstraints from './SupplierBankAccountFormConstraints';
import { I18nManager } from 'opuscapita-i18n';
import globalMessages from '../../utils/validatejs/i18n';
import SupplierBankAccountEditFormRow from './SupplierBankAccountEditFormRow.react.js';
const ADDRESS_TYPES = ['default', 'invoice', 'rma', 'plant'];
import serviceComponent from '../serviceComponent.react';

/**
 * Supplier address edit form
 */
@i18n
class SupplierBankAccountEditForm extends Component {
  static propTypes = {
    supplierBankAccount: React.PropTypes.object.isRequired,
    errors: React.PropTypes.object,
    editMode: React.PropTypes.oneOf(['edit', 'create', 'create-first', 'view']),
    onSave: React.PropTypes.func.isRequired,
    onUpdate: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  static defaultProps = {
    editMode: 'create',
    errors: {}
  };

  state = {
    supplierBankAccount: {},
    errors: this.props.errors || {}
  };

  componentWillMount() {
    let serviceRegistry = (service) => ({ url: `${this.props.actionUrl}/isodata` });
    const CountryField = serviceComponent({ serviceRegistry, serviceName: 'isodata' , moduleName: 'isodata-countries', jsFileName: 'countries-bundle' });

    this.externalComponents = { CountryField };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.supplierBankAccount) {
      this.setState({supplierBankAccount: newProps.supplierBankAccount, errors: newProps.errors || {}});
    }
  }

  validatejsI18N = new I18nManager(this.context.i18n.locale, globalMessages);

  constraints = SupplierBankAccountFormConstraints(this.validatejsI18N);

  handleSaveOrUpdate = (event) => {
    event.preventDefault();

    const supplierBankAccount = this.state.supplierBankAccount;
    let errors = validator(this.state.supplierBankAccount, this.constraints, {fullMessages: false});
    if (!errors) {
      const editMode = this.props.editMode;

      if (editMode === 'edit') {
        this.props.onUpdate(supplierBankAccount);
      } else {
        this.props.onSave(supplierBankAccount);
      }
    } else {
      this.setState({errors: errors});
    }
  };

  handleCancel = () => {
    const contact = this.state.supplierBankAccount;
    this.props.onCancel(contact);
  };

  handleCountryChange = (fieldName, country) => {
    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.supplierBankAccount[fieldName], country);
    }

    this.setState({
      supplierBankAccount: {
        ...this.state.supplierBankAccount,
        [fieldName]: country
      }
    });
  };

  handleChange = (fieldName, event) => {
    let newValue = event.target.value;

    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.supplierBankAccount[fieldName], newValue);
    }

    this.setState({
      supplierBankAccount: {
        ...this.state.supplierBankAccount,
        [fieldName]: newValue
      }
    });
  };

  handleBlur = (fieldName/* , event*/) => {
    const errors = validator(
      this.state.supplierBankAccount, {
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
  };

  renderField = attrs => {
    const { supplierBankAccount, errors } = this.state;
    const { fieldName, disabled } = attrs;
    const fieldNames = attrs.fieldNames || [fieldName];

    let component = attrs.component ||
      <input className="form-control"
        type="text"
        value={ typeof supplierBankAccount[fieldName] === 'string' ? supplierBankAccount[fieldName] : '' }
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
      <SupplierBankAccountEditFormRow
        labelText={ this.context.i18n.getMessage(`SupplierBankAccountEditor.Label.${fieldName}`) }
        required={ isRequired }
        rowErrors={ rowErrors }
      >
        { component }
      </SupplierBankAccountEditFormRow>
    );
  };

  render() {
    const editMode = this.props.editMode;
    const disabled = editMode === 'view';
    const { supplierBankAccount } = this.state;
    const { CountryField } = this.externalComponents;

    return (
      <form className="form-horizontal" onSubmit={this.handleSaveOrUpdate}>
        { this.renderField({ fieldName: 'bankName', disabled: disabled }) }
        { this.renderField({ fieldName: 'accountNumber', disabled: disabled }) }
        { this.renderField({ fieldName: 'bankIdentificationCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'bankCode', disabled: disabled }) }
        { this.renderField({ fieldName: 'swiftCode', disabled: disabled }) }

        { this.renderField({
            fieldName: 'bankCountryKey',
            component: (
              <CountryField
                actionUrl={this.props.actionUrl}
                value={supplierBankAccount['bankCountryKey']}
                onChange={this.handleCountryChange.bind(this, 'bankCountryKey')}
                onBlur={this.handleBlur.bind(this, 'bankCountryKey')}
              />
            )
          })}

        { this.renderField({ fieldName: 'extBankControlKey', disabled: disabled }) }

        <div className="col-sm-12 text-right address-form-submit">
          {editMode !== 'create-first' ? (
            <Button bsStyle="link"
              onClick={this.handleCancel}
            >
            {
              this.context.i18n.getMessage('SupplierBankAccountEditor.Button.' + (editMode === 'view' ? 'close' : 'cancel'))
            }
            </Button>
          ) : null}
          {editMode !== 'view' ? (
            <Button bsStyle="primary"
              type="submit"
            >{this.context.i18n.getMessage('SupplierBankAccountEditor.Button.save')}</Button>
          ) : null}
        </div>
      </form>
    );
  }
}

export default SupplierBankAccountEditForm;
