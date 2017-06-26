import React, {Component} from 'react';
import i18n from '../../i18n/I18nDecorator.react.js';
import CountryTableField from '../CountryTableField.react';

@i18n
class DisplayRow extends Component {

  static propTypes = {
    account: React.PropTypes.object
  };

  static defaultProps = {
    account: {
      accountNumber: 'Default',
      bankIdentificationCode: 'Default',
      bankName: 'Default',
      bankCountryKey: 'Default',
      bankCode: 'Default',
      extBankControlKey: 'Default',
      swiftCode: 'Default',
      readOnly: false
    }
  };

  render() {
    const account = this.props.account;

    return (
      <tr>
        <td>{ account.accountNumber}</td>
        <td>{ account.bankIdentificationCode }</td>
        <td>{ account.bankName }</td>
        <CountryTableField countryId={account.bankCountryKey} actionUrl={this.props.actionUrl} />
        <td>{ account.bankCode }</td>
        <td>{ account.extBankControlKey }</td>
        <td>{ account.swiftCode }</td>
        <td className="text-right">
          {this.props.readOnly ? (
            <nobr>
              <Button onClick={this.onView.bind(this, account)} bsSize="sm">
                <span className='glyphicon glyphicon-eye-open'/>&nbsp;
                {this.context.i18n.getMessage('SupplierBankAccountEditor.Button.view')}
              </Button>
            </nobr>
          ) : (
            <nobr>
              <Button onClick={this.onEdit.bind(this, account)} bsSize="sm">
                <span className="glyphicon glyphicon-edit"/>&nbsp;
                {this.context.i18n.getMessage('SupplierBankAccountEditor.Button.edit')}
              </Button>
              <Button onClick={this.onDelete.bind(this, account)} bsSize="sm">
                <span className="glyphicon glyphicon-trash"/>&nbsp;
                {this.context.i18n.getMessage('SupplierBankAccountEditor.Button.delete')}
              </Button>
            </nobr>
          )}
        </td>
      </tr>
    );
  }
}

export default DisplayRow;
