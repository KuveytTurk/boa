import React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { ComponentBase } from '@kuveytturk/boa-base';

function getStyles(props, context, state) {
  const { selected, time } = props;
  const { palette, boaPalette } = props.context.theme;
  const { hover } = state;
  let background = 'none';

  if (hover && selected) background = boaPalette.pri300;
  else if (hover) background = boaPalette.base150;
  else if (selected) background = boaPalette.pri250;

  return {
    root: {
      boxSizing: 'border-box',
      color: time === new Date().getFullYear() && palette.primary1Color,
      display: 'block',
      fontSize: 14,
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
      lineHeight: 'inherit',
      width: '100%',
      height: '48px',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
      background,
    },
    label: {
      alignSelf: 'center',
      color: selected ? boaPalette.pri500 : boaPalette.base450,
      background: selected ? boaPalette.pri250 : 'none',
      fontSize: selected ? 14 : 14,
      fontWeight: 400,
      position: 'relative',
      top: -1,
    },
  };
}

class TimeButton extends ComponentBase {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onTouchTap: PropTypes.func,
    selected: PropTypes.bool,
    time: PropTypes.number,
  };

  static defaultProps = {
    selected: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    hover: false,
  };

  constructor(props, context) {
    super(props, context);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  handleTouchTap(event) {
    /* istanbul ignore else */
    if (this.props.onTouchTap) {
      this.props.onTouchTap(event, this.props.time);
    }
  }

  render() {
    const {
      children,
      className, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      time, // eslint-disable-line no-unused-vars
    } = this.props;

    const styles = getStyles(this.props, this.context, this.state);

    return (
      <ButtonBase
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleTouchTap}
        style={styles.root}
      >
        <span style={styles.label}>{children}</span>
      </ButtonBase>
    );
  }
}

export default TimeButton;
