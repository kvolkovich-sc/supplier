# Supplier Service (supplier) React Components Documentation

## Supplier Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |
| supplierName | string | false | Name of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true | Date format . E.g. `dd/MM/yyyy`, `MM.dd.yyyy`, etc. |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |
| onUpdate | function | false | Callback fired on supplier update `(supplier) => {}` |
| onLogout | function | false | Callback fired on logout |

### Basic Example

```
import { SupplierEditor } from 'supplier';

<SupplierEditor
  key='company'
  actionUrl='http://localhost:8080'
  supplierId='hard001'
  supplierName='Hardware AG'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy'
/>
```

## Supplier Registration Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true | Base url of service |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true | Date format . E.g. `dd/MM/yyyy`, `MM.dd.yyyy`, etc. |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |
| onUpdate | function | false | Callback fired on supplier create `(supplier) => {}` |
| onLogout | function | false | Callback fired on logout |

### Basic Example

```
import { SupplierRegistrationEditor } from 'supplier';

<SupplierRegistrationEditor
  key='company'
  actionUrl='http://localhost:8080'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy'
/>
```

## Supplier Address Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false | Read only input |
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true | Date format . E.g. `dd/MM/yyyy`, `MM.dd.yyyy`, etc. |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |

### Basic Example

```
import { SupplierAddressEditor } from 'supplier';

<SupplierAddressEditor
  key='address'
  readOnly={false}
  actionUrl='http://localhost:8080'
  dateTimePattern='MM/dd/yyyy'
  supplierId='hard001'
  locale='en'
  username='Marlon Wayans'
/>
```

## Supplier Contact Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false | Read only input |
| actionUrl | string | true | Base url of service |
| supplierId | string | true | ID of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true | Date format . E.g. `dd/MM/yyyy`, `MM.dd.yyyy`, etc. |
| onUnauthorized | function | false | Callback fired when unauthorized |
| onChange | function | false | Callback fired on input change `(event) => {}` |

### Basic Example

```
import { SupplierContactEditor } from 'supplier';

<SupplierContactEditor
  key='contact'
  readOnly={false}
  actionUrl='http://localhost:8080'
  supplierId='hard001'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy'
  isOnboarding={true}
/>
```
