// Confirmation dialogs
let Confirmation = {};
Confirmation.cancel = 'Do you really want to cancel?';
Confirmation.delete = 'Do you really want to delete this supplier?';

let ButtonLabel = {};
ButtonLabel.add = 'Add';
ButtonLabel.edit = 'Edit';
ButtonLabel.delete = 'Delete';
ButtonLabel.save = 'Save';
ButtonLabel.cancel = 'Cancel';

let TableHeader = {};
TableHeader.supplierName = 'Company name-';
TableHeader.homePage = 'Home page';
TableHeader.foundedOn = 'Founded/Established on';
TableHeader.legalForm = 'Legal form';
TableHeader.registrationNumber = 'Company registration number';
TableHeader.cityOfRegistration = 'City of registration';
TableHeader.countryOfRegistration = 'Country of registration';
TableHeader.taxId = 'Tax identification';
TableHeader.vatRegNo = 'VAT registration number';
TableHeader.dunsNo = 'D-U-N-S number';
TableHeader.globalLocationNo = 'Global location number';

let Description = {};
Description.chooseSupplier = 'Choose an existing company or provide general information for a new one.';
Description.modifySupplierOrChooseAnother = 'Please provide general company information here.';
Description.viewSupplierOrChooseAnother = 'General company information.';

let Select = {};
Select.country = 'Select country...';

let Label = {
  supplierName: {},
  supplierId: {},
  homePage: {},
  foundedOn: {},
  legalForm: {},
  registrationNumber: {},
  cityOfRegistration: {},
  countryOfRegistration: {},
  taxId: {},
  vatRegNo: {},
  dunsNo: {},
  globalLocationNo: {}
};
Label.supplierName.label = 'Company Name';
Label.supplierId.label = 'Company ID';
Label.homePage.label = 'Home Page';
Label.foundedOn.label = 'Founded/Established On';
Label.legalForm.label = 'Legal Form';
Label.registrationNumber.label = 'Company Registration Number';
Label.cityOfRegistration.label = 'City Of Registration';
Label.countryOfRegistration.label = 'Country Of Registration';
Label.taxId.label = 'Tax Identification';
Label.vatRegNo.label = 'VAT Registration Number';
Label.dunsNo.label = 'D-U-N-S Number';
Label.globalLocationNo.label = 'Global Location Number';

let SupplierEditor = {};
SupplierEditor.created = 'Information on this page was initially created by {by} on {on}.';
SupplierEditor.changed = 'Information on this page was last updated on {on} by {by}.';

const Messages = {};
Messages.loading = 'Loading...';
Messages.unableToRender = 'Unable to render editor';
Messages.saved = 'Data is successfully saved';
Messages.failed = 'Data saving failed';
Messages.failedModifyingNotAuthoredSupplier = 'Data saving failed: only the author can update company information';
Messages.failedCreatingExistingSupplier = 'Data saving failed:' +
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
