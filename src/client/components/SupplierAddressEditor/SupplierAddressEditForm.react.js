import React, { Component } from 'react';
import classNames from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import validator from 'validate.js';
import i18n from '../../i18n/I18nDecorator.react.js';
import './SupplierAddressEditForm.css';
import DateConverter from 'jcatalog-i18n/lib/converters/DateConverter';

import { I18nManager } from 'jcatalog-i18n';
const globalMessages = require('../../../client-server/validatejs/i18n').default;
const ADDRESS_TYPES = ['default', 'invoice', 'rma', 'plant'];

/**
 * Supplier address edit form
 *
 * @author Dmitry Divin
 */
@i18n
class SupplierAddressEditForm extends Component {
  static propTypes = {
    /**
     * supplierAddress to edit
     */
    supplierAddress: React.PropTypes.object.isRequired,
    countries: React.PropTypes.array.isRequired,
    errors: React.PropTypes.object,
    /**
     * The edit mode is on of ('edit', 'create', 'create-first', 'view')
     *
     * edit - form open to update exits item
     * create - form open to insert new item
     * create-first - form open to insert new item without cancel button
     * view - form open in readonly mode
     */
    editMode: React.PropTypes.oneOf(['edit', 'create', 'create-first', 'view']),
    /**
     * On save handler
     *
     * @arg0 - supplierAddress object
     */
    onSave: React.PropTypes.func.isRequired,
    /**
     * On update handler
     *
     * @arg0 - supplierAddress object
     */
    onUpdate: React.PropTypes.func.isRequired,
    /**
     * On cancel handler
     *
     * @arg0 - supplierAddress object
     */
    onCancel: React.PropTypes.func.isRequired,

    /**
     * On form field change element
     *
     * @arg0 - supplierAddress - object
     * @arg1 - name - field name
     * @arg2 - oldValue - old value
     * @arg3 - newValue - new value
     */
    onChange: React.PropTypes.func.isRequired,
    dateTimePattern: React.PropTypes.string.isRequired
  };

  static defaultProps = {
    editMode: 'create',
    errors: {}
  };

  state = {
    supplierAddress: this.props.supplierAddress,
    errors: this.props.errors || {}
  }

  componentWillReceiveProps(newProps) {
    if (newProps.supplierAddress) {
      this.setState({ supplierAddress: newProps.supplierAddress, errors: newProps.errors || {} });
    }
  }

  validatejsI18N = new I18nManager(this.context.i18n.locale, globalMessages)

