# Supplier Service (supplier) API documentation version 1.0.0

---

## Suppliers
Work with `Supplier` objects.

### /suppliers

#### **GET**:
List of `Supplier` objects.

### Response code: 200

#### SupplierArray (application/json) 

```
[{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}]
 ```

List of *Supplier*:

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

---
#### **POST**:
Adds a new supplier.

#### Supplier (application/json) 
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 200

#### Supplier (application/json) 
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 409
A supplier with the same supplierId but different set of properties already exists.

---

### /suppliers/{supplierId}

* **supplierId**: Identifier of a supplier.
    * Type: string
    
    * Required: true

#### **GET**:
Single `Supplier` object.

### Response code: 200

#### Supplier (application/json) 
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

---
#### **PUT**:
Updates a supplier.

#### Supplier (application/json) 
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 200

#### Supplier (application/json) 
Object representing a single supplier item.

```
{
  "supplierId": "hard001",
  "supplierName": "jCatalog",
  "foundedOn": "2015-10-04T22:00:00.000Z",
  "legalForm": "KG",
  "registrationNumber": "MI651355",
  "cityOfRegistration": "Dortmund",
  "countryOfRegistration": "Germany",
  "taxId": "1234567",
  "vatRegNo": null,
  "globalLocationNo": "123",
  "homePage": "http://jcatalog.com/",
  "dunsNo": null,
  "createdOn": "2016-02-19T10:45:26.000Z",
  "changedOn": "2016-02-19T10:45:26.000Z",
  "changedBy": "jcadmin",
  "createdBy": "jcadmin"
}
 ```

| Name | Type | Description | Required | Pattern |
|:-----|:----:|:------------|:--------:|--------:|
| foundedOn | string |  | true |  |
| homePage | string |  | true |  |
| createdOn | string |  | true |  |
| createdBy | string |  | true |  |
| changedOn | string |  | true |  |
| registrationNumber | string |  | true |  |
| supplierId | string |  | true |  |
| countryOfRegistration | string |  | true |  |
| dunsNo | string |  | false |  |
| changedBy | string |  | true |  |
| vatRegNo | string |  | false |  |
| supplierName | string |  | true |  |
| globalLocationNo | string |  | true |  |
| taxId | string |  | true |  |
| legalForm | string |  | true |  |

### Response code: 403
Operation is not authorized

### Response code: 422
Inconsistent data

---

