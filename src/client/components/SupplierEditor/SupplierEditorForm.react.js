import React, { PropTypes, Component } from 'react';
import _ from 'underscore';
import validatejs from 'validate.js';
import i18n from '../../i18n/I18nDecorator.react.js';
import DateConverter from 'jcatalog-i18n/lib/converters/DateConverter';
import SupplierEditorFormRow from './SupplierEditorFormRow.react.js'
import DatePicker from '../DatePicker';
import './SupplierEditor.css';
import { I18nManager } from 'jcatalog-i18n';
const globalMessages = require('../../../client-server/validatejs/i18n').default;

function isValidDate(d) {
  if (Object.prototype.toString.call(d) !== "[object Date]") {
    return false;
  }
  return !isNaN(d.getTime());
}

// extends standard validator
function getValidator(i18n) {
  validatejs.extend(validatejs.validators.datetime, {
    // The value is guaranteed not to be null or undefined but otherwise it could be anything.
    parse: function(value) {
      let date = new Date(value);
      if (isValidDate(date)) {
        return date.getTime();
      }
      return value.toString;
    },
    // Input is a unix timestamp
    format: function(value) {
      const date = new Date(value);
      if (isValidDate(value)) {
        return i18n.formatDate(date);
      }
      return value;
    }
  });

  return validatejs;
}

@i18n
class SupplierEditorForm extends Component {
  static propTypes = {
    supplier: PropTypes.object,
    onSupplierChange: PropTypes.func.isRequired,
    dateTimePattern: PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    readOnly: PropTypes.bool,
    countries: PropTypes.array,
    supplierId: PropTypes.string,
    username: React.PropTypes.string
  };

  static defaultProps = {
    readOnly: false,
    countries: []
  };

  state = {
    supplier: {
      ...this.props.supplier
    },
    fieldErrors: {}
  };

  componentDidMount() {
    console.log('SUPPLIER PROPS');
    console.dir(this.props.supplier);
    console.log('SUPPLIER STATE');
    console.dir(this.state.supplier);
  }

  componentWillReceiveProps(nextProps) {
    if (_.isEqual(this.props.supplier, nextProps.supplier)) {
      return;
    }

    this.setState({
      supplier: {
        ...nextProps.supplier
      },
      fieldErrors: {},
    });
  }

  validatejsI18N = new I18nManager(this.context.i18n.locale, globalMessages)

