export default {
  locales: ['en'],
  messages: {
    errors: {
      key: '"{{!key}}" ',
      boolean: {
        base: 'Must be a boolean'
      },
      date: {
        base: 'Must be a date',
        min: 'Must be larger than or equal to {{limit}}',
        max: 'Must be less than or equal to {{limit}}',
      },
      string: {
        base: 'Must be a string',
        min: 'Length must be at least {{limit}} characters long',
        max: 'Length must be less than or equal to {{limit}} characters long',
        regex: {
          base: 'With value {{!value}} fails to match the required pattern: {{pattern}}'
        },
      },
      number: {
        base: 'Must be a number',
        min: 'Must be larger than or equal to {{limit}}',
        max: 'Must be less than or equal to {{limit}}',
      },
    },
    error: {
      parse: {
        value: 'Invalid value',
        number: 'Invalid number format',
        date: 'Invalid date format',
      },
      property: {
        max: {
          exceeded: 'Must be less than or equal to {max}'
        },
        min: {
          notmet: 'Must be larger than or equal to {min}'
        },
      },
    },
    tooltip: {
      common: {
        asDefaultValue: 'Use as default value',
        confirmation: 'You have made changes. Leaving this site will lose these changes',
      }
    },
    label: {
      textTable: {
        schemaId: 'Schema ID'
      },
      string: {
        minLength: 'Min Length',
        maxLength: 'Max Length',
        pattern: 'Pattern',
      },
      number: {
        min: 'Min',
        max: 'Max',
        step: 'Step',
      },
      date: {
        from: 'From',
        to: 'To',
      },
      common: {
        uom: 'UOM',
        layout: 'Layout',
        valueOptions: 'Value Options',
        valueList: 'Value List',
        defaultValue: 'Default Value',
        value: 'Value',
        description: 'Descripton',
        update: 'Update',
        cancel: 'Cancel',
      },
    },
    title: {
      date: 'Edit Date Type Extension',
      number: 'Edit Number Type Extension',
      integer: 'Edit Integer Type Extension',
      long: 'Edit Long Type Extension',
      decimal: 'Edit Decimal Type Extension',
      boolean: 'Edit Boolean Type Extension',
      string: 'Edit String Type Extension',
      markdown: 'Edit Markdown Type Extension',
      textTable: 'Edit Text Table Type Extension',
    },
  },
};
