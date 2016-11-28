// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Do you really want to cancel?';
Confirmation.delete = "Do you really want to delete this address?";

let Button = {};
Button.add = 'Add';
Button.edit = ' Edit';
Button.view = ' View';
Button.delete = ' Delete';
Button.attach = 'Attach';
Button.save = 'Save';
Button.cancel = 'Cancel';
Button.close = 'Close';

let Label = {
  address: {}
};
Label.type = 'Type';
Label.address.street = 'Street';
Label.address.zipCode = 'Zip code';
Label.address.city = 'City';
Label.address.countryId = 'Country';
Label.address.phoneNo = 'Telephone';
Label.address.faxNo = 'Telefax';
Label.address.salutation = 'Salutation';
Label.address.name1 = 'Name 1';
Label.address.name2 = 'Name 2';
Label.address.name3 = 'Name 3';
Label.address.areaCode = 'Area Code';
Label.address.state = 'State';
Label.address.pobox = 'PO Box';
Label.address.poboxZipCode = 'PO Box Zip Code';
Label.address.email = 'Email';

let Title = 'Please add your company addresses here.';

let Message = {
  objectDeleted: 'Object deleted.',
  objectUpdated: 'Object updated.',
  objectSaved: 'Object saved.',
  deleteFailed: 'Failed to delete object, perhaps it is already in use.',
  saveFailed: 'Object save failed.',
  updateFailed: 'Object update failed.'
};

let Select = {};
Select.type = 'Select type...';
Select.country = 'Select country...';

let AddressInfo = {};
AddressInfo.created = 'Information on this page was initially created by {by} on {on}.';
AddressInfo.changed = 'Information on this page was last updated on {on} by {by}.';

let AddressType = {};
AddressType.default = 'Default Company Address';
AddressType.invoice = 'Invoice Address';
AddressType.rma = 'RMA Address';
AddressType.plant = 'Factory Address';

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
  },
};
