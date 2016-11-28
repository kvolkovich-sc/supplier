export default {
  locales: ['de'],
  messages: {
    errors: {
      key: '"{{!key}}" ',
      boolean: {
        base: 'Muss Wahrheitswert (Boolean) sein'
      },
      date: {
        base: 'Muss ein Datum sein',
        min: 'Muss größer als oder gleich {{limit}} sein',
        max: 'Muss kleiner als oder gleich {{limit}} sein',
      },
      string: {
        base: 'Muss eine Zeichenkette (String) sein',
        min: 'Länge muss mindestens {{limit}} Zeichen lang sein',
        max: 'Länge muss kleiner als oder gleich {{limit}} Zeichen lang sein',
        regex: {
          base: 'Mit dem Wert {{!value}} entspricht nicht dem erforderlichen Muster: {{pattern}}'
        },
      },
      number: {
        base: 'Muss numerisch sein',
        min: 'Muss größer als oder gleich {{limit}} sein',
        max: 'Muss kleiner als oder gleich {{limit}} sein',
      },
    },
    error: {
      parse: {
        value: 'Ungültiger Wert',
        number: 'Ungültiges Zahlenformat',
        date: 'Ungültiges Datumsformat',
      },
      property: {
        max: {
          exceeded: 'Muss kleiner als oder gleich {max} sein'
        },
        min: {
          notmet: 'Muss größer als oder gleich {min} sein'
        },
      },
    },
    tooltip: {
      common: {
        asDefaultValue: 'Als Standardwert verwenden',
        confirmation: 'Sie haben Änderungen vorgenommen. Wenn Sie diese Seite verlassen,' +
        ' werden die Änderungen nicht gespeichert',
      }
    },
    label: {
      textTable: {
        schemaId: 'Schema ID'
      },
      string: {
        minLength: 'Min. Länge',
        maxLength: 'Max. Länge',
        pattern: 'Muster',
      },
      number: {
        min: 'Min',
        max: 'Max',
        step: 'Schritt',
      },
      date: {
        from: 'Von',
        to: 'Bis',
      },
      common: {
        uom: 'ME',
        layout: 'Layout',
        valueOptions: 'Werteoptionen',
        valueList: 'Werteliste',
        defaultValue: 'Standardwert',
        value: 'Wert',
        description: 'Beschreibung',
        update: 'Aktualisieren',
        cancel: 'Abbrechen',
      },
    },
    title: {
      date: 'Die Erweiterung des Datumstyps bearbeiten',
      number: 'Die Erweiterung des Nummertyps bearbeiten',
      integer: 'Die Erweiterung des Ganzzahltyps bearbeiten',
      long: 'Die Erweiterung des Langzahltyps bearbeiten',
      decimal: 'Die Erweiterung des Dezimalzahltyps bearbeiten',
      boolean: 'Die Erweiterung des Booleantyps bearbeiten',
      string: 'Die Erweiterung des Stringtyps bearbeiten',
      markdown: 'Die Erweiterung des Markdowntyps bearbeiten',
      textTable: 'Die Erweiterung des Texttabellentyps bearbeiten',
    },
  },
};
