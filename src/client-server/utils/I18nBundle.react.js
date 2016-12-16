// todo: copied from jcatalog-react-widgets
import React from 'react';
import { I18nManager } from 'opuscapita-i18n';
import messages from './i18n';

export default class I18nBundle extends React.Component {
  static propTypes = {
    locale: React.PropTypes.string,
    formatInfos: React.PropTypes.object,
  };

  static contextTypes = {
    locale: React.PropTypes.string,
    i18n: React.PropTypes.object,
  };

  static childContextTypes = {
    i18n: React.PropTypes.object.isRequired
  };

  getChildContext = () => {
    if (!this.context.i18n) {
      if (!this.props.formatInfos) {
        console.warn('attribute [formatInfos] must be require, because I18nManager not defined in parent context');
      }

      if (!this.props.locale) {
        console.warn('attribute [locale] must be require, because I18nManager not defined in parent context');
      }

      this.context.i18n = new I18nManager(this.props.locale, null, this.props.formatInfos);
    }

    return {
      i18n: this.context.i18n.register(this.constructor.name, messages)
    };
  };

  render() {
    return this.props.children;
  }
}
