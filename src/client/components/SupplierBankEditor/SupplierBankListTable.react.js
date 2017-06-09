import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';
import i18n from '../../i18n/I18nDecorator.react.js';

/**
 * Supplier contact list table
 *
 * @author Dmitry Divin
 */
@i18n
class SupplierBankListTable extends Component {

  static propTypes = {
    contacts: React.PropTypes.array.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onView: React.PropTypes.func.isRequired,
    readOnly: React.PropTypes.bool
  };

  onEdit = (contact) => {
    this.props.onEdit(contact);
  };

  onDelete = (contact) => {
    if (!confirm(this.context.i18n.getMessage('SupplierContactEditor.Confirmation.delete'))) {
      return;
    }
    this.props.onDelete(contact);
  };

  onView = (contact) => {
    this.props.onView(contact);
  };

  render() {
    const contacts = this.props.contacts;
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.context.i18n.getMessage('SupplierContactEditor.Label.accountNumber')}</th>
            <th>{this.context.i18n.getMessage('SupplierContactEditor.Label.bankIdentificationCode')}</th>
            <th>{this.context.i18n.getMessage('SupplierContactEditor.Label.bankCountryKey')}</th>
            <th>{this.context.i18n.getMessage('SupplierContactEditor.Label.bankCode')}</th>
            <th>{this.context.i18n.getMessage('SupplierContactEditor.Label.bankName')}</th>
            <th>{this.context.i18n.getMessage('SupplierContactEditor.Label.extBankControlKey')}</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
        {contacts.map((contact, index) => {
          return (
            <tr key={'contact-' + index}>
              <td>
                {contact.contactType ?
                  this.context.i18n.getMessage('SupplierContactEditor.ContactType.' + contact.contactType) : ''}
              </td>
              <td>
                {contact.department ?
                  this.context.i18n.getMessage('SupplierContactEditor.Department.' + contact.department) : ''}
              </td>
              <td>{contact.lastName}</td>
              <td className="text-right">
                {this.props.readOnly ? (
                  <nobr>
                    <Button onClick={this.onView.bind(this, contact)} bsSize="sm">
                      <span className='glyphicon glyphicon-eye-open' />&nbsp;
                      {this.context.i18n.getMessage('SupplierContactEditor.Button.view')}
                    </Button>
                  </nobr>
                ) : (
                  <nobr>
                    <Button onClick={this.onEdit.bind(this, contact)} bsSize="sm">
                      <span className="glyphicon glyphicon-edit" />&nbsp;
                      {this.context.i18n.getMessage('SupplierContactEditor.Button.edit')}
                    </Button>
                    <Button onClick={this.onDelete.bind(this, contact)} bsSize="sm">
                      <span className="glyphicon glyphicon-trash" />&nbsp;
                      {this.context.i18n.getMessage('SupplierContactEditor.Button.delete')}
                    </Button>
                  </nobr>
                )}
              </td>
            </tr>
          );
        }
        )}
        </tbody>
      </table>
    );
  }
}

export default SupplierBankListTable;
