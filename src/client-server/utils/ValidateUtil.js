import _ from 'underscore';
import trim from 'underscore.string/trim';
import validatejs from 'validate.js';
import messages from '../validatejs/i18n';
import { types } from 'jcatalog-types';

/**
 * Returns locale-specific formatter and parser.
 *
 * @param i18n An I18nManager instance
 * @param attribute An attribute instance
 * @returns {{format: Function, parse: Function}}
 */
function getFormatter(i18n, attribute) {
  let formatFunc = (obj) => obj.toString();
  let parseFunc = (str) => str;

  if (attribute.type.name === 'date') {
    formatFunc = i18n.formatDate;
    parseFunc = (val) => {
      let parsed;
      try {
        parsed = i18n.parseDate(val);
      } catch (e) {
        throw new Error(i18n.getMessage('validatejs.typeMismatch.java.util.Date'));
      }
      return parsed;
    }
  } else if (attribute.type.name === 'integer') {
    formatFunc = i18n.formatNumber;
    parseFunc = (val) => {
      let parsed;
      try {
        parsed = i18n.parseNumber(val);
      } catch (e) {
        throw new Error(i18n.getMessage('validatejs.typeMismatch.java.lang.Integer'));
      }
      return parsed;
    }
  } else if (attribute.type.name === 'numeric') {
    formatFunc = i18n.formatDecimalNumber;
    parseFunc = (val) => {
      let parsed;
      try {
        parsed = i18n.parseDecimalNumber(val);
      } catch (e) {
        throw new Error(i18n.getMessage('validatejs.typeMismatch.java.math.BigDecimal'));
      }
      return parsed;
    };
  }

  return ({ format: formatFunc, parse: parseFunc });
}

/**
 * Gets converter for attribute.
 *
 * @param attribute An attribute instance
 * @returns {*}
 */
function getConverter(attribute) {
  let jcType = types.StringType;

  if (attribute.type.name === 'date') {
    jcType = types.DateType;
  } else if (attribute.type.name === 'integer') {
    jcType = types.IntegerType;
  } else if (attribute.type.name === 'numeric') {
    jcType = types.DecimalType;
  }

  return jcType.converter;
}

/**
 * Get required validators.
 *
 * @param attribute An attribute instance
 * @returns {Array}
 */
function getValidators(i18n, attribute) {
  const validators = [];

  // define default validator
  let func = (value) => {
    if (_.isString(value)) {
      const minimum = 0;
      const maximum = 16000;
      const constraints = {
        length: {
          minimum,
          maximum,
          tooShort: i18n.getMessage('validatejs.invalid.minSize.message', { limit: minimum }),
          tooLong: i18n.getMessage('validatejs.invalid.maxSize.message', { limit: maximum }),
        }
      };
      const errors = validatejs.single(value, constraints);
      if (!_.isUndefined(errors)) {
        throw new Error(errors[0]);
      }
    }
  };

  if (attribute.type.name === 'string' || attribute.type.name === 'text' || attribute.type.name === 'document') {
    func = (value) => {
      const minimum = _.result(attribute.type, 'minLength', 0);
      const maximum = _.result(attribute.type, 'maxLength', 16000);
      const constraints = {
        length: {
          minimum,
          maximum,
          tooShort: i18n.getMessage('validatejs.invalid.minSize.message', { limit: minimum }),
          tooLong: i18n.getMessage('validatejs.invalid.maxSize.message', { limit: maximum }),
        },
      };
      const errors = validatejs.single(value, constraints);
      if (!_.isUndefined(errors)) {
        throw new Error(errors[0]);
      }
    };
  } else if (attribute.type.name === 'integer') {
    func = (value) => {
      const minValue = _.result(attribute.type, 'minValue', -Math.pow(2, 31));
      const maxValue = _.result(attribute.type, 'maxValue', Math.pow(2, 31) - 1);
      const constraints = {
        numericality: {
          onlyInteger: true,
          greaterThanOrEqualTo: minValue,
          lessThanOrEqualTo: maxValue,
          notGreaterThanOrEqualTo: i18n.getMessage('validatejs.invalid.minOrEqual.message', { limit: minValue }),
          notLessThanOrEqualTo: i18n.getMessage('validatejs.invalid.maxOrEqual.message', { limit: maxValue }),
        },
      };
      const errors = validatejs.single(value, constraints);
      if (!_.isUndefined(errors)) {
        throw new Error(errors[0]);
      }
    };
  } else if (attribute.type.name === 'numeric') {
    func = (value) => {
      const minValue = _.result(attribute.type, 'minValue', -9007199254740991);
      const maxValue = _.result(attribute.type, 'maxValue', 9007199254740991);
      const constraints = {
        numericality: {
          greaterThanOrEqualTo: minValue,
          lessThanOrEqualTo: maxValue,
          notGreaterThanOrEqualTo: i18n.getMessage('validatejs.invalid.minOrEqual.message', { limit: minValue }),
          notLessThanOrEqualTo: i18n.getMessage('validatejs.invalid.maxOrEqual.message', { limit: maxValue }),
        },
      };
      const errors = validatejs.single(value, constraints);
      if (!_.isUndefined(errors)) {
        throw new Error(errors[0]);
      }
    };
  } else if (attribute.type.name === 'email') {
    const maximum = _.result(attribute.type, 'maxLength', 16000);
    const constraints = {
      email: {
        message: i18n.getMessage('validatejs.invalid.email.message'),
      },
      length: {
        maximum,
        tooLong: i18n.getMessage('validatejs.invalid.maxSize.message', { limit: maximum }),
      }
    };
    func = (value) => {
      const errors = validatejs.single(value, constraints);
      if (!_.isUndefined(errors)) {
        throw new Error(errors[0]);
      }
    };
  }

  validators.push({ validate: func });

  return validators;
}

