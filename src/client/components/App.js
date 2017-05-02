import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import SupplierEditor from './SupplierEditor';
import SupplierRegistrationEditor from './SupplierRegistrationEditor';
import SupplierAddressEditor from './SupplierAddressEditor';
import SupplierContactEditor from './SupplierContactEditor';

const countries = [{id: 'DE', name: 'Germany'}, {id: 'NL', name: 'Netherlands'}];
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
const username = 'scott.tiger@example.com';
const actionUrl = 'http://localhost:3001'


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
    username={username}
    dateTimePattern='MM/dd/yyyy'
    supplier={onboardingSupplier}
  />
);

let addressEditor = (
  <SupplierAddressEditor
    key='address'
    readOnly={false}
    actionUrl={actionUrl}
    dateTimePattern='MM/dd/yyyy'
    supplierId={supplier.supplierId}
    locale='en'
    username={username}
    countries={countries}
  />
);

let contactEditor = (
  <SupplierContactEditor
    key='contact'
    dateTimePattern='MM/dd/yyyy'
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
      <li><NavLink exact activeStyle={activeStyle} to='/'>Supplier</NavLink></li>
      <li><NavLink activeStyle={activeStyle} to='/registration'>Supplier Registration</NavLink></li>
      <li><NavLink activeStyle={activeStyle} to='/address'>Supplier Address</NavLink></li>
      <li><NavLink activeStyle={activeStyle} to='/contact'>Supplier Contact</NavLink></li>
    </ul>
    <Route exact path='/' render={() => editor }/>
    <Route exact path='/registration' render={() => registrationEditor }/>
    <Route exact path='/address' render={() => addressEditor }/>
    <Route exact path='/contact' render={() => contactEditor }/>
  </div>
)

export default App;
