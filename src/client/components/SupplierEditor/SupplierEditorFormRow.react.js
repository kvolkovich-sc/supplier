import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Provides skeleton for displaying label and input field of ane types.
 */
export default class AttributeValueEditorRow extends Component {
  static propTypes = {
    labelText: PropTypes.string.isRequired,
    required: PropTypes.bool,
    rowErrors: PropTypes.array,
  };

  static defaultProps = {
    required: false,
    rowErrors: [],
  };

  render() {
    const { required, rowErrors } = this.props;
    let labelText = this.props.labelText;

    const classes = classNames({
      'form-group': true,
      'has-error': !!rowErrors.length
    });

    if (required) {
      let lastWord = labelText.split(' ').pop();

      labelText = (
        <span>
          {labelText.replace(lastWord, '')}<span><nobr>{lastWord} *</nobr></span>
        </span>
      );
    }

    return (
      <div className={classes}>
        <label className="col-sm-2 control-label">
          {labelText}
        </label>

        <div className="col-sm-4">
          { this.props.children }

          {rowErrors.map((error, index) =>
            <div key={index}>
              <span className="label label-danger">{ error.message }</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}
