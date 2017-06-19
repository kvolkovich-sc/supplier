module.exports.vatNumber = function(validate) {
  return validate.validators.vatNumber = function(value, options, key, attributes) {
    if (!value) return null;

    const vatNumberValidator = require('../vatNumberValidator.js');
    const newVATNumber = vatNumberValidator.checkVATNumber(value);

    if (newVATNumber) return null;

    return options.message;
  };
};

module.exports.iban = function(validate) {
  return validate.validators.iban = function(value, options, key, attributes) {
    if (!value) return null;

    const IBAN = require('iban');

    if (IBAN.isValid(value)) return null;

    return options.message;
  };
};

module.exports.bic = function(validate) {
  return validate.validators.bic = function(value, options, key, attributes) {
    if (!value) return null;

    const validBIC = /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(value.toUpperCase());

    if (validBIC) return null;

    return options.message;
  };
};
