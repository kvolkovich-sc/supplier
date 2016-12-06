import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { MenuItem, Dropdown } from 'react-bootstrap';
import { Provider, connect } from 'react-redux';
import { Router, Route, browserHistory, Link } from 'react-router';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { syncHistory, routeReducer, routeActions, UPDATE_LOCATION } from 'react-router-redux';
import _ from 'underscore';
import I18nBundle from '../../client-server/utils/I18nBundle.react';
import {
  SupplierEditor,
  SupplierAddressEditor,
  SupplierContactEditor
} from '../index.js';

const locale = 'en';
const languages = [
  {
    id: "de",
    languageName: "German",
  }, {
    id: "en",
    languageName: "English",
  }, {
    id: "es",
    languageName: "Spanish",
  }, {
    id: "fr",
    languageName: "French",
  }, {
    id: "ja",
    languageName: "Japanese",
  },
];

let countries = [
  {id: 'AD', name: 'Andorra'}, {id: 'AE', name: 'United Arab Emirates'},
  {id: 'AF', name: 'Afghanistan'}, {id: 'AG', name: 'Antigua And Barbura'},
  {id: 'AI', name: 'Anguilla'}, {id: 'AL', name: 'Albania'},
  {id: 'AM', name: 'Armenia'}, {id: 'AN', name: 'Netherlands Antilles'},
  {id: 'AO', name: 'Angola'}, {id: 'AQ', name: 'Antarctica'},
  {id: 'AR', name: 'Argentina'}, {id: 'AS', name: 'American Samoa'},
  {id: 'AT', name: 'Austria'}, {id: 'AU', name: 'Australia'},
  {id: 'AW', name: 'Aruba'}, {id: 'AZ', name: 'Azerbaijan'},
  {id: 'BA', name: 'Bosnia And Herzegowina'}, {id: 'BB', name: 'Barbados'},
  {id: 'BD', name: 'Bangladesh'}, {id: 'BE', name: 'Belgium'},
  {id: 'BF', name: 'Burkina Faso'}, {id: 'BG', name: 'Bulgaria'},
  {id: 'BH', name: 'Bahrain'}, {id: 'BI', name: 'Burundi'},
  {id: 'BJ', name: 'Benin'}, {id: 'BM', name: 'Bermuda'},
  {id: 'BN', name: 'Brunei Darussalam'}, {id: 'BO', name: 'Bolivia'},
  {id: 'BR', name: 'Brazil'}, {id: 'BS', name: 'Bahamas'}, {id: 'BT', name: 'Bhutan'},
  {id: 'BV', name: 'Bouvet Island'}, {id: 'BW', name: 'Botswana'},
  {id: 'BY', name: 'Belarus'}, {id: 'BZ', name: 'Belize'}, {id: 'CA', name: 'Canada'},
  {id: 'CC', name: 'Cocos (Keeling) Islands'}, {id: 'CF', name: 'Central African Republic'},
  {id: 'CG', name: 'Congo'}, {id: 'CH', name: 'Switzerland'}, {id: 'CI', name: 'Cote de Ivoire'},
  {id: 'CK', name: 'Cook Islands'}, {id: 'CL', name: 'Chile'}, {id: 'CM', name: 'Cameroon'},
  {id: 'CN', name: 'China'}, {id: 'CO', name: 'Colombia'}, {id: 'CR', name: 'Costa Rica'},
  {id: 'CU', name: 'Cuba'}, {id: 'CV', name: 'Cape Verde'}, {id: 'CX', name: 'Christmas Island'},
  {id: 'CY', name: 'Cyprus'}, {id: 'CZ', name: 'Czech Republic'}, {id: 'DE', name: 'Germany'},
  {id: 'DJ', name: 'Djibouti'}, {id: 'DK', name: 'Denmark'}, {id: 'DM', name: 'Dominica'},
  {id: 'DO', name: 'Dominican Republic'}, {id: 'DZ', name: 'Algeria'}, {id: 'EC', name: 'Ecuador'},
  {id: 'EE', name: 'Estonia'}, {id: 'EG', name: 'Egypt'}, {id: 'EH', name: 'Western Sahara'},
  {id: 'ER', name: 'Eritrea'}, {id: 'ES', name: 'Spain'}, {id: 'ET', name: 'Ethiopia'},
  {id: 'EU', name: 'Europe (SSGFI only)'}, {id: 'FI', name: 'Finnland'},
  {id: 'FJ', name: 'Fiji'}, {id: 'FK', name: 'Falkland Islands (Malvinas)'},
  {id: 'FM', name: 'Micronesia, Federated States Of'}, {id: 'FO', name: 'Faroe Islands'},
  {id: 'FR', name: 'France'}, {id: 'FX', name: 'France, Metropolitan'}, {id: 'GA', name: 'Gabon'},
  {id: 'GB', name: 'United Kingdom (UK)'}, {id: 'GD', name: 'Grenada'}, {id: 'GE', name: 'Georgia'},
  {id: 'GF', name: 'French Guiana'}, {id: 'GH', name: 'Ghana'}, {id: 'GI', name: 'Gibraltar'},
  {id: 'GL', name: 'Greenland'}, {id: 'GM', name: 'Gambia'}, {id: 'GN', name: 'Guinea'},
  {id: 'GP', name: 'Guadeloupe'}, {id: 'GQ', name: 'Equatorial Guinea'}, {id: 'GR', name: 'Greece'},
  {id: 'GS', name: 'South Georgia And The South Sandwich Islands'}, {id: 'GT', name: 'Guatemala'},
  {id: 'GU', name: 'Guam'}, {id: 'GW', name: 'Guinea-Bissau'}, {id: 'GY', name: 'Guyana'},
  {id: 'HK', name: 'Hong Kong'}, {id: 'HM', name: 'Heard And Mc Donald Islands'},
  {id: 'HN', name: 'Honduras'}, {id: 'HR', name: 'Croatia (local name: Hrvatska)'},
  {id: 'HT', name: 'Haiti'}, {id: 'HU', name: 'Hungary'}, {id: 'ID', name: 'Indonesia'},
  {id: 'IE', name: 'Ireland'}, {id: 'II', name: 'International (SSGFI only)'}, {id: 'IL', name: 'Israel'},
  {id: 'IN', name: 'India'}, {id: 'IO', name: 'British Indian Ocean Territory'},
  {id: 'IQ', name: 'Iray'}, {id: 'IR', name: 'Iran (Islamic Republic Of)'}, {id: 'IS', name: 'Iceland'},
  {id: 'IT', name: 'Italy'}, {id: 'JM', name: 'Jamaica'}, {id: 'JO', name: 'Jordan'},
  {id: 'JP', name: 'Japan'}, {id: 'KE', name: 'Kenya'}, {id: 'KG', name: 'Kyrgyzstan'},
  {id: 'KH', name: 'Cambodia'}, {id: 'KI', name: 'Kiribati'}, {id: 'KM', name: 'Comoros'},
  {id: 'KN', name: 'Saint Kitts And Nevis'}, {id: 'KP', name: 'Korea, Democratic Peoples, Republic Of'},
  {id: 'KR', name: 'Korea, Republic Of'}, {id: 'KW', name: 'Kuwait'}, {id: 'KY', name: 'Cayman Islands'},
  {id: 'KZ', name: 'Kazakhstan'}, {id: 'LA', name: 'Lao People s Democratic Republic'},
  {id: 'LB', name: 'Lebanon'}, {id: 'LC', name: 'Saint Lucia'}, {id: 'LI', name: 'Liechtenstein'},
  {id: 'LK', name: 'Sri Lanka'}, {id: 'LR', name: 'Liberia'}, {id: 'LS', name: 'Lesotho'},
  {id: 'LT', name: 'Lithuania'}, {id: 'LU', name: 'Luxembourg'}, {id: 'LV', name: 'Latvia'},
  {id: 'LY', name: 'Libya'}, {id: 'MA', name: 'Morocco'}, {id: 'MC', name: 'Monaco'},
  {id: 'MD', name: 'Moldova, Republic Of'}, {id: 'ME', name: 'Montenegro'},
  {id: 'MG', name: 'Madagascar'}, {id: 'MH', name: 'Marshall Islands'},
  {id: 'MK', name: 'Macedonia, The Former Yugoslav Republic Of'}, {id: 'ML', name: 'Mali'},
  {id: 'MM', name: 'Maynmar'}, {id: 'MN', name: 'Mongolia'}, {id: 'MO', name: 'Macau'},
  {id: 'MP', name: 'Northern Mariana Islands'}, {id: 'MQ', name: 'Martinique'},
  {id: 'MR', name: 'Mauritania'}, {id: 'MS', name: 'Montserrat'}, {id: 'MT', name: 'Malta'},
  {id: 'MU', name: 'Mauritius'}, {id: 'MV', name: 'Maldives'}, {id: 'MW', name: 'Malawi'},
  {id: 'MX', name: 'Mexico'}, {id: 'MY', name: 'Malaysia'}, {id: 'MZ', name: 'Mozambique'},
  {id: 'NA', name: 'Namibia'}, {id: 'NC', name: 'New Caledonia'}, {id: 'NE', name: 'Niger'},
  {id: 'NF', name: 'Norfolk Island'}, {id: 'NG', name: 'Nigeria'}, {id: 'NI', name: 'Nicaragua'},
  {id: 'NL', name: 'Netherlands'}, {id: 'NO', name: 'Norway'}, {id: 'NP', name: 'Nepal'},
  {id: 'NR', name: 'Nauru'}, {id: 'NU', name: 'Niue'}, {id: 'NZ', name: 'New Zealand'},
  {id: 'OM', name: 'Oman'}, {id: 'PA', name: 'Panama'}, {id: 'PE', name: 'Peru'},
  {id: 'PF', name: 'French Polynesia'}, {id: 'PG', name: 'Papua New Guinea'},
  {id: 'PH', name: 'Philippines'}, {id: 'PK', name: 'Pakistan'}, {id: 'PL', name: 'Poland'},
  {id: 'PM', name: 'St. Pierre And Miquelon'}, {id: 'PN', name: 'Pitcairn'}, {id: 'PR', name: 'Puerto Rico'},
  {id: 'PT', name: 'Portugal'}, {id: 'PW', name: 'Palau'}, {id: 'PY', name: 'Paraguay'},
  {id: 'QA', name: 'Qatar'}, {id: 'RE', name: 'Reunion'}, {id: 'RO', name: 'Romania'},
  {id: 'RS', name: 'Serbia'}, {id: 'RU', name: 'Russian Federation'}, {id: 'RW', name: 'Rwanda'},
  {id: 'SA', name: 'Saudi Arabia'}, {id: 'SB', name: 'Solomon Islands'}, {id: 'SC', name: 'Seychelles'},
  {id: 'SD', name: 'Sudan'}, {id: 'SE', name: 'Sweden'}, {id: 'SG', name: 'Singapore'},
  {id: 'SH', name: 'St. Helena'}, {id: 'SI', name: 'Slovenia'}, {id: 'SJ', name: 'Svalberg And Jan Mayen Islands'},
  {id: 'SK', name: 'Slovakia (Slovak Republic)'}, {id: 'SL', name: 'Sierra Leone'}, {id: 'SM', name: 'San Marino'},
  {id: 'SN', name: 'Senegal'}, {id: 'SO', name: 'Somalia'}, {id: 'SR', name: 'Suriname'},
  {id: 'ST', name: 'Sao Tome And Principe'}, {id: 'SV', name: 'El Salvador'}, {id: 'SY', name: 'Syrian Arab Republic'},
  {id: 'SZ', name: 'Swaziland'}, {id: 'TC', name: 'Turs And Caicos Islands'}, {id: 'TD', name: 'Chad'},
  {id: 'TF', name: 'French Southern Territories'}, {id: 'TG', name: 'Togo'}, {id: 'TH', name: 'Thailand'},
  {id: 'TJ', name: 'Tajikistan'}, {id: 'TK', name: 'Tokelau'}, {id: 'TM', name: 'Turkmenistan'},
  {id: 'TN', name: 'Tunisia'}, {id: 'TO', name: 'Tonga'}, {id: 'TP', name: 'Easrt Timor'},
  {id: 'TR', name: 'Turkey'}, {id: 'TT', name: 'Trinidad And Tobago'}, {id: 'TV', name: 'Tuvalu'},
  {id: 'TW', name: 'Taiwan, Province Of China'}, {id: 'TZ', name: 'Tanzania, United Republic Of'},
  {id: 'UA', name: 'Ukraine'}, {id: 'UG', name: 'Uganda'}, {id: 'UM', name: 'United States Minor Outlying Islands'},
  {id: 'US', name: 'United States'}, {id: 'UY', name: 'Uruguay'}, {id: 'UZ', name: 'Uzbekistan'},
  {id: 'VA', name: 'Vatican City State (Holy See)'}, {id: 'VC', name: 'Saint Vincent And The Grenadines'},
  {id: 'VE', name: 'Venezuela'}, {id: 'VG', name: 'Virgin Islands (British)'},
  {id: 'VI', name: 'Virgin Islands (U.S.)'}, {id: 'VN', name: 'Viet Nam'}, {id: 'VU', name: 'Vanuatu'},
  {id: 'WF', name: 'Wallis And Futuna Islands'}, {id: 'WS', name: 'Samoa'}, {id: 'YE', name: 'Yemen'},
  {id: 'YT', name: 'Mayotte'}, {id: 'YU', name: 'Yugoslavia'}, {id: 'ZA', name: 'South Africa'},
  {id: 'ZM', name: 'Zambia'}, {id: 'ZR', name: 'Zaire'}, {id: 'ZW', name: 'Zimbabwe'}];