  constraints = {
    type: {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      }
    },
    "address.name1": {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 100,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 100
        })
      }
    },
    "address.name2": {
      length: {
        maximum: 100,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 100
        })
      }
    },
    "address.name3": {
      length: {
        maximum: 100,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 100
        })
      }
    },
    "address.street": {
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
    "address.zipCode": {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 10,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "address.city": {
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
    "address.countryId": {
      presence: {
        message: this.validatejsI18N.getMessage('validatejs.blank.message')
      }
    },
    "address.areaCode": {
      length: {
        maximum: 10,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "address.state": {
      length: {
        maximum: 50,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    "address.pobox": {
      length: {
        maximum: 10,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "address.poboxZipCode": {
      length: {
        maximum: 10,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 10
        })
      }
    },
    "address.phoneNo": {
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
    "address.faxNo": {
      length: {
        maximum: 50,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    "address.email": {
      length: {
        maximum: 1024,
        tooLong: this.validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 1024
        })
      },
      email: {
        message: this.validatejsI18N.getMessage('validatejs.invalid.email.message')
      }
    }
  }

  /**
   * On Save or Update local handler
   */
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


  /**
   * Set property value to object
   *
   * @param object - object
   * @param name - property name
   * @param value - value
   */
  setProp(object, name, value) {
    if (object === null || object === undefined) {
      return;
    }

    let props = name.split('.');
    if (props.length > 1) {
      let nestedObj = object[props[0]];
      let nestedProp = props.splice(1).join('.');
      this.setProp(nestedObj, nestedProp, value);
      return;
    }

    object[name] = value;// eslint-disable-line no-param-reassign
    return;
  }

  /**
   * Get property from object
   *
   * @param object - object
   * @param name - property name
   *
   * @return property value
   */
  getProp(object, name) {
    if (object === null || object === undefined) {
      return null;
    }
    let props = name.split('.');
    if (props.length > 1) {
      let nestedObj = object[props[0]];
      let nestedProp = props.splice(1).join('.');
      return this.getProp(nestedObj, nestedProp);
    }

    return object[name];
  }

  fieldRender(tagClass, tagProps, child) {
    const name = tagProps.name;

    tagProps.className = 'form-control';// eslint-disable-line no-param-reassign
    tagProps.id = name;// eslint-disable-line no-param-reassign

    const required = tagProps.required;

    if (required) {
      delete tagProps.required;// eslint-disable-line no-param-reassign
    }

    let labelValue = this.context.i18n.getMessage(`SupplierAddressEditor.Label.${name}`);

    let tooltipOverlay;
    if (tagProps.tooltip) {
      tooltipOverlay = (<Popover id={'tooltip-' + name} title={labelValue}>{tagProps.tooltip}</Popover>);
      delete tagProps.tooltip;// eslint-disable-line no-param-reassign
    }

    tagProps.value = this.getProp(this.state.supplierAddress, name);// eslint-disable-line no-param-reassign
    tagProps.onChange = (event) => {// eslint-disable-line no-param-reassign
      let newValue = event.target.value.replace(/^\s+/g, '');
      let supplierAddress = this.state.supplierAddress;


      let oldValue = this.getProp(supplierAddress, name);
      this.setProp(supplierAddress, name, newValue);

      if (oldValue !== newValue) {
        this.props.onChange(supplierAddress, name, oldValue, newValue);
      }

      this.setState({ supplierAddress: supplierAddress });
    };

    tagProps.onBlur = (event) => {// eslint-disable-line no-param-reassign
      let newValue = event.target.value.trim();
      let supplierAddress = this.state.supplierAddress;
      let oldValue = this.getProp(supplierAddress, name);
      this.setProp(supplierAddress, name, newValue);
      if (oldValue !== newValue) {
        this.props.onChange(supplierAddress, name, oldValue, newValue);
      }

      let fieldName = event.target.name;
      const errors = this.state.errors || {};

      let fieldConstraints = {};
      fieldConstraints[fieldName] = this.constraints[fieldName];
      let fieldErrors = validator(supplierAddress, fieldConstraints, { fullMessages: false });
      if (fieldErrors) {
        errors[fieldName] = fieldErrors[fieldName];
      } else {
        delete errors[fieldName];
      }
      this.setState({
        errors: errors,
        supplierAddress: supplierAddress
      });
    };

    const element = React.createElement(tagClass, tagProps, child);

    let errors = this.state.errors || {};
    let errorMessages = errors[name] || [];
    let labelClassNames = {
      'control-label': true
    };
    labelClassNames[`col-sm-${(tooltipOverlay ? 3 : 4)}`] = true;

    if (required) {
      let lastWord = labelValue.substring(labelValue.lastIndexOf(' ') + 1, labelValue.length);
      labelValue = (
        <span>
          {labelValue.replace(lastWord, '')}<span><nobr>{lastWord} *</nobr></span>
        </span>
      );
    }

    return (
      <div className={classNames({ 'form-group': true, 'has-error': errorMessages.length > 0 })}>
        <label htmlFor={name} className={classNames(labelClassNames)}>
          {labelValue}
        </label>

        {tooltipOverlay ? (
          <div className="col-sm-1 text-right">
            <OverlayTrigger trigger="click" placement="bottom" overlay={tooltipOverlay}>
              <i style={{
                cursor: 'pointer',
                verticalAlign: 'middle'
              }} className="glyphicon glyphicon-info-sign text-muted form-control-static"
              />
            </OverlayTrigger>
          </div>
        ) : null}

        <div className="col-sm-8">{element}</div>
        {errorMessages.map((errorMessage, index) => {
          return (
            <div key={'error-' + name + '-' + index} className="col-sm-offset-4 col-sm-8">
              <span className="label label-danger">{errorMessage}</span>
            </div>
          );
        })}
      </div>
    );
  }

  auditedInfo = () => {
    const { supplierAddress } = this.state;
    if (supplierAddress['createdBy']) {
      return (
        <div className="form-group col-sm-12 object-info">
          <p><strong>{this.auditedInfoPart('created')}</strong></p>
          <p><strong>{this.auditedInfoPart('changed')}</strong></p>
        </div>
      );
    }
    return ('');
  };

  auditedInfoPart = (fieldName) => {
    const { i18n } = this.context;
    const locale = i18n.locale;
    const { supplierAddress } = this.state;
    const { dateTimePattern } = this.props;
    const dateConverter = new DateConverter(dateTimePattern, locale);
    const dateOn = supplierAddress[`${fieldName}On`];
    const userBy = supplierAddress[`${fieldName}By`];

    return i18n.getMessage(`SupplierAddressEditor.AddressInfo.${fieldName}`, {
      by: userBy,
      on: dateConverter.valueToString(dateOn)
    });
  };

  render() {
    const editMode = this.props.editMode;
    // const supplierAddress = this.state.supplierAddress;

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
        label: message(`SupplierAddressEditor.AddressType.${type}`)
      })
    }

    let countryOptions = [];

    countryOptions.push({
      value: '',
      label: message('SupplierAddressEditor.Select.country'),
      disabled: true
    });

    const countries = this.props.countries;
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];

      countryOptions.push({
        value: country.id,
        label: country.name
      })
    }

    return (
      <form className="form-horizontal" onSubmit={this.handleSaveOrUpdate}>

        {this.fieldRender('select', {
          name: 'type',
          defaultValue: '',
          disabled: (editMode === 'view'),
          required: true
        }, (
          typeOptions.map((item, index) => {
            return (<option key={'contact-type-' + index} value={item.value}
              disabled={item.disabled}
            >{item.label}</option>)
          })
        ))}

        {this.fieldRender('input', {
          name: 'address.name1',
          required: true,
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.name2',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.name3',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.street',
          required: true,
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.zipCode',
          required: true,
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.city',
          required: true,
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('select', {
          name: 'address.countryId',
          defaultValue: '',
          required: true,
          disabled: (editMode === 'view')
        }, (
          countryOptions.map((item, index) => {
            return <option key={'country-' + index} value={item.value} disabled={item.disabled}>{item.label}</option>
          })
        ))}

        {this.fieldRender('input', {
          name: 'address.areaCode',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.state',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.pobox',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.poboxZipCode',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.phoneNo',
          required: true,
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.faxNo',
          disabled: (editMode === 'view')
        })}

        {this.fieldRender('input', {
          name: 'address.email',
          disabled: (editMode === 'view')
        })}

        <div className="col-sm-12 text-right" style={{ 'paddingRight': '0' }}>
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

        {editMode === 'edit' || editMode === 'view' ? this.auditedInfo() : null}
      </form>
    );
  }
}

export default SupplierAddressEditForm;
