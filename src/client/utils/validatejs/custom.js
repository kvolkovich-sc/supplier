module.exports.vatNumber = function(validate) {
  return validate.validators.vatNumber = function(value, options, key, attributes) {
    if (!value) return null;

    const vatNumberValidator = require('../vatNumberValidator.js');
    const newVATNumber = vatNumberValidator.checkVATNumber(value);

    if (newVATNumber) return null;

    return options.message;
  };
}
