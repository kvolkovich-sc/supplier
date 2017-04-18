// export SupplierEditor from './components/SupplierEditor';
// export SupplierAddressEditor from './components/SupplierAddressEditor';
// export SupplierContactEditor from './components/SupplierContactEditor';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));
