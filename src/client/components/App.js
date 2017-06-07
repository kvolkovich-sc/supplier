import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import SupplierEditor from './SupplierEditor';
import SupplierRegistrationEditor from './SupplierRegistrationEditor';
import SupplierAddressEditor from './SupplierAddressEditor';
import SupplierContactEditor from './SupplierContactEditor';

const username = 'john.doe@ncc.com';
const actionUrl = 'http://localhost:8080'

const supplier = {
  supplierId: "hard001",
  supplierName: "Hardware AG",
};

const onboardingSupplier = {
  supplierName: "E-Farm AG",
  cityOfRegistration: "Hamburg",
  countryOfRegistration: "DE",
  taxId: "T-534324",
  vatRegNo: "3480954",
  dunsNo: null,
  registrationNumber: "MI342323"
};
const onboardingUser = {
  id: username,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@ncc.com',
};


let editor = (
  <SupplierEditor
    key='company'
    actionUrl={actionUrl}
    supplierId={supplier.supplierId}
    supplierName={supplier.supplierName}
    locale='en'
    username={username}
    dateTimePattern='MM/dd/yyyy'
  />
);

let registrationEditor = (
  <SupplierRegistrationEditor
    key='company'
    actionUrl={actionUrl}
    locale='en'
    supplier={onboardingSupplier}
    user={onboardingUser}
  />
);

let addressEditor = (
  <SupplierAddressEditor
    key='address'
    readOnly={false}
    actionUrl={actionUrl}
    supplierId={supplier.supplierId}
    locale='en'
    username={username}
  />
);

let contactEditor = (
  <SupplierContactEditor
    key='contact'
    readOnly={false}
    actionUrl={actionUrl}
    supplierId={supplier.supplierId}
    locale='en'
    username={username}
  />
);

const activeStyle = {color:' #ffffff', background: '#006677'}

const App = () => (
  <div>
    <ul className="nav nav-tabs">
      <li><NavLink exact activeStyle={activeStyle} to='/supplier'>Supplier</NavLink></li>
      <li><NavLink activeStyle={activeStyle} to='/supplier/registration'>Supplier Registration</NavLink></li>
      <li><NavLink activeStyle={activeStyle} to='/supplier/address'>Supplier Address</NavLink></li>
      <li><NavLink activeStyle={activeStyle} to='/supplier/contact'>Supplier Contact</NavLink></li>
    </ul>
    <Route exact path='/supplier' render={() => editor }/>
    <Route exact path='/supplier/registration' render={() => registrationEditor }/>
    <Route exact path='/supplier/address' render={() => addressEditor }/>
    <Route exact path='/supplier/contact' render={() => contactEditor }/>
  </div>
)

export default App;
