import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { ComponentBase } from '@kuveytturk/boa-base';
import TimeButton from './TimeButton';
import { cloneDate, dateTimeFormat, TimeType } from './dateUtils';

class TimeBase extends ComponentBase {
  static propTypes = {
    dateTimeFormat: PropTypes.func,
    format: PropTypes.string,
    maxValue: PropTypes.number.isRequired,
    minValue: PropTypes.number.isRequired,
    onTouchTapTime: PropTypes.func,
    selectedDate: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.object.isRequired,
      PropTypes.instanceOf(Date).isRequired,
    ]),
    timeType: PropTypes.number,
    wordings: PropTypes.object,
  };

  static defaultProps = {
    dateTimeFormat,
    timeType: TimeType.Hour,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.handleTouchTapTime = this.handleTouchTapTime.bind(this);
  }

  componentDidMount() {
    this.scrollToSelectedTime();
  }

  componentDidUpdate() {
    this.scrollToSelectedTime();
  }

  getTimes() {
    const { selectedDate, timeType } = this.props;

    const DateTimeFormat = this.props.dateTimeFormat;
    const times = [];
    const maxTime = this.props.maxValue;
    const minTime = this.props.minValue;
    const dateCheck = cloneDate(selectedDate);

    for (let time = minTime; time <= maxTime; time++) {
      const selectedProps = {};
      let selectedTime = '';
      let timeFormated = '';
      if (timeType === 1) {
        dateCheck.setHours(time);
        selectedTime = selectedDate.getHours();
        timeFormated = new DateTimeFormat({
          time: 'hour',
        }).format(dateCheck);
      } else if (timeType === 2) {
        dateCheck.setMinutes(time);
        selectedTime = selectedDate.getMinutes();
        timeFormated = new DateTimeFormat({
          time: 'minute',
        }).format(dateCheck);
      } else if (timeType === 3) {
        dateCheck.setSeconds(time);
        selectedTime = selectedDate.getSeconds();
        timeFormated = new DateTimeFormat({
          time: 'second',
        }).format(dateCheck);
      } else if (timeType === 4) {
        dateCheck.setMonth(time);
        selectedTime = selectedDate.getMonth();
        timeFormated = new DateTimeFormat({
          month: 'monthListName',
          format: this.props.format,
        }).format(dateCheck);
      } else if (timeType === 5) {
        dateCheck.setFullYear(time);
        selectedTime = selectedDate.getFullYear();
        timeFormated = new DateTimeFormat({
          year: 'numeric',
        }).format(dateCheck);
      }

      const selected = selectedTime === time;
      if (selected) {
        selectedProps.ref = 'selectedTimeButton';
      }

      const timeButton = (
        <TimeButton
          context={this.props.context}
          key={`yb${time}`}
          onTouchTap={this.handleTouchTapTime}
          selected={selected}
          time={time}
          {...selectedProps}
        >
          {timeFormated}
        </TimeButton>
      );

      times.push(timeButton);
    }

    return times;
  }

  scrollToSelectedTime() {
    if (this.refs.selectedTimeButton === undefined) {
      return;
    }

    const container = ReactDOM.findDOMNode(this);
    const timeButtonNode = ReactDOM.findDOMNode(this.refs.selectedTimeButton);

    const containerHeight = container.clientHeight;
    const timeButtonNodeHeight = timeButtonNode.clientHeight || 32;
    const scrollYOffset = timeButtonNode.offsetTop + timeButtonNodeHeight / 2 - containerHeight / 2; // eslint-disable-line max-len
    container.scrollTop = scrollYOffset;
  }

  handleTouchTapTime(event, time) {
    if (this.props.onTouchTapTime) {
      this.props.onTouchTapTime(event, time);
    }
  }

  render() {
    const styles = {
      root: {
        backgroundColor: this.props.context.theme.palette.canvasColor,
        height: 'inherit',
        lineHeight: '35px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        position: 'relative',
        border: '0px',
        borderColor: this.props.context.theme.palette.borderColor,
      },
      child: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
      },
    };
    return (
      <div style={{ float: 'left', ...styles.root }}>
        <div style={styles.child}>{this.getTimes()}</div>
      </div>
    );
  }
}

export default TimeBase;
