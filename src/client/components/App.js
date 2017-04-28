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
  cityOfRegistration: "Minsk",
  countryOfRegistration: "DE",
  role: "selling",
  foundedOn: "2015-10-04T22:00:00Z",
  globalLocationNo: "123",
  homePage: "http://hard.ware.ag",
  legalForm: "KG",
  registrationNumber: "MI651355",
  status: "new",
  createdBy: "john.doe@ncc.com",
  changedBy: "john.doe@ncc.com"
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
    countries={countries}
  />
);

let registrationEditor = (
  <SupplierRegistrationEditor
    key='company'
    actionUrl={actionUrl}
    locale='en'
    username={username}
    dateTimePattern='MM/dd/yyyy'
    countries={countries}
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
