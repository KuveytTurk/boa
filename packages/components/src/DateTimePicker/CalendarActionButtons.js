import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase } from '@kuveytturk/boa-base';
import { Button } from '../Button';

class CalendarActionButton extends ComponentBase {
  static propTypes = {
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    okLabel: PropTypes.node,
    onTouchTapCancel: PropTypes.func,
    onTouchTapOk: PropTypes.func,
  };

  renderCancelButton() {
    const { cancelLabel } = this.props;
    return (
      <Button
        context={this.props.context}
        type="text"
        text={cancelLabel}
        colorType="primary"
        onClick={this.props.onTouchTapCancel}
      />
    );
  }

  renderOkButton() {
    const { okLabel } = this.props;
    const disabled = this.refs.calendar && this.refs.calendar.isSelectedDateDisabled();
    return (
      <div>
        {!this.props.autoOk && (
          <Button
            context={this.props.context}
            type="text"
            text={okLabel}
            colorType="primary"
            onClick={this.props.onTouchTapOk}
            disabled={disabled}
          />
        )}
      </div>
    );
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 0,
        maxHeight: 48,
        padding: 0,
        paddingTop: 6,
        paddingBottom: 6,
      },
      flatButtons: {
        fontsize: 14,
        margin: '4px 8px 8px 0px',
        maxHeight: 36,
        minWidth: 64,
        padding: 0,
      },
    };

    const isRtl = this.props.context.localization.isRightToLeft;

    return (
      <div style={styles.root}>
        {isRtl && this.renderOkButton()}
        {isRtl && this.renderCancelButton()}
        {!isRtl && this.renderCancelButton()}
        {!isRtl && this.renderOkButton()}
      </div>
    );
  }
}

export default CalendarActionButton;
