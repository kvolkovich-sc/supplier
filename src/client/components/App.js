import React from 'react';
import { Route, Link } from 'react-router-dom';
import SupplierEditor from './SupplierEditor';
import SupplierAddressEditor from './SupplierAddressEditor';
import SupplierContactEditor from './SupplierContactEditor';

let contactEditor = (
  <SupplierContactEditor
    key='contact'
    dateTimePattern="MM/dd/yyyy h:mm:ss a"
    readOnly={false /* TODO: only supplier creator can edit his supplier info */}
    actionUrl="http://example.com"
    supplierId={1}
    locale="en"
    username="John Wayne"
  />
);

const App = () => (
  <div>
    <nav>
      <Link to="/" activeOnlyWhenExact activeClassName="active">Supplier</Link>
      <Link to="/address" activeOnlyWhenExact activeClassName="active">Supplier Address</Link>
      <Link to="/contact" activeOnlyWhenExact activeClassName="active">Supplier Contact</Link>
    </nav>
    <Route exact path="/" render={() => contactEditor }/>
  </div>
)

export default App;
