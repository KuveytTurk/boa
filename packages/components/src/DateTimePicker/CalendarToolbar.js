/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React from 'react';
import PropTypes from 'prop-types';
import MuiIconButton from '@material-ui/core/IconButton/IconButton';
import MuiChevronLeft from '@material-ui/icons/ChevronLeft';
import MuiChevronRight from '@material-ui/icons/ChevronRight';
import { ComponentBase } from '@kuveytturk/boa-base';
import { dateTimeFormat } from './dateUtils';

class CalendarToolbar extends ComponentBase {
  static propTypes = {
    dateTimeFormat: PropTypes.func,
    displayDate: PropTypes.object.isRequired,
    format: PropTypes.string,
    handleClickToolBar: PropTypes.func,
    nextMonth: PropTypes.bool,
    noDialog: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool,
  };

  static defaultProps = {
    dateTimeFormat,
    nextMonth: true,
    prevMonth: true,
    noDialog: false,
  };

  state = {
    transitionDirection: 'up',
  };

  constructor(props, context) {
    super(props, context);
    this.handleClickToolBar = this.handleClickToolBar.bind(this);
    this.handleTouchTapPrevMonth = this.handleTouchTapPrevMonth.bind(this);
    this.handleTouchTapNextMonth = this.handleTouchTapNextMonth.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction = nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
      this.setState({
        transitionDirection: direction,
      });
    }
  }

  handleTouchTapPrevMonth() {
    /* istanbul ignore else */
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1);
    }
  }

  handleTouchTapNextMonth() {
    /* istanbul ignore else */
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1);
    }
  }

  handleClickToolBar() {
    /* istanbul ignore else */
    if (this.props.handleClickToolBar) {
      this.props.handleClickToolBar();
    }
  }

  render() {
    const styles = {
      root: {
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'inherit',
        height: 38,
      },
      titleDiv: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        height: 38,
        width: '100%',
        marginTop: 8,
        cursor: 'pointer',
      },

      titleDialog: {
        fontSize: 14,
        fontWeight: '700',
        textAlign: 'center',
        height: 38,
        width: '100%',
        marginTop: 8,
      },
      titleText: {
        height: 'inherit',
        textAlign: 'center',
        cursor: 'pointer',
        color: this.props.context.theme.boaPalette.base450,
      },
      iconButton: {
        width: 40,
        height: 40,
        padding: 0,
        marginTop: -2,
        marginLeft: this.props.context.localization.isRightToLeft ? 0 : 2,
        marginRight: this.props.context.localization.isRightToLeft ? 2 : 0,
      },
    };
    const DateTimeFormat = this.props.dateTimeFormat;
    const { displayDate } = this.props;

    const dateTimeFormatted = new DateTimeFormat({
      item: 'monthYearName',
      format: this.props.format,
    }).format(displayDate);

    return (
      <div style={styles.root}>
        <MuiIconButton
          disabled={!this.props.prevMonth}
          onClick={this.handleTouchTapPrevMonth}
          style={styles.iconButton}
        >
          <MuiChevronLeft />
        </MuiIconButton>
        <div
          style={this.props.noDialog ? styles.titleDialog : styles.titleDiv}
          key={dateTimeFormatted}
          onClick={this.handleClickToolBar}
        >
          {dateTimeFormatted}
        </div>
        <MuiIconButton
          disabled={!this.props.nextMonth}
          onClick={this.handleTouchTapNextMonth}
          style={styles.iconButton}
        >
          <MuiChevronRight />
        </MuiIconButton>
      </div>
    );
  }
}

export default CalendarToolbar;
