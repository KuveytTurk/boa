import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { withStyles } from '@material-ui/core/styles';
import MuiToolTip from '@material-ui/core/Tooltip';

const styles = theme => ({
  tooltip: {
    fontSize: '10px',
    padding: '12px',
    color: theme.boaPalette.comp450,
    backgroundColor: theme.boaPalette.base350,
    fontFamily: 'Roboto',
    maxWidth: '300px',
    whiteSpace: 'pre-line',
  },
});

@ComponentComposer
@withStyles(styles)
class ToolTip extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    ...MuiToolTip.propTypes,
    tooltip: PropTypes.string,
    tooltipPosition: PropTypes.string,
  };

  static defaultProps = {
    ...MuiToolTip.defaultProps,
  };

  state = {
    title: this.props.title,
  };

  constructor(props, context) {
    super(props, context);
    let placement = this.props.tooltipPosition || this.props.placement;

    if (placement === 'up') {
      placement = 'top';
    } else if (placement === 'down') {
      placement = 'bottom';
    }

    this.state = {
      title: this.props.tooltip || this.props.title,
      placement,
    };
  }

  setValue(value) {
    this.setState({ title: value });
  }

  getValue() {
    return this.state.title;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.title !== this.props.title) {
      this.setState({ title: nextProps.title });
    }
    if (nextProps.tooltip !== this.props.tooltip) {
      this.setState({ title: nextProps.tooltip });
    }
  }

  render() {
    const toolTipIsOpen = this.state.title && this.state.title.length > 0;
    const { classes } = this.props;
    const { componentSize, newLine, visible, ...otherProps } = this.props;

    if (toolTipIsOpen) {
      return (
        <MuiToolTip
          {...otherProps}
          title={this.state.title}
          placement={this.state.placement}
          classes={{
            tooltip: classes.tooltip,
          }}
        >
          <div>{this.props.children}</div>
        </MuiToolTip>
      );
    }

    return <div>{this.props.children}</div>;
  }
}

export default ToolTip;
