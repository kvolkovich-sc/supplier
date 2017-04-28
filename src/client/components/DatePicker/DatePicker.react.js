import datepicker  from './bootstrap-datepicker';
import './bootstrap-datepicker-i18n';

import jQuery  from 'jquery';
import React  from 'react';
import ReactDOM  from 'react-dom';
import _ from 'underscore';

require("./bootstrap-datepicker.css");

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.locale = props.locale || 'en';

    let format = props.format || 'dd/MM/yyyy';
    //normalize format from Java to bootstrap-datepicker
    this.format = format.replace(/M{2}/g, 'mm').replace('mmmm', 'MM');

    this.options = props.options || {};
  }

  prepareOptions() {
    let defaultOptions = {
      autoclose: true,
      todayHighlight: true,
      todayBtn: 'linked',
      language: this.locale,
      format: this.format,
      forceParse: false,
      showAnim: 'fold',
      showButtonPanel: true,
      clearBtn: true,
      disabled: this.props.disabled
    };

    return _.extend(defaultOptions, this.options);
  }

  componentDidMount() {
    let input = ReactDOM.findDOMNode(this.refs.input);
    this.dateElement = input;

    jQuery(this.dateElement)
      .datepicker(this.prepareOptions())
      .on('changeDate', function() {
        // fire event to change date
        var event = document.createEvent('Event');
        event.initEvent('input', true, true);
        input.dispatchEvent(event);
      });
  }

  componentWillUnmount() {
    jQuery(this.dateElement).datepicker('remove');
  }

  render() {
    let {
      locale,
      ...inputProps
    } = this.props;

    return <input ref="input" {...inputProps}/>;
  }
}
