import React, { PropTypes, Component } from 'react';
import request from 'superagent-bluebird-promise';
import i18n from '../../i18n/I18nDecorator.react.js';
import Alert from '../Alert';
import SupplierRegistrationEditorForm from './SupplierRegistrationEditorForm.react.js';
import SupplierExistsView from './SupplierExistsView.react';

/**
 * Provide general company information.
 */
@i18n({
  componentName: 'SupplierRegistrationEditor',
  messages: require('./i18n').default,
})
class SupplierRegistrationEditor extends Component {

  static propTypes = {
    actionUrl: PropTypes.string.isRequired,
    username: React.PropTypes.string.isRequired,
    dateTimePattern: PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onUnauthorized: React.PropTypes.func,
    onLogout: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      hasErrors: false,
      supplier: {},
      supplierExist: false,
      countries: []
    }
  }

  createSupplierPromise = null;
  loadCountriesPromise = null;

  componentDidMount() {
    this.loadCountriesPromise = request.get(`${this.props.actionUrl}/api/countries`).
      set('Accept', 'application/json').
      promise();

    this.loadCountriesPromise.then(response => {
      this.setState({
        countries: response.body.sort((a, b) => a.name.localeCompare(b.name)),
        isLoaded: true
      });
    }).
    catch(errors => {
      return null;
    });
  }

  componentWillReceiveProps(/* nextProps*/) {
    this.setState({
      globalInfoMessage: '',
      globalErrorMessage: ''
    });
  }

  componentWillUnmount() {
    if (!this.state.isLoaded) {
      if (this.loadCountriesPromise) {
        this.loadCountriesPromise.cancel();
      }
      if (this.createSupplierPromise) {
        this.createSupplierPromise.cancel();
      }
    }
  }

  handleChange = () => {
    if (this.props.onChange) {
      this.props.onChange({ isDirty: true });
    }
  }

  handleBackToForm = () => {
    this.setState({ supplierExist: false });
  }

  handleUpdate = newSupplier => {
    if (!newSupplier) {
       this.setState({
        globalInfoMessage: '',
        globalErrorMessage: '',
      });
    }

    newSupplier = {  // eslint-disable-line no-param-reassign
      ...newSupplier,
      createdBy: this.props.username,
      changedBy: this.props.username
    };

    const { i18n } = this.context;

    this.createSupplierPromise = request.post(`${this.props.actionUrl}/api/suppliers`).
      set('Accept', 'application/json').
      send(newSupplier).
      promise();

    this.createSupplierPromise.then(response => {
      this.setState({
        supplier: response.body,
        globalInfoMessage: i18n.getMessage('SupplierRegistrationEditor.Messages.saved'),
        globalErrorMessage: ''
      });

      if (this.props.onChange) {
        this.props.onChange({ isDirty: false });
      }
    }).
    catch(errors => {
      this.setState({
        supplier: newSupplier
      })

      switch (errors.status) {
        case 401:
          this.props.onUnauthorized();
          break;
        case 409:
          this.setState({
            supplierExist: true,
            globalInfoMessage: '',
            globalErrorMessage: ''
          });
          break;
        default:
          this.setState({
            globalInfoMessage: '',
            globalErrorMessage: i18n.getMessage('SupplierRegistrationEditor.Messages.failed'),
          });
      }
    });
  }

  toRender = () => {
    if (this.state.supplierExist) {
      return <SupplierExistsView onBack={ this.handleBackToForm }/>
    } else {
      return <SupplierRegistrationEditorForm
               {...this.props}
               supplier={ this.state.supplier }
               countries={this.state.countries}
               onSupplierChange={ this.handleUpdate }
               onChange={ this.handleChange }
               onCancel={ this.props.onLogout }
             />
    }
  }

  render() {
    const { i18n } = this.context;
    const { isLoaded, hasErrors, globalInfoMessage = '', globalErrorMessage = '' } = this.state;

    if (!isLoaded) {
      return (
        <div>{ i18n.getMessage('SupplierRegistrationEditor.Messages.loading') }</div>
      );
    }

    if (hasErrors) {
      return (
        <div>{ i18n.getMessage('SupplierRegistrationEditor.Messages.unableToRender') }</div>
      );
    }

    return (
      <div className="container supplier-registration-container">
        <div className='box' id='supplier-registration'>
          <Alert bsStyle="info"
            message={globalInfoMessage}
            visible={!!globalInfoMessage}
            hideCloseLink={true}
          />

          <Alert bsStyle="danger"
            message={globalErrorMessage}
            visible={!!globalErrorMessage}
            hideCloseLink={true}
          />

          <h2>Company Registration</h2>

          {this.toRender()}
        </div>
      </div>
    );
  }
}

export default SupplierRegistrationEditor;
