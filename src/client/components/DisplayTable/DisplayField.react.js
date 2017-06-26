import React, {Component} from "react";
import i18n from "../../i18n/I18nDecorator.react.js";

@i18n
class DisplayRow extends Component {

  render() {
    return (
      <td>{ this.props.children }</td>
    );
  }
}

export default DisplayRow;
