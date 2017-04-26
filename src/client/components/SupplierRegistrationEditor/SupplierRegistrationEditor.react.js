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
    username: React.PropTypes.string,
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
      supplierExist: false
    }
  }

  componentDidMount() {
    this.setState({
      isLoaded: true
    })
  }

  componentWillReceiveProps(/* nextProps*/) {
    this.setState({
      globalInfoMessage: '',
      globalErrorMessage: ''
    });
  }

  componentWillUnmount() {
    console.log('===== CANCELING ALL REQUESTS');
    if (this.ajaxPromise && !this.state.isLoaded) {
      this.ajaxPromise.cancel();
    }
  }

  ajaxPromise = null;

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
      return this.setState({
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

    this.ajaxPromise = request.post(`${this.props.actionUrl}/api/suppliers`).
      set('Accept', 'application/json').
      send(newSupplier).
      promise();

    return this.ajaxPromise.
      then(response => {
        console.log('===== A PROMISE HAS BEEN RECEIVED. ABOUT TO SET-STATE');
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

  render() {
    const { i18n } = this.context;
    const { isLoaded, hasErrors, supplier, globalInfoMessage = '', globalErrorMessage = '' } = this.state;

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

    let toRender;
    if (this.state.supplierExist) {
      toRender = <SupplierExistsView onBack={ this.handleBackToForm }/>
    } else {
      toRender = <SupplierRegistrationEditorForm
                    {...this.props}
                    supplier={ supplier }
                    onSupplierChange={ this.handleUpdate }
                    onChange={ this.handleChange }
                    onCancel={ this.props.onLogout }
                  />
    }

    return (
      <div
        className="container"
        style={{
          zIndex: '2'
        }}
      >
        <div
          className="box"
          style={{
            width: '87%',
            marginTop: '15px',
            padding: '3%',
            textAlign: 'left',
            zIndex: '3',
            backgroundColor: 'white'
          }}
        >
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

          {toRender}
        </div>
      </div>
    );
  }
}

export default SupplierRegistrationEditor;
