import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { withStyles } from '@material-ui/core/styles';
import MuiMenuList from '@material-ui/core/MenuList';
import MuiDivider from '@material-ui/core/Divider';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { MenuItem } from '../MenuItem';
import { Icon } from '../Icon';

const styles = () => ({
  menuItem: {
    paddingBottom: 6,
    paddingTop: 6,
    paddingLeft: 0,
    paddingRight: 0,
    height: 'auto',
  },
  primary: {},
});

/**
 * Menus allow you to take an action by selecting from a list revealed upon opening a temporary, new sheet of material.
 */
@ComponentComposer
@withStyles(styles)
class Menu extends ComponentBase {
  static defaultProps = {
    ...ComponentBase.defaultProps,
    multiple: false,
    isMenuItemList: false,
    items: [],
  };

  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * @ignore
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    isMenuItemList: PropTypes.bool,
    /**
     * Item list
     */
    items: PropTypes.array.isRequired,
    /**
     * If true, `value` must be an array and the menu supports
     * multiple selections.
     */
    multiple: PropTypes.bool,
    /**
     * Callback function fired when a menu item with `value` not
     * equal to the current `value` of the menu is touch-tapped.
     *
     * @param {object} event TouchTap event targeting the menu item.
     * @param {any}  value If `multiple` is true, the menu's `value`
     * array with either the menu item's `value` added (if
     * it wasn't already selected) or omitted (if it was already selected).
     * Otherwise, the `value` of the menu item.
     */
    onChange: PropTypes.func,
    /**
     * ItemList Parents Info
     */
    parentMenuItem: PropTypes.object,
    /**
     * Can be used to render primary text padding within the menu item.
     */
    primaryTextPadding: PropTypes.any,
    /**
     * If `multiple` is true, an array of the `value`s of the selected
     * menu items. Otherwise, the `value` of the selected menu item.
     * If provided, the menu will be a controlled component.
     * This component also supports valueLink.
     */
    value: PropTypes.any,
    /**
     * The width of the menu. If not specified, the menu's width
     * will be set according to the widths of its children, using
     * proper keyline increments (64px for desktop, 56px otherwise).
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    value: this.props.value,
  };

  constructor(props, context) {
    super(props, context);
    this.menuItemSelected = this.menuItemSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  menuItemSelected(parameters) {
    this.setState({ value: parameters.value });
    if (this.props.menuItemSelected) {
      this.props.menuItemSelected(parameters);
    }
  }

  getIcon(iconProp) {
    if (iconProp) {
      let iconProperties = null;
      if (iconProp.svgIcon || iconProp.fontIcon || iconProp.dynamicIcon) {
        iconProperties = {
          style: {
            height: 20,
            width: 20,
            color: this.props.context.theme.boaPalette.base400,
          },
        };
        iconProperties = merge(iconProperties, iconProp.iconProperties || {});
      }
      if (iconProperties) {
        iconProp.iconProperties = iconProperties;
      }
      const icon = Icon.getIcon(iconProp);
      return icon || iconProp;
    }
    return null;
  }

  render() {
    let menuItems = [];
    const fixedMenuItems = [];
    const isRightToLeft = this.props.context.localization.isRightToLeft;
    const fixedItems = this.props.items.filter(items => items.fixed === true);
    /* istanbul ignore else */
    if (!this.props.isMenuItemList) {
      const allItems = this.props.items;
      for (let i = 0; i < allItems.length; i++) {
        const item = allItems[i];

        const allProperties = item.allProperties || {};
        const typeId = allProperties.typeId;

        if (typeId !== undefined && typeId !== 1 && typeId !== 2) {
          // eslint-disable-next-line no-continue
          continue;
        }

        const rightIcon =
          item.items && item.items.length
            ? this.getIcon({ dynamicIcon: isRightToLeft ? 'ChevronLeft' : 'ChevronRight' })
            : this.getIcon(item.rightIcon);

        const leftIcon = this.getIcon(item.leftIcon);

        let itemStyle = {
          lineHeight: null,
          whiteSpace: 'normal',
          minHeight: 24,
          fontSize: 14,
          paddingLeft: isRightToLeft ? 0 : 12,
          paddingRight: isRightToLeft ? 12 : 0,
        };

        itemStyle = merge(itemStyle, item.style || {});

        const leftIconStyle = { margin: 'auto 12px auto 12px' };

        if (item && item.leftIcon && item.leftIcon.dynamicIcon === 'ChevronLeft') {
          itemStyle.fontSize = 16;
        }

        let innerDivStyle = {
          padding: !isRightToLeft ? '10px 40px 10px 72px' : '10px 72px 10px 40px',
        };

        innerDivStyle = merge(innerDivStyle, item.innerDivStyle || {});

        const menuItem = (item.value || item.text) ? (
          <MenuItem
            classes={this.props.classes}
            context={this.props.context}
            key={item.value}
            value={item.value}
            primaryText={item.text}
            items={item.items}
            rightIcon={rightIcon}
            leftIcon={leftIcon}
            leftIconStyle={leftIconStyle}
            style={itemStyle}
            primaryTextPadding={this.props.primaryTextPadding}
            innerDivStyle={innerDivStyle}
            itemSelected={this.menuItemSelected}
            width={this.props.width}
            allProperties={item.allProperties}
          />
        ) : <MuiDivider style={{ marginBottom: 12, marginTop: 12 }} key={Math.random()} />;

        if (fixedItems &&
          fixedItems.length > 0 &&
          fixedItems.includes(item)) {
          fixedMenuItems.push(menuItem);
        } else {
          menuItems.push(menuItem);
        }
      }
    } else {
      menuItems = this.props.items.map(item => {
        if (item.props.menuItems && item.props.menuItems.length > 0) {
          return React.cloneElement(item, {
            itemSelected: parameters => {
              this.menuItemSelected(parameters);
            },
            items: item.props.menuItems,
          });
        }

        if (!item.props.primaryText) {
          return (
            <MuiDivider
              style={{
                marginBottom: 12,
                marginTop: 12,
              }}
              key={Math.random()}
            />
          );
        }

        return item;
      });
    }

    return (
      <MuiMenuList
        multiple={this.props.multiple}
        onChange={this.props.onChange}
        value={this.state.value}
        width={this.props.width}
        style={this.props.style}
      >
        {fixedMenuItems}
        {fixedItems && fixedItems.length > 0 ?
          <MuiDivider style={{ marginBottom: 12, marginTop: 12 }} key={Math.random()} /> :
          null}
        {menuItems}
      </MuiMenuList>
    );
  }
}

export default Menu;
