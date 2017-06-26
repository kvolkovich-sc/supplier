import React, {Component} from 'react';
import i18n from '../../i18n/I18nDecorator.react.js';
import Button from 'react-bootstrap/lib/Button';

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
    }
  };

  render() {
    const account = this.props.account;

    return (
      <tr>
        <td>{ account.accountNumber}</td>
        <td>{ account.bankName }</td>
        <td>{ account.bankIdentificationCode }</td>
        <td>{ account.bankCountryKey }</td>
        <td>{ account.bankCode }</td>
        <td>{ account.extBankControlKey }</td>
        <td>{ account.swiftCode }</td>
        <td className="text-right">
          {this.props.readOnly ? (
            <nobr>
              <Button bsSize="sm">
                <span className='glyphicon glyphicon-eye-open'/>&nbsp;
                {this.context.i18n.getMessage('SupplierBankAccountEditor.Button.view')}
              </Button>
            </nobr>
          ) : (
            <nobr>
              <Button bsSize="sm">
                <span className="glyphicon glyphicon-edit"/>&nbsp;
                {this.context.i18n.getMessage('SupplierBankAccountEditor.Button.edit')}
              </Button>
              <Button bsSize="sm">
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
