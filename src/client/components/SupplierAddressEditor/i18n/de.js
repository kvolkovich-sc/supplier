// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Wollen Sie den Vorgang wirklich abbrechen?';
Confirmation.delete = "Wollen Sie diese Adresse wirklich löschen?";

let Button = {};
Button.add = 'Hinzufügen';
Button.edit = ' Bearbeiten';
Button.view = ' Ansehen';
Button.delete = ' Löschen';
Button.attach = 'Dokument hinzufügen';
Button.save = 'Speichern';
Button.cancel = 'Abbrechen';
Button.close = 'Schliessen';

let Label = {
  address: {}
};
Label.type = 'Typ';
Label.address.street = 'Straße';
Label.address.zipCode = 'Postleitzahl';
Label.address.city = 'Stadt';
Label.address.countryId = 'Land';
Label.address.phoneNo = 'Telefon';
Label.address.faxNo = 'Telefax';
Label.address.salutation = 'Anrede';
Label.address.name1 = 'Name 1';
Label.address.name2 = 'Name 2';
Label.address.name3 = 'Name 3';
Label.address.areaCode = 'Postleitzahlbereich';
Label.address.state = 'Bundesland';
Label.address.pobox = 'Postfach';
Label.address.poboxZipCode = 'PLZ des Postfachs';
Label.address.email = 'Email';

let Title = 'Bitte hinterlegen Sie hier die Unternehmensanschrift.';

let Message = {
  objectDeleted: 'Objekt gelöscht.',
  objectUpdated: 'Objekt aktualisiert.',
  objectSaved: 'Die Daten wurden erfolgreich gespeichert',
  deleteFailed: 'Das Objekt kann nicht gelöscht werden, vielleicht ist es bereits im Einsatz.',
  saveFailed: 'Speichern von Objekten fehlgeschlagen.',
  updateFailed: 'Object update failed.'
};

let Select = {};
Select.type = 'Bitte den Adresstyp auswählen ...';
Select.country = 'Bitte ein Land auswählen ...';

let AddressInfo = {};
AddressInfo.created = 'Die Informationen auf diesem Reiter wurden erstmalig durch {by} am {on} erstellt.';
AddressInfo.changed = 'Die Informationen wurden zuletzt am {on} durch {by} bearbeitet.';

let AddressType = {};
AddressType.default = 'Standard-Firmenanschrift';
AddressType.invoice = 'Rechnungsanschrift';
AddressType.rma = 'Retourenanschrift';
AddressType.plant = 'Werksanschrift';

export default {
  SupplierAddressEditor: {
    Confirmation: Confirmation,
    Message: Message,
    Button: Button,
    Label: Label,
    Title: Title,
    Select: Select,
    AddressInfo: AddressInfo,
    AddressType: AddressType,
  }
};
