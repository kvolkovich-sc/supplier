# Supplier Service (supplier) React Components Documentation

## Supplier Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true |  |
| supplierId | string | true | ID of Supplier |
| supplierName | string | false | Name of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true |  |
| onUnauthorized | function | false |  |
| onChange | function | false |  |
| onUpdate | function | false |  |
| onLogout | function | false |  |

### Basic Example

```
import { SupplierEditor } from 'supplier';

<SupplierEditor
  key='company'
  actionUrl='http://localhost:3001'
  supplierId='hard001'
  supplierName='Hardware AG'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy h:mm:ss a'
/>
```

## Supplier Registration Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| actionUrl | string | true |  |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true |  |
| onUnauthorized | function | false |  |
| onChange | function | false |  |
| onUpdate | function | false |  |
| onLogout | function | false |  |

### Basic Example

```
import { SupplierRegistrationEditor } from 'supplier';

<SupplierRegistrationEditor
  key='company'
  actionUrl='http://localhost:3001'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy h:mm:ss a'
/>
```

## Supplier Address Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false |  |
| actionUrl | string | true |  |
| supplierId | string | true | ID of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true |  |
| countries | array | true |  |
| onUnauthorized | function | false |  |
| onChange | function | false |  |

### Basic Example

```
import { SupplierAddressEditor } from 'supplier';

<SupplierAddressEditor
  key='address'
  readOnly={false}
  actionUrl='http://localhost:3001'
  dateTimePattern='MM/dd/yyyy h:mm:ss a'
  supplierId='hard001'
  locale='en'
  username='Marlon Wayans'
  countries={[{id: 'DE', name: 'Germany'}, {id: 'NL', name: 'Netherlands'}]}
/>
```

## Supplier Contact Editor

### Props

| Name | Type | Required | Description |
|:-----|:----:|:--------:|------------:|
| readOnly | boolean | false |  |
| actionUrl | string | true |  |
| supplierId | string | true | ID of Supplier |
| locale | string | false | Locale |
| username | string | true | User (customer) name |
| dateTimePattern | string | true |  |
| onUnauthorized | function | false |  |
| onChange | function | false |  |

### Basic Example

```
import { SupplierContactEditor } from 'supplier';

<SupplierContactEditor
  key='contact'
  readOnly={false}
  actionUrl='http://localhost:3001'
  supplierId='hard001'
  locale='en'
  username='Marlon Wayans'
  dateTimePattern='MM/dd/yyyy h:mm:ss a'
  isOnboarding={true}
/>
```
