import React, {Component} from "react";
import Button from "react-bootstrap/lib/Button";
import i18n from "../../../i18n/I18nDecorator.react";
import '../../DisplayTable/DisplayField.react.js';
import DisplayField from '../../DisplayTable/DisplayField.react.js';

@i18n
class ViewGroup extends Component {
  render() {
    return (<DisplayField><Button bsSize="sm">
      <span className='glyphicon glyphicon-eye-open'/>&nbsp;
      {this.context.i18n.getMessage('SupplierBankAccountEditor.Button.view')}
    </Button></DisplayField>)
  }
}

export default ViewGroup;