let formatPatterns = {
  'en': {
    'datePattern': 'MM/dd/yyyy',
    'dateTimePattern': 'dd/MM/yyyy HH:mm:ss',
    'integerPattern': '#,##0',
    'numberPattern': '#,##0.00',
    'numberDecimalSeparator': '.',
    'numberGroupingSeparator': ',',
    'numberGroupingSeparatorUse': true
  },
  de: {
    datePattern: "dd.MM.yyyy",
    dateTimePattern: 'dd.MM.yyyy HH:mm:ss',
    integerPattern: "#,##0",
    numberPattern: "#,##0.00",
    numberDecimalSeparator: ",",
    numberGroupingSeparator: ".",
    numberGroupingSeparatorUse: true
  }
};

let onUnauthorized = () => {
  console.log('redirecting to login page');
};

const supplier = 'hard001';
const actionUrl = `http://${process.env.HOST || '0.0.0.0'}:${process.env.PORT || 3001}`;
const dateTimePatter = 'MM/dd/yyyy h:mm:ss a';

const SupplierEditorPage = function (params, readOnly) {
  const currentLocale = params['locale'] ? params['locale'] : locale;
  return (
    <I18nBundle locale={currentLocale} formatInfos={formatPatterns}>
      <SupplierEditor
        onUnauthorized={onUnauthorized}
        readOnly={readOnly}
        actionUrl={actionUrl}
        supplierId={supplier}
        countries={countries}
        dateTimePattern={dateTimePatter}
        onChange={params.onChange}
      />
    </I18nBundle>
  );
};

