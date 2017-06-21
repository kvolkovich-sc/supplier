// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Wollen Sie den Vorgang wirklich abbrechen?';
Confirmation.delete = 'Wollen Sie diesen Lieferanten wirklich löschen?';

let ButtonLabel = {};
ButtonLabel.add = 'Hinzufügen';
ButtonLabel.edit = 'Bearbeiten';
ButtonLabel.delete = 'Löschen';
ButtonLabel.attach = 'Dokument hinzufügen';
ButtonLabel.save = 'Speichern';
ButtonLabel.cancel = 'Abbrechen';

let TableHeader = {};
TableHeader.supplierName = 'Name des Unternehmens';
TableHeader.homePage = 'Homepage';
TableHeader.foundedOn = 'Datum der Firmengründung';
TableHeader.legalForm = 'Rechtsform der Unternehmung';
TableHeader.commercialRegisterNo = 'Handelsregisternummer';
TableHeader.cityOfRegistration = 'Ort der Registrierung';
TableHeader.countryOfRegistration = 'Land der Registrierung';
TableHeader.taxIdentificationNo = 'Steuernummer';
TableHeader.vatIdentificationNo = 'Umsatzsteuer-Ident-Nr.';
TableHeader.dunsNo = 'D-U-N-S-Nr.';
TableHeader.globalLocationNo = 'Global Location Number (GLN/ILN)';

let Select = {};
Select.country = 'Bitte ein Land auswählen ...';

let Description = {};
Description.viewSupplierOrChooseAnother = 'General company information.';

let Label = {
  supplierName: {},
  supplierId: {},
  homePage: {},
  role: {},
  buying: {},
  selling: {},
  foundedOn: {},
  legalForm: {},
  commercialRegisterNo: {},
  cityOfRegistration: {},
  countryOfRegistration: {},
  taxIdentificationNo: {},
  vatIdentificationNo: {},
  dunsNo: {},
  globalLocationNo: {},
  isNewSupplier: {},
  supplier: {}
};
Label.supplierName.label = 'Name des Unternehmens';
Label.supplierId.label = 'Firmen-ID';
Label.homePage.label = 'Homepage';
Label.role.label = 'Role';  // TODO: substitute with EN.
Label.buying.label = 'Buying';  // TODO: substitute with EN.
Label.selling.label = 'Selling';  // TODO: substitute with EN.
Label.foundedOn.label = 'Datum der Firmengründung';
Label.legalForm.label = 'Rechtform des Unternehmens';
Label.commercialRegisterNo.label = 'Handelsregisternummer';
Label.cityOfRegistration.label = 'Ort der Registrierung';
Label.countryOfRegistration.label = 'Land der Registrierung';
Label.taxIdentificationNo.label = 'Steuernummer';
Label.vatIdentificationNo.label = 'Umsatzsteuer-Ident-Nr.';
Label.dunsNo.label = 'D-U-N-S-Nr.';
Label.globalLocationNo.label = 'Global Location Number (GLN/ILN)';
Label.isNewSupplier.label = 'Existierenden Lieferanten auswählen';
Label.supplier.label = 'Lieferant';

let SupplierEditor = {};
SupplierEditor.created = 'Die Informationen auf diesem Reiter wurden erstmalig durch {by} am {on} erstellt.';
SupplierEditor.changed = 'Die Informationen wurden zuletzt am {on} durch {by} bearbeitet.';

const Messages = {};
Messages.loading = 'Laden...';
Messages.unableToRender = 'Der Editor kann nicht geöffnet werden';
Messages.saved = 'Die Daten wurden erfolgreich gespeichert';
Messages.failed = 'Speichern von Objekten fehlgeschlagen';
Messages.failedModifyingNotAuthoredSupplier = 'Data saving failed:' +  // TODO: substitute with EN.
  ' only the author can update company information';
Messages.failedCreatingExistingSupplier = 'Data saving failed:' +  // TODO: substitute with EN.
  ' a company with the same "Company ID" but different details already exists';

export default {
  SupplierEditor: {
    Confirmation: Confirmation,
    ButtonLabel: ButtonLabel,
    TableHeader: TableHeader,
    Description: Description,
    Select: Select,
    SupplierEditor: SupplierEditor,
    Label: Label,
    Messages,
  },
};
