import React from 'react';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';
import ReferenceSearchDialogProps from '../ReferenceSearchDialogProps';
import ReadonlyInput from './ReadonlyInput.react';
import Button from 'react-bootstrap/lib/Button';
import ReferenceSearchDialog from '../ReferenceSearchDialog';
import './styles.less';

import lodash from 'lodash';

export default
class ReferenceSearchInput extends React.Component {
  static propTypes = {
    ...ReferenceInputBaseProps,
    ...ReferenceSearchDialogProps,
    referenceSearchAction: React.PropTypes.func.isRequired,
    labelProperty: React.PropTypes.string.isRequired,
    valueProperty: React.PropTypes.string.isRequired,
    modalSpecificProps: React.PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    readOnly: false,
    multiple: false,
    modalSpecificProps: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      value: lodash.isUndefined(props.value) ? null : props.value,
      openDialog: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }
    } else {
      this.setState({ value: this.props.multiple ? [] : null });
    }
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleReferenceSelect(selectedItems) {
    if (this.props.multiple) {
      if (lodash.isNull(this.state.value)) {
        this.handleValueChange(selectedItems)
      } else {
        let valueProperty = this.props.valueProperty;
        let result = lodash.clone(this.state.value);
        // only unique by valueProperty values
        lodash.forEach(selectedItems, (selectedItem) => {
          if (lodash.findIndex(result, (it) => it[valueProperty] === selectedItem[valueProperty]) === -1) {
            result.push(selectedItem);
          }
        });
        this.handleValueChange(result);
      }
    } else {
      this.handleValueChange(selectedItems[0])
    }
  }

  handleValueChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value ? value : (this.props.multiple ? [] : null));
    }
    this.setState({ value });
  };

  openReferenceSearch() {
    this.setState({ openDialog: true });
  }

  resetValue() {
    if (this.props.multiple) {
      this.setState({ value: [] });
    } else {
      this.setState({ value: null });
    }
  }

  render() {
    let childProps = lodash.pick(this.props,
      ['id', 'name', 'onFocus', 'onBlur', 'multiple', 'labelProperty', 'valueProperty', 'readOnly']
    );

    childProps.value = this.state.value;
    childProps.onChange = this.handleValueChange;

    let children;
    if (this.props.children) {
      childProps.readOnly = this.props.readOnly;
      childProps.disabled = this.props.disabled;

      let element = React.Children.only(this.props.children);
      children = React.cloneElement(element, childProps);
    } else {
      children = (<ReadonlyInput {... childProps}/>);
    }

    return (
      <div className="input-group jc-reference-search-input">
        <ReferenceSearchDialog
          openDialog={this.state.openDialog}
          referenceSearchAction={this.props.referenceSearchAction}
          onCloseDialog={this.handleCloseDialog}
          onSelect={(selectedItems) => this.handleReferenceSelect(selectedItems)}
          title={this.props.title}
          multiple={this.props.multiple}
          searchFields={this.props.searchFields}
          resultFields={this.props.resultFields}
          objectIdentifier={this.props.valueProperty}
          modalSpecificProps={this.props.modalSpecificProps}
        />
      {children}
        <span className="input-group-btn">
          <Button onClick={() => this.openReferenceSearch()} disabled={this.props.disabled || this.props.readOnly}>
            <span className="glyphicon glyphicon-search" />
          </Button>
        {!this.props.children ? (
          <Button onClick={() => this.resetValue()} disabled={this.props.disabled || this.props.readOnly}>
            <span className="glyphicon glyphicon-remove" />
          </Button>
        ) : null}
        </span>
      </div>
    );
  }
}
