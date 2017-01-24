import React, { PropTypes, Component } from 'react';
import request from 'superagent-bluebird-promise';
import i18n from '../../i18n/I18nDecorator.react.js';
import Alert from '../Alert';
import SupplierEditorForm from './SupplierEditorForm.react.js';

/**
 * Provide general company information.
 */
@i18n({
  componentName: 'SupplierEditor',
  messages: require('./i18n').default,
})
class SupplierEditor extends Component {

  static propTypes = {
    actionUrl: PropTypes.string.isRequired,
    supplierId: PropTypes.string,
    supplierName: PropTypes.string,
    companyRole: PropTypes.string,
    username: React.PropTypes.string,
    dateTimePattern: PropTypes.string.isRequired,
    /**
     * Subscribe to persistent data changes
     * @arg0 - dirty state: true - if inner data changed, false if inner changes was reset
     */
    onChange: React.PropTypes.func,
    onUpdate: React.PropTypes.func,
    onUnauthorized: React.PropTypes.func,
    onLogout: React.PropTypes.func
  }

  state = {
    isLoaded: !this.props.supplierId,
    hasErrors: false,
  }

  componentDidMount() {
    if (this.state.isLoaded) {
      return;
    }

    console.log(`===== About to call ${
      this.props.actionUrl
    }/api/suppliers/${
      encodeURIComponent(this.props.supplierId)
    }`);
    this.ajaxPromise = request.
      get(`${this.props.actionUrl}/api/suppliers/${encodeURIComponent(this.props.supplierId)}`).
      set('Accept', 'application/json').
      promise();

    this.ajaxPromise.
      then(response => {
        console.log(`===== Success responding to ${
          this.props.actionUrl
        }/api/suppliers/${
          encodeURIComponent(this.props.supplierId)
        }`, JSON.stringify(response.body)
        );
        this.setState({
          isLoaded: true,
          supplier: response.body
        });
      }).
      catch(errors => {
        console.log(`===== Error responding to ${
          this.props.actionUrl
        }/api/suppliers/${
          encodeURIComponent(this.props.supplierId)
        }`, JSON.stringify(errors)
        );
        if (errors.status === 401) {
          this.props.onUnauthorized();
          return;
        }

        this.setState({
          isLoaded: true,
          hasErrors: true,
        });
      });

    return;
  }

  componentWillReceiveProps(/* nextProps*/) {
    this.setState({
      globalInfoMessage: '',
      globalErrorMessage: ''
    });
  }

  componentWillUnmount() {
    console.log('===== CANCELING ALL REQUESTS');
    this.ajaxPromise.cancel();
  }

  ajaxPromise = null;

  handleChange = () => {
    if (this.props.onChange) {
      this.props.onChange({ isDirty: true });
    }
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
      changedBy: this.props.username
    };

    delete newSupplier.changedOn;  // eslint-disable-line no-param-reassign
    delete newSupplier.createdOn;  // eslint-disable-line no-param-reassign
    const { i18n } = this.context;
    let requestMethod;

    console.log('===== ABOUT TO REQUEST A PROMISE');
    if (this.props.supplierId && this.props.supplierId.toLowerCase() === newSupplier.supplierId.toLowerCase()) {
      // Updating info of a supplier the user is linked to.
      requestMethod = request.put(`${this.props.actionUrl}/api/suppliers/${encodeURIComponent(this.props.supplierId)}`);
    } else {
      // Linking the user to a new/existing supplier.
      // or
      // relinking the user to a new/another supplier.
      newSupplier.createdBy = this.props.username;// eslint-disable-line no-param-reassign
      requestMethod = request.post(`${this.props.actionUrl}/api/suppliers`);
    }

    this.ajaxPromise = requestMethod.
      set('Accept', 'application/json').
      send(newSupplier).
      promise();

    return this.ajaxPromise.
      then(response => {
        console.log('===== A PROMISE HAS BEEN RECEIVED');
        this.setState({
          supplier: response.body,
          globalInfoMessage: i18n.getMessage('SupplierEditor.Messages.saved'),
          globalErrorMessage: ''
        });

        console.log('===== MIDDLE OF PROMISE HANDLING');
        if (
          this.props.onUpdate &&
          (
            this.props.supplierId !== response.body.supplierId ||
            this.props.supplierName !== response.body.supplierName ||
            this.props.companyRole !== response.body.role
          )
        ) {
          // Informing wrapper app (BNP/SIM) about supplier change.
          this.props.onUpdate({
            supplierId: response.body.supplierId,
            supplierName: response.body.supplierName,
            companyRole: response.body.role
          });
        } else if (this.props.onChange) {
          this.props.onChange({ isDirty: false });
        }
        console.log('===== END OF PROMISE HANDLING');
      }).
      catch(errors => {
        console.log('===== PROMISE ERROR CATCH', errors);
        switch (errors.status) {
          case 401:
            this.props.onUnauthorized();
            break;
          case 403:
            this.setState({
              globalInfoMessage: '',
              globalErrorMessage: i18n.getMessage('SupplierEditor.Messages.failedModifyingNotAuthoredSupplier'),
            });
            break;
          case 409:
            this.setState({
              globalInfoMessage: '',
              globalErrorMessage: i18n.getMessage('SupplierEditor.Messages.failedCreatingExistingSupplier'),
            });
            break;
          default:
            this.setState({
              globalInfoMessage: '',
              globalErrorMessage: i18n.getMessage('SupplierEditor.Messages.failed'),
            });
        }
      });
  }

  render() {
    const { i18n } = this.context;
    const { isLoaded, hasErrors, supplier, globalInfoMessage = '', globalErrorMessage = '' } = this.state;

    if (!isLoaded) {
      return (
        <div>{ i18n.getMessage('SupplierEditor.Messages.loading') }</div>
      );
    }

    if (hasErrors) {
      return (
        <div>{ i18n.getMessage('SupplierEditor.Messages.unableToRender') }</div>
      );
    }

    return (
      <div>
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

        <SupplierEditorForm
          {...this.props}
          supplier={ supplier }
          onSupplierChange={ this.handleUpdate }
          onChange={ this.handleChange }
          onCancel={ this.props.onLogout }
        />
      </div>
    );
  }
}

export default SupplierEditor;
