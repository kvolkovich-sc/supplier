# Supplier Service (supplier) React Components Documentation

---

## Supplier Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false |  |
| actionUrl | string | true |  |
| supplierId | string | false | ID of Supplier |
| supplierName | string | false | Name of Supplier |
| companyRole | string | false | Supplier Company Role |
| locale | string | false | Locale |
| username | string | false | User (customer) name |
| dateTimePattern | string | true |  |
| countries | array | false |  |
| supplier | object | false | Supplier object |
| isOnboarding | boolean | false |  |
| onUnauthorized | function | false |  |
| onChange | function | false |  |
| onUpdate | function | false |  |
| onLogout | function | false |  |

### Basic Example

```
import { SupplierEditor } from 'supplier';

<SupplierEditor
  key='company'
  readOnly={false}
  actionUrl='http://localhost:3001'
  supplierId='hard001'
  supplierName='Hardware AG'
  companyRole='selling'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy h:mm:ss a'
  countries={[{id: 'DE', name: 'Germany'}, {id: 'NL', name: 'Netherlands'}]}
  isOnboarding={true}
  supplier={{ supplierId: 'hard001', supplierName: 'Hardware AG' }}
/>
```
