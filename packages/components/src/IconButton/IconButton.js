import * as React from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from '../Icon';
import { ToolTip } from '../ToolTip';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';

const styles = {
  root: {
    textAlign: 'center',
    flex: '0 0 auto',
    width: 48,
    height: 48,
    padding: 0,
    borderRadius: '50%',
  },
  label: {
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  },
};

/**
 * Icon buttons allow users to take actions, and make choices, with an icon tap.
 * This component is created from `@material-ui/core/ButtonBase`, and  `../Icon`.
 * It also renders a `<ToolTip />` when the "tooltipTitle" prop exists.
 */
@ComponentComposer
@withStyles(styles)
class IconButton extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * The color of the component.
     * It supports the theme colors that make sense for this component.
     */
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'disabled']),
    /**
     * If `true`, the ripple is disabled.
     */
    disableRipple: PropTypes.bool,
    /**
     * Icon name from BOA icon library.
     */
    dynamicIcon: PropTypes.string,
    /**
     * If `true`, the base button has a keyboard focus ripple.
     * `disableRipple` must also be `false`.
     */
    focusRipple: PropTypes.bool,
    /**
     * Font icon name from font icon's library.
     */
    fontIcon: PropTypes.string,
    /**
     * Icon props that are passed to the `<Icon />` element.
     */
    iconProperties: PropTypes.object,
    /**
     * @ignore
     */
    onClick: PropTypes.func,
    /**
     * SVG Icon name from material svg icon library.
     */
    svgIcon: PropTypes.string,
    /**
     * If the type is 'icon', tooltip is generated on the icon button.
     */
    tooltip: PropTypes.string,
    /**
     * Position of the tooltip in button.
     */
    tooltipPosition: PropTypes.string,
    /**
     * Button type must be `contained`, `text`, `fab` or `icon`.
     */
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    color: 'default',
    disabled: false,
    disableRipple: false,
    focusRipple: true,
  };

  render() {
    const { classes } = this.props;
    const tooltipTitle = this.props.tooltip;
    const tooltipPosition = this.props.tooltipPosition;
    const iconProperties = { ...this.props.iconProperties };

    /* istanbul ignore else */
    if (iconProperties && this.props.disabled) {
      iconProperties.color = 'disabled';
    } else if (this.props.iconProperties) {
      iconProperties.color = this.props.iconProperties.color;
    }

    const iconButton = (
      <ButtonBase
        id={this.props.id}
        classes={{
          root: classes.root,
        }}
        onClick={this.props.onClick}
        style={this.props.style}
        disabled={this.props.disabled}
        focusRipple={this.props.focusRipple}
        disableRipple={this.props.disableRipple}
        tabIndex={this.props.tabIndex}
      >
        {Icon.getIcon({ ...this.props, iconProperties })}
      </ButtonBase>
    );

    return tooltipTitle ? (
      <ToolTip
        context={this.props.context}
        tooltip={tooltipTitle}
        tooltipPosition={tooltipPosition}
      >
        {iconButton}
      </ToolTip>
    ) : (
        iconButton
      );
  }
}

export default IconButton;
