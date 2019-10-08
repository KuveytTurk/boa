import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Popover } from '../Popover';

const styles = theme => ({
  menuItem: {
    '&:hover': {
      backgroundColor: theme.boaPalette.base150,
    },
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 220,
  },
  primary: {},
  leftIconClass: { display: 'flex', paddingBottom: 0, paddingTop: 0 },
  rightIconClass: { display: 'flex', paddingBottom: 0, paddingTop: 0 },
});
@ComponentComposer
@withStyles(styles)
class MenuItem extends ComponentBase {
  static defaultProps = {
    ...ComponentBase.defaultProps,
    checked: false,
    disabled: false,
    primaryTextPadding: '0px 12px 0px 12px',
    isAddedDrawer: false,
  };

  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    allProperties: PropTypes.object,
    /**
     * If true, a left check mark will be rendered.
     */
    checked: PropTypes.bool,
    /**
     * If true, the menu item will be disabled.
     */
    classes: PropTypes.object,
    /**
     * If true, the menu item will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * Callback function fired when the menu item is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the menu item.
     */
    isAddedDrawer: PropTypes.bool,

    itemSelected: PropTypes.func,
    /**
     * The `SvgIcon` or `FontIcon` to be displayed on the left side.
     */
    leftIcon: PropTypes.element,
    /**
     * The `SvgIcon` or `FontIcon` to be displayed on the right side.
     */
    leftIconStyle: PropTypes.object,
    /**
     * Callback function fired when the menu item is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the menu item.
     */
    onTouchTap: PropTypes.func,
    /**
     * Can be used to render primary text within the menu item.
     */
    primaryText: PropTypes.node,
    primaryTextPadding: PropTypes.any,
    rightIcon: PropTypes.element,
    /**
     * The value of the menu item.
     */
    rightIconStyle: PropTypes.object,
    /**
     * Can be used to render secondary text within the menu item.
     */
    secondaryText: PropTypes.node,
    /**
     * Color of the menuItem.
     */
    textColor: PropTypes.string,
    /**
     * The value of the menu item.
     */
    value: PropTypes.any,
  };

  state = { anchorEl: null };

  constructor(props, context) {
    super(props, context);
    this.onTouchTap = this.onTouchTap.bind(this);
  }

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onTouchTap(event) {
    if (this.props.itemSelected) {
      const parameters = {
        value: this.props.value,
        text: this.props.primaryText,
        items: this.props.isAddedDrawer ? this.props.menuItems : this.props.items,
        allProperties: this.props.allProperties,
      };
      if (!this.props.disabled) {
        this.props.itemSelected(parameters);
      }
      if (!this.props.disabled && this.props.onTouchTap) {
        this.props.onTouchTap(event);
      }
      if (!this.state.anchorEl) {
        this.setState({ anchorEl: event.currentTarget });
      } else {
        this.setState({ anchorEl: null });
      }
    }
  }

  render() {
    const { anchorEl } = this.state;
    const { leftIcon, rightIcon, context } = this.props;
    const isRightToLeft = context.localization.isRightToLeft;
    const popoverStyle = {
      anchorOrigin: {
        horizontal: !isRightToLeft ? 'left' : 'right',
        vertical: 'Bottom',
      },
      transformOrigin: {
        horizontal: !isRightToLeft ? 'right' : 'left',
        vertical: 'top',
      },
    };

    let menuItems = null;
    if (this.props.menuItems && !this.props.isAddedDrawer) {
      menuItems = (
        <div>
          <Popover
            context={this.props.context}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
            anchorOrigin={popoverStyle.anchorOrigin}
            transformOrigin={popoverStyle.transformOrigin}
          >
            {this.props.menuItems}
          </Popover>
        </div>
      );
    }

    return (
      <MuiMenuItem
        className={this.props.classes.menuItem}
        selected={this.props.checked}
        disabled={this.props.disabled}
        onClick={this.onTouchTap}
        style={this.props.style}
        value={this.props.value}
      >
        {leftIcon && (
          <MuiListItemIcon
            style={this.props.leftIconStyle}
            className={this.props.classes.leftIconClass}
          >
            {leftIcon}
          </MuiListItemIcon>
        )}
        {this.props.primaryText && (
          <div
            style={{
              flexGrow: '1',
              width: 'calc(100% - 137px)',
              padding: this.props.primaryTextPadding,
              color: this.props.textColor || this.props.context.theme.boaPalette.base400,
              textAlign: this.props.context.localization.isRightToLeft ? 'right' : 'left',
              primary: this.props.classes.primary,
            }}
          >
            {this.props.primaryText}
          </div>
        )}
        {this.props.editor}
        {menuItems}
        {rightIcon && (
          <MuiListItemIcon
            style={this.props.rightIconStyle || rightIcon.props.style}
            className={this.props.classes.rightIconClass}
          >
            {rightIcon}
          </MuiListItemIcon>
        )}
      </MuiMenuItem>
    );
  }
}

export default MenuItem;
