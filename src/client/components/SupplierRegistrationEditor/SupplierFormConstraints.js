module.exports = function(validatejsI18N) {
  return {
    supplierName: {
      presence: {
        message: validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 50,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 50
        })
      }
    },
    registrationNumber: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    cityOfRegistration: {
      presence: {
        message: validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    countryOfRegistration: {
      presence: {
        message: validatejsI18N.getMessage('validatejs.blank.message')
      },
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    taxId: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    vatRegNo: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      },
      vatNumber: {
        message: validatejsI18N.getMessage('validatejs.invalid.vatNumber.message')
      }
    },
    globalLocationNo: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    },
    dunsNo: {
      presence: false,
      length: {
        maximum: 250,
        tooLong: validatejsI18N.getMessage('validatejs.invalid.maxSize.message', {
          limit: 250
        })
      }
    }
  };
};
