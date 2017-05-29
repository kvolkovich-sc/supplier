'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var request = _interopDefault(require('superagent-bluebird-promise'));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;
var _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CountriesInput = (_temp = _class = function (_Component) {
  _inherits(CountriesInput, _Component);

  function CountriesInput(props) {
    _classCallCheck(this, CountriesInput);

    var _this = _possibleConstructorReturn(this, (CountriesInput.__proto__ || Object.getPrototypeOf(CountriesInput)).call(this, props));

    _this.loadCountriesPromise = null;

    _this.handleChange = function (event) {
      var newValue = event.target.value;
      _this.setState({ value: newValue });
      _this.props.onChange(newValue);
    };

    _this.handleBlur = function (event) {
      if (_this.props.onBlur) {
        _this.props.onBlur(event.target.value);
      }
    };

    _this.transformCountries = function (countries) {
      var countriesList = [];
      Object.keys(countries).forEach(function (key) {
        var country_name = countries[key].name;
        if (country_name && country_name.length > 0) {
          countriesList.push({ id: countries[key].id, name: countries[key].name });
        }
      });

      return countriesList.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    };

    _this.state = {
      value: _this.props.value,
      isLoaded: false,
      countries: []
    };
    return _this;
  }

  _createClass(CountriesInput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.isLoaded) {
        return;
      }

      this.loadCountriesPromise = request.get(this.props.actionUrl + '/isodata/countries').set('Accept', 'application/json').promise();

      this.loadCountriesPromise.then(function (response) {
        _this2.setState({
          countries: _this2.transformCountries(response.body),
          isLoaded: true
        });
      }).catch(function (errors) {
        return null;
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (!this.state.isLoaded) {
        if (this.loadCountriesPromise) {
          this.loadCountriesPromise.cancel();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React__default.createElement(
        'select',
        { className: 'form-control',
          value: this.state.value,
          onChange: this.handleChange.bind(this),
          onBlur: this.handleBlur.bind(this)
        },
        this.state.countries.map(function (country, index) {
          return React__default.createElement(
            'option',
            { key: index, value: country.id },
            country.name
          );
        })
      );
    }
  }]);

  return CountriesInput;
}(React.Component), _class.propTypes = {
  actionUrl: React.PropTypes.string.isRequired,
  onChange: React__default.PropTypes.func.isRequired,
  value: React__default.PropTypes.string,
  onBlur: React__default.PropTypes.func
}, _temp);

module.exports = CountriesInput;
