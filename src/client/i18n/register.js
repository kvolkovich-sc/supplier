import { I18nManager } from 'opuscapita-i18n';
import globalMessages from '../utils/validatejs/i18n';

export default function register(locale, componentName, messages) {
  var i18n = new I18nManager(locale, globalMessages);
  i18n.register(componentName, messages);

  return i18n;
}