  SUPPLIER_CONSTRAINTS = {
    supplierName: {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    supplierId: {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    homePage: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    foundedOn: {
      presence: false,
      datetime: {
        message: this.validatejsI18N.getMessage('validatejs.typeMismatch.java.util.Date')
      }
    },
    legalForm: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    registrationNumber: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    cityOfRegistration: {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    countryOfRegistration: {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    taxId: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    vatRegNo: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    globalLocationNo: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    dunsNo: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    }
  }

  auditedInfo = () => this.state.supplier.createdBy ?
    <div className="form-group col-sm-6 object-info">
      <p><strong>{this.auditedInfoPart('created')}</strong></p>
      <p><strong>{this.auditedInfoPart('changed')}</strong></p>
    </div> :
    ''

  auditedInfoPart = (fieldName) => {
    const { i18n } = this.context;
    const { supplier } = this.state;
    const dateConverter = new DateConverter(this.props.dateTimePattern, i18n.locale);

    return i18n.getMessage(`SupplierEditor.SupplierEditor.${fieldName}`, {
      by: supplier[`${fieldName}By`],
      on: dateConverter.valueToString(supplier[`${fieldName}On`])
    });
  }

  handleDateChange = (fieldName, event) => {
    let date;
    try {
      date = this.context.i18n.parseDate(event.target.value);
    } catch (e) {
      date = this.state.supplier.foundedOn;
    }

    this.setState({
      supplier: {
        ...this.state.supplier,
        [filedName]: isValidDate(date) ?
          date.toJSON() :
          date || ''
      },
      fieldErrors: {
        ...this.state.fieldErrors,
        [fieldName]: []
      }
    });
  }

  handleChange = (fieldName, event) => {
    let newValue = event.target.value;

    if (this.props.onChange) {
      this.props.onChange(fieldName, this.state.supplier[fieldName], newValue);
    }

    this.setState({
      supplier: {
        ...this.state.supplier,
        [fieldName]: newValue
      }
    });
  }

  handleBlur = (fieldName/* , event*/) => {
    const errors = getValidator(this.context.i18n)(
      this.state.supplier, {
        [fieldName]: this.SUPPLIER_CONSTRAINTS[fieldName]
      }, {
        fullMessages: false
      }
    );

    this.setState({
      fieldErrors: {
        ...this.state.fieldErrors,
        [fieldName]: errors ?
          errors[fieldName].map(msg => ({ message: msg })) :
          []
      }
    });
  }

  handleUpdate = event => {
    event.preventDefault();

    const { supplier } = this.state;
    const { onSupplierChange } = this.props;

    const errors = getValidator(this.context.i18n)(
      supplier,
      this.SUPPLIER_CONSTRAINTS, {
        fullMessages: false
      }
    );

    if (errors) {
      this.setState({
        fieldErrors: errors.reduce((fErrors, messages, fieldName) => ({
          ...fErrors,
          [fieldName]: messages.map(msg => ({ message: msg }))
        }), {}),
      });

      onSupplierChange(null);
    } else {
      onSupplierChange(supplier);
    }
  };

  renderField = attrs => {
    const { supplier, fieldErrors } = this.state;
    const { fieldName, readOnly = false } = attrs;

    let component = attrs.component || <input className="form-control"
      type="text"
      value={ supplier[fieldName] }
      onChange={ this.handleChange.bind(this, fieldName) }
      onBlur={ this.handleBlur.bind(this, fieldName) }
      disabled={ readOnly }
      autoFocus={ fieldName === 'supplierName' && !this.props.supplierId }
    />

    return (
      <SupplierEditorFormRow labelText={ this.context.i18n.getMessage(`SupplierEditor.Label.${fieldName}.label`) }
        required={ !!this.SUPPLIER_CONSTRAINTS[fieldName].presence }
        rowErrors={ fieldErrors[fieldName] }
      >
      { component }
      </SupplierEditorFormRow>
    );
  };

  render() {
    const { i18n } = this.context;
    const locale = i18n.locale;
    const { readOnly, countries } = this.props;
    const { supplier } = this.state;

    let foundedOn = supplier['foundedOn'];
    if (foundedOn !== null) {
      let date = new Date(foundedOn);
      if (isValidDate(date)) {
        foundedOn = i18n.formatDate(date);
      }
    }

    return (
      <div>
        <h4 className="tab-description">
          { i18n.getMessage(`SupplierEditor.Description.${
              this.props.supplierId ?
                (this.props.supplier && this.props.supplier.createdBy === this.props.username ?
                  'modifySupplierOrChooseAnother' :
                  'viewSupplierOrChooseAnother'
                ) :
                'chooseSupplier'
            }`)
          }
        </h4>
        <form className="form-horizontal">
          { this.renderField({ fieldName: 'supplierName', readOnly }) }
          { this.renderField({ fieldName: 'supplierId', readOnly }) }
          { this.renderField({ fieldName: 'homePage', readOnly }) }

          { this.renderField({
            fieldName: 'foundedOn',
            readOnly,
            component: (
              <DatePicker className="form-control"
                locale={locale}
                format={i18n.dateFormat}
                disabled={readOnly}
                value={foundedOn}
                onChange={this.handleDateChange.bind(this, 'foundedOn')}
                onBlur={this.handleBlur.bind(this, 'foundedOn')}
              />
            )
          }) }

          { this.renderField({ fieldName: 'legalForm', readOnly }) }
          { this.renderField({ fieldName: 'registrationNumber', readOnly }) }
          { this.renderField({ fieldName: 'cityOfRegistration', readOnly }) }

          { this.renderField({
            fieldName: 'countryOfRegistration',
            readOnly,
            component: (
              <select className="form-control"
                disabled={readOnly}
                value={supplier['countryOfRegistration'] || ''}
                onChange={this.handleChange.bind(this, 'countryOfRegistration')}
                onBlur={this.handleBlur.bind(this, 'countryOfRegistration')}
              >
                <option disabled={true} value="">{i18n.getMessage('SupplierEditor.Select.country')}</option>
                {countries.map((country, index) => {
                  return (<option key={index} value={country.id}>{country.name}</option>);
                })}
              </select>
            )
          }) }

          { this.renderField({ fieldName: 'taxId', readOnly }) }
          { this.renderField({ fieldName: 'vatRegNo', readOnly }) }
          { this.renderField({ fieldName: 'globalLocationNo', readOnly }) }
          { this.renderField({ fieldName: 'dunsNo', readOnly }) }

          {!readOnly && <div className="form-group">
            <div className="text-right col-sm-6">
              <button className="btn btn-primary" onClick={ this.handleUpdate }>
                { i18n.getMessage('SupplierEditor.ButtonLabel.save') }
              </button>
            </div>
          </div>}

          { this.auditedInfo() }
        </form>
      </div>
    );
  }
}

export default SupplierEditorForm;
