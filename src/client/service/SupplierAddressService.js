import request from 'superagent-bluebird-promise';

/**
 * @deprecated
 */
export default class SupplierAddressService {

  constructor(actionUrl) {
    this._actionUrl = actionUrl;
  }

  getSupplierAddressList = (supplierId) => {
    return request.get(
      `${this._actionUrl}/api/suppliers/${encodeURIComponent(supplierId)}/addresses`
    ).
    set('Accept', 'application/json').
    catch((errors) => {
      console.log('Error during retrieving SupplierAddress list:');
      console.log(errors);
    });
  };

  createSupplierAddress = (supplierId, object) => {
    console.log(`Crate new SupplierAddress for supplierId=${supplierId}`);
    return request.
    post(
      `${this._actionUrl}/api/suppliers/${encodeURIComponent(supplierId)}/addresses`
    ).
    set('Accept', 'application/json').
    send(object).catch((errors) => {
      console.log('Error during create SupplierAddress:');
      console.log(errors);
    });
  };

  updateSupplierAddress = (supplierId, object) => {
    console.log(`Updating SupplierAddress with id=${object.id}`);
    return request.put(
      `${this._actionUrl}/api/suppliers/${encodeURIComponent(supplierId)}/addresses/${encodeURIComponent(object.id)}`
    ).
    set('Accept', 'application/json').
    send(object).catch((errors) => {
      console.log('Error during updating SupplierAddress:');
      console.log(errors);
    });
  };

  saveSupplierAddress = (supplierId, object) => {
    if (object.id) {
      return this.updateSupplierAddress(supplierId, object);
    } else {
      return this.createSupplierAddress(supplierId, object);
    }
  };

  deleteSupplierAddress = (supplierId, supplierAddressId) => {
    console.log(`Deleting SupplierAddress with id=${supplierAddressId}`);
    return request.del(
      // eslint-disable-next-line  max-len
      `${this._actionUrl}/api/suppliers/${encodeURIComponent(supplierId)}/addresses/${encodeURIComponent(supplierAddressId)}`
    ).
    set('Accept', 'application/json').
    catch(function(errors) {
      console.log('Error during deleting SupplierAddress:');
      console.log(errors);
    });
  };
}