const SupplierAddressEditorPage = function (params, readOnly) {
  const currentLocale = params['locale'] ? params['locale'] : locale;
  return (
    <I18nBundle locale={currentLocale} formatInfos={formatPatterns}>
      <SupplierAddressEditor
        onUnauthorized={onUnauthorized}
        readOnly={readOnly}
        actionUrl={actionUrl}
        supplierId={supplier}
        countries={countries}
        dateTimePattern={dateTimePatter}
        onChange={params.onChange}
      />
    </I18nBundle>
  );
};

const SupplierContactEditorPage = function (params, readOnly) {
  const currentLocale = params['locale'] ? params['locale'] : locale;
  return (
    <I18nBundle locale={currentLocale} formatInfos={formatPatterns}>
      <SupplierContactEditor
        onUnauthorized={onUnauthorized}
        readOnly={readOnly}
        actionUrl={actionUrl}
        supplierId={supplier}
        dateTimePattern={dateTimePatter}
        onChange={params.onChange}
      />
    </I18nBundle>
  );
};

class LanguageDropdown extends Component {

  static propTypes = {
    currentLanguage: PropTypes.string.isRequired,
    languages: PropTypes.array.isRequired,
    onLanguageChange: PropTypes.func,
  };

  render() {
    const { currentLanguage, languages } = this.props;

    const lang = _.find(languages, lang => lang.id === currentLanguage);
    const currentLanguageName = lang ? lang.languageName : currentLanguage;

    return (
      <Dropdown id="language-dropdown" onSelect={ this.onSelect }>
        <Dropdown.Toggle>
          <i className={ classNames(`flag-${currentLanguage}`) }></i>&nbsp;&nbsp;{ currentLanguageName }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.filter(lang => lang.id !== currentLanguage).map(language => (
              <MenuItem key={ language.id } eventKey={ language.id }>
                <i className={ classNames(`flag-${ language.id }`) }></i>&nbsp;&nbsp;{ language.languageName }
              </MenuItem>
            )
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  onSelect = (e, eventKey) => {
    const { onLanguageChange } = this.props;
    onLanguageChange && onLanguageChange(eventKey)
  }
}

function setLanguageCookie(lang) {
  document.cookie = `LANGUAGE_COOKIE_KEY=${lang}`;
}

function getLanguageCookie() {
  const name = 'LANGUAGE_COOKIE_KEY=';
  const ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return '';
}

const Layout = function(InnerPage, actionUrl) {
  class Component extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.isDirty = false;
    }
    state = {readOnly: false};

    static contextTypes = {
      router: React.PropTypes.object
    };

    onChangeReadonlyMode = (event) => {
      this.setState({readOnly: event.target.checked})
    };

    render() {
      const languageCookieValue = getLanguageCookie();
      const currentLocale = languageCookieValue ? languageCookieValue : locale;
      const params = {locale: currentLocale, onChange: (state) => {
        this.isDirty = state.isDirty;
      }};

      let doTransition = (link, event) => {
        if (this.isDirty) {
          event.preventDefault();

          if (confirm("You did not save your entries. Do you want to proceed without saving?")) {
            this.isDirty = false;

            this.context.router.push(link);
          }
        }
      };

      return (
        <div>
          <header className="navbar navbar-default navbar-main-menu">
            <div className="navbar-header pull-right">
              <ul id="micro-menu" className="nav navbar-nav navbar-no-collapse navbar-right">
                <li>
                  <LanguageDropdown currentLanguage={currentLocale}
                                    languages={languages}
                                    onLanguageChange={lang => { setLanguageCookie(lang); location.reload(true); }}
                  />
                </li>
              </ul>
            </div>
          </header>

          <div className="container">
            <div className="form-group">
              <label>
                <input type="checkbox" onClick={this.onChangeReadonlyMode} checked={this.state.readOnly}/>
                &nbsp;[ReadOnly mode]
              </label>
            </div>

            <br/>
            <div className="row">
              <div className="col-md-12">
                <div>
                  <ul className="nav nav-tabs">
                    <li className={classNames({active: actionUrl === '/'})}>
                      <Link to="/" onClick={doTransition.bind(this, "/")}>Company</Link>
                    </li>
                    <li className={classNames({active: actionUrl === '/address'})}>
                      <Link to="/address" onClick={doTransition.bind(this, "/address")}>Address</Link>
                    </li>
                    <li className={classNames({active: actionUrl === '/contact'})}>
                      <Link to="/contact" onClick={doTransition.bind(this, "/contact")}>Contact</Link>
                    </li>
                  </ul>

                  {InnerPage(params, this.state.readOnly)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return (
    <Route path={actionUrl} component={Component}/>
  );
};

const update = function (state, action) {
//  console.log(`state: ${JSON.stringify(state)}`);
  switch(action.type) {
    case UPDATE_LOCATION:
//    if (state && state.routing) {
//      console.log(`location: ${state.routing.location.pathname}`);
//    }
  }
  return state || {};
};

const reducer = combineReducers(_.extend({}, {update}, {
  routing: routeReducer
}));


// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
//const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const createStoreWithMiddleware = compose(
  applyMiddleware(reduxRouterMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

//render main entry point page
let element = document.getElementById('main');
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        {Layout(SupplierEditorPage, '/')}
        {Layout(SupplierAddressEditorPage, '/address')}
        {Layout(SupplierContactEditorPage, '/contact')}
    </Router>
  </Provider>,
  element
);
