import React from 'react';
import { Route, Link } from 'react-router-dom';
import SupplierEditor from './SupplierEditor';
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
const username = 'Bruce Wayne';


let editor = (
  <SupplierEditor
    key='company'
    readOnly={false}
    actionUrl='http://localhost:3001'
    supplierId={supplier.supplierId}
    supplierName={supplier.supplierName}
    companyRole={supplier.role}
    locale='en'
    username={username}
    dateTimePattern='MM/dd/yyyy h:mm:ss a'
    countries={countries}
    isOnboarding={true}
    supplier={supplier}
  />
);

let addressEditor = (
  <SupplierAddressEditor
    key='address'
    readOnly={false}
    actionUrl='http://localhost:3001'
    dateTimePattern='MM/dd/yyyy h:mm:ss a'
    supplierId={supplier.supplierId}
    locale='en'
    username={username}
    countries={countries}
  />
);

let contactEditor = (
  <SupplierContactEditor
    key='contact'
    dateTimePattern='MM/dd/yyyy h:mm:ss a'
    readOnly={false}
    actionUrl='http://localhost:3001'
    supplierId={supplier.supplierId}
    locale='en'
    username={username}
  />
);

const App = () => (
  <div>
    <nav>
      <Link to='/' activeOnlyWhenExact activeClassName='active'>Supplier</Link>
      <Link to='/address' activeOnlyWhenExact activeClassName='active'>Supplier Address</Link>
      <Link to='/contact' activeOnlyWhenExact activeClassName='active'>Supplier Contact</Link>
    </nav>
    <Route exact path='/' render={() => editor }/>
    <Route exact path='/address' render={() => addressEditor }/>
    <Route exact path='/contact' render={() => contactEditor }/>
  </div>
)

export default App;
