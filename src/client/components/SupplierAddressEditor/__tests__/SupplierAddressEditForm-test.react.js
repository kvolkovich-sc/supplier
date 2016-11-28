jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const SupplierAddressEditForm = require('../SupplierAddressEditForm.react.js').default;

/**
 * Mock for container which adds i18n manager to component context.
 */
class I18nContainer extends React.Component {

  static childContextTypes = {
    i18n: React.PropTypes.object.isRequired
  };

  getChildContext = () => {
    return {
      i18n: {
        register: () => this,
        formatDate: (date) => {return '';},
        getMessage: (code) => {return '';}
      }
    };
  };

  render() {
    return this.props.children;
  }
}

let findDOMComponentWith = function(el, matcher = function() {return true;}) {
  let all = TestUtils.findAllInRenderedTree(el, function(inst) {
    return TestUtils.isDOMComponent(inst) && inst.tagName && matcher(inst);
  });
  if (all.length !== 1) {
    throw new Error('Did not find exactly one match');
  }
  return all[0];
};

describe('SupplierAddressEditForm', () => {
  let supplierAddress = {
    "id": 1,
    "type": "default",
    "addressId": "central_office",
    "supplierId": "hard001",
    "isDefault": null,
    "changedBy": "jcadmin",
    "createdBy": "jcadmin",
    "createdOn": "2016-03-29T05:24:58.000Z",
    "changedOn": "2016-03-29T05:24:58.000Z",
    "address": {
      "id": 1,
      "addressId": "central_office",
      "salutation": "Supplier",
      "name1": "Central Office",
      "name2": null,
      "name3": null,
      "street": "Fabriciusa 8, B1",
      "zipCode": "220100",
      "city": "Minsk",
      "poboxZipCode": null,
      "pobox": null,
      "isCompany": null,
      "areaCode": null,
      "phoneNo": "+491234512345",
      "faxNo": null,
      "email": "jana.pape@jcatalog.com",
      "corporateURL": null,
      "numOfEmployees": null,
      "countryId": "BY",
      "state": null,
      "changedBy": "jcadmin",
      "createdBy": "jcadmin",
      "createdOn": "2016-03-29T05:24:58.000Z",
      "changedOn": "2016-04-08T06:44:36.000Z"
    }
  };

  it('should change value', function() {
    let changeEvent = {};

    let element = TestUtils.renderIntoDocument((
      <I18nContainer>
        <SupplierAddressEditForm
          supplierAddress={supplierAddress}
          countries={[{ id: 'AD', name: 'Andorra' }, { id: 'AE', name: 'United Arab Emirates' }]}
          editMode="edit"
          dateTimePattern="MM/dd/yyyy"
          onSave={function() {}}
          onUpdate={function() {}}
          onCancel={function() {}}
          onChange={function(object, name, oldValue, newValue) {
            changeEvent.field = name;
            changeEvent.oldValue = oldValue;
            changeEvent.newValue = newValue;
          }}
        />
      </I18nContainer>
    ));
    expect(element).toBeTruthy();

    let checkEvent = function(id, newValue) {
      changeEvent = {};
      let field = findDOMComponentWith(element, (el) => {return el.getAttribute('id') === id;});
      let fieldNode = ReactDOM.findDOMNode(field);

      TestUtils.Simulate.change(fieldNode, { target: { value: newValue } });
      expect(changeEvent.field).toEqual(id);
      expect(changeEvent.newValue).toEqual(newValue);
    };


    checkEvent('type', 'type v');
    checkEvent('address.name1', 'name1 v');
    checkEvent('address.name2', 'name2 v');
    checkEvent('address.name3', 'name3 v');
    checkEvent('address.street', 'street v');
    checkEvent('address.zipCode', 'zipCode v');
    checkEvent('address.city', 'city v');
    checkEvent('address.countryId', 'AD');
    checkEvent('address.areaCode', 'areaCode v');
    checkEvent('address.state', 'state v');
    checkEvent('address.pobox', 'pobox v');
    checkEvent('address.poboxZipCode', 'poboxZipCode v');
    checkEvent('address.phoneNo', 'phoneNo v');
    checkEvent('address.faxNo', 'faxNo v');
    checkEvent('address.email', 'test@gmail.com');
  });
});