/**
 * Converts attribute values from internal format to locale-specific format (is format of UI).
 *
 * @param i18n An I18nManager instance
 * @param attribute An attribute instance
 * @param attributeValues Attribute values
 * @returns {*}
 */
function toLocaleFormat(i18n, attribute, attributeValues) {
  const formatter = getFormatter(i18n, attribute);
  const converter = getConverter(attribute);

  return attributeValues.map(av => {
    let formattedValue = '';
    if (_.isString(av.value) && !_.isEmpty(av.value)) {
      try {
        let object = converter.toObject(av.value);
        formattedValue = formatter.format(object);
      } catch (ex) {
        console.warn(`${ex} for attribute [${av.attributeId}]`);
        formattedValue = av.value;
      }
    } else {
      console.log(`Unparsable value ${av.value}`);
    }
    return ({ ...av, value: formattedValue });
  });
}

/**
 * Converts attribute values from locale-specific format to internal format (is format of communication between server).
 *
 * @param i18n An I18nManager instance
 * @param attribute An attribute instance
 * @param attributeValues Attribute values
 * @returns {*}
 */
function toInternalFormat(i18n, attribute, attributeValues) {
  return _.map(attributeValues, av => {
    const formatter = getFormatter(i18n, attribute);
    const converter = getConverter(attribute);
    const object = formatter.parse(av.value);
    const value = converter.toInternal(object);

    return ({
      attributeId: av.attributeId,
      languageId: av.languageId,
      value: value,
      orderNo: av.orderNo,
    });
  });
}

/**
 * Performs client-side validation.
 *
 * @param i18n An I18nManager instance
 * @param attributes An array of attributes for check
 * @param attributeValuesByAttributeId An object where property is attribute name and value is attribute values
 * @param oldAttributeValuesByAttributeId An object where property is attribute name and value is old attribute values
 * @returns {{}}
 */
function validate(i18n, attributes, attributeValuesByAttributeId, oldAttributeValuesByAttributeId) {
  // register messages for validators
  // todo: move it to another convenient place
  i18n.register('validatejs', messages);

  const attributeErrorsByAttributeId = {};

  _.forEach(attributes, attr => {
    const attributeErrors = [];
    const attributeValues = attributeValuesByAttributeId[attr.id];
    const oldAttributeValues = !_.isUndefined(oldAttributeValuesByAttributeId) ?
                                              oldAttributeValuesByAttributeId[attr.id] : [];
    const parsedAttributeValues = [];

    // check whether attribute is not empty
    if (attr.isRequired) {
      // if there are no attribute values and attribute has attribute value in db
      if (_.isEmpty(attributeValues) && _.isEmpty(oldAttributeValues)) {
        const defaultMessage = i18n.getMessage('validatejs.blank.message');
        attributeErrors.push({ orderNo: 1, defaultMessage: defaultMessage });
      }

      // checks attribute values which contains only whitespace chars
      if (_.isEmpty(attributeErrors)) {
        _.forEach(attributeValues, av => {
          if (!trim(av.value)) {
            const defaultMessage = i18n.getMessage('validatejs.blank.message');
            attributeErrors.push({ orderNo: av.orderNo, defaultMessage: defaultMessage });
          }
        });
      }

      if (!_.isEmpty(attributeErrors)) {
        attributeErrorsByAttributeId[attr.id] = attributeErrors;
        return attributeErrorsByAttributeId;
      }
    }

    // try to parse value as locale-specific
    const formatter = getFormatter(i18n, attr);
    _.forEach(attributeValues, av => {
      try {
        parsedAttributeValues.push({
          orderNo: av.orderNo,
          value: formatter.parse(av.value),
        })
      } catch (ex) {
        attributeErrors.push({ orderNo: av.orderNo, defaultMessage: ex.message });
      }
    });

    if (!_.isEmpty(attributeErrors)) {
      attributeErrorsByAttributeId[attr.id] = attributeErrors;
      return attributeErrorsByAttributeId;
    }

    // apply validators
    const validators = getValidators(i18n, attr);
    _.forEach(validators, validator => {
      _.forEach(parsedAttributeValues, av => {
        try {
          validator.validate(av.value);
        } catch (ex) {
          attributeErrors.push({ orderNo: av.orderNo, defaultMessage: ex.message })
        }
      });
    });

    if (!_.isEmpty(attributeErrors)) {
      attributeErrorsByAttributeId[attr.id] = attributeErrors;
      return attributeErrorsByAttributeId;
    }

    return null;
  });

  return attributeErrorsByAttributeId;
}

export {
  getConverter,
  toLocaleFormat,
  toInternalFormat,
  validate
}
