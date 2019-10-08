import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import RightArrow from '@material-ui/icons/KeyboardArrowRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { Popover } from '../Popover';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base'; //
import { MenuItem } from '../MenuItem';
import { Icon } from '../Icon';

/* eslint-disable no-unused-vars */
const styles = theme => ({
  menuItem: {},
  primary: {},
  icon: {},
});
/* eslint-enable no-unused-vars */

/**
 * Icon Menus are the menus that are opened from icons.
 * They provide options related to the icon and use a minimal space.
 */
@ComponentComposer
@withStyles(styles)
class IconMenu extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * Type of the `IconButton` to render.
     */
    anchorOrigin: PropTypes.shape({
      horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
      vertical: PropTypes.oneOf(['top', 'center', 'bottom']).isRequired,
    }),
    /**
     * To set origin from outside.
     */
    animated: PropTypes.bool,
    /**
     * Custom icon for 'IconButton' to render.
     */
    classes: PropTypes.object,
    /**
     * Item list.
     *
     */
    className: PropTypes.string,
    /**
     * Menu item list.
     *
     */
    customIcon: PropTypes.object,
    /**
     * This is the point on the icon where the menu
     * `transformOrigin` attaches.
     * Options:
     * vertical: [top, middle, bottom]
     * horizontal: [left, center, right].
     */
    iconStyle: PropTypes.object,
    /**
     * Type of the `IconButton` to render. If ‘custom’, a customIcon button is required.
     */
    iconType: PropTypes.oneOf(['vertical', 'horizontal', 'custom']).isRequired,
    /**
     * If true, the popover applies transitions when
     * it gets added to the DOM.
     */
    isOriginSetted: PropTypes.bool,
    /**
     * Menu items with ‘text’ and ‘value’ props.
     */
    items: PropTypes.array,
    /**
     * Overrides the inline-styles of the underlying icon element.
     */
    menuItems: PropTypes.array,
    /**
     * Overrides the inline-styles of the menu element.
     */
    menuStyle: PropTypes.object,
    /**
     * If true, the value can an be array and allows the menu to be multi-selectable.
     */
    multiple: PropTypes.bool,
    /**
     * If true, the `IconMenu` is opened.
     */
    onChange: PropTypes.func,
    /**
     * Overrides the inline-styles of the root element.
     */
    onClick: PropTypes.func,
    /**
     * This is the point on the menu which sticks to the menu
     * origin.
     * Options:
     * vertical: [top, middle, bottom]
     * horizontal: [left, center, right].
     */
    open: PropTypes.bool,
    /**
     * Sets the delay in milliseconds before closing the
     * menu when an item is clicked.
     * If set to 0, then the auto close functionality
     * is disabled.
     */
    /* Callback function fired when the menu item is selected. */
    touchTapCloseDelay: PropTypes.number,
    /**
     * Callback function fired when the IconButton element is clicked.
     */
    transformOrigin: PropTypes.shape({
      horizontal: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
      vertical: PropTypes.oneOf(['top', 'center', 'bottom']).isRequired,
    }),
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    iconType: 'vertical',
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    animated: true,
    multiple: false,
    open: null,
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    touchTapCloseDelay: 200,
    menuStyle: { minWidth: '240px' },
  };

  state = {
    value: '',
    anchorEl: null,
  };

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onChange(parameters) {
    /* istanbul ignore else */
    if (parameters) {
      this.setState({ value: parameters.value });
      /* istanbul ignore else */
      if (this.props.onChange) {
        this.props.onChange(parameters);
      }
      this.handleClose();
    }
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;

    let menuItems = [];

    /* istanbul ignore next */
    if (this.props.menuItems) {
      menuItems = this.props.menuItems.map(item => {
        return React.cloneElement(item, {
          onTouchTap: () => {
            if (!item.props.menuItems) {
              this.handleClose();
            }
          },
        });
      });
    } else if (this.props.items) {
      menuItems = this.props.items.map(item => {
        let rightIcon = Icon.getIcon(item.rightIcon);
        const leftIcon = Icon.getIcon(item.leftIcon);

        /* istanbul ignore else */
        if (item.items && item.items.length && item.items.length > 0) {
          rightIcon = <RightArrow />;
        }

        return (
          <MenuItem
            className={this.props.classes.menuItem}
            context={this.props.context}
            key={item.value}
            value={item.value}
            primaryText={item.text}
            items={item.items}
            rightIcon={rightIcon}
            leftIcon={leftIcon}
            itemSelected={this.onChange}
          />
        );
      });
    } else {
      menuItems = [];
    }

    let icon = <MoreVertIcon />;
    switch (this.props.iconType) {
      case 'horizontal':
        icon = <MoreHorizIcon />;
        break;
      case 'custom':
        icon = this.props.customIcon;
        break;
      default:
        icon = <MoreVertIcon />;
        break;
    }

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          style={this.props.iconStyle}
          onClick={this.handleClick}
        >
          {icon}
        </IconButton>
        <Popover
          id={this.props.id}
          open={Boolean(anchorEl)}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.props.anchorOrigin} // For Popover
          transformOrigin={this.props.transformOrigin}
          onRequestClose={this.handleClose}
        >
          <MenuList
            style={this.props.menuStyle}
            multiple={this.props.multiple}
            value={this.state.value}
          >
            {menuItems}
          </MenuList>
        </Popover>
      </div>
    );
  }
}

export default IconMenu;
