/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Localization } from '@kuveytturk/boa-utils';
import { Button } from '../Button';
import { withStyles } from '@material-ui/core/styles';
import { ListItem } from '../ListItem';
import { IconMenu } from '../IconMenu';
import Tabs from './Tabs';
import Tab from './Tab';

const DoubleChevronRight = require('../Icon').Actions.DoubleChevronRight;
const DoubleChevronLeft = require('../Icon').Actions.DoubleChevronLeft;

const styles = theme => ({
  primary: {
    fontSize: '13px',
    textAlign: 'center',
    color: theme.boaPalette ? theme.boaPalette.comp500 : '',
    background: theme.boaPalette ? theme.boaPalette.pri500 : '',
    minWidth: '64px',
  },
  secondary: {
    fontSize: '13px',
    textAlign: 'center',
    color: theme.boaPalette ? theme.boaPalette.pri500 : '',
    background: theme.boaPalette ? theme.boaPalette.comp500 : '',
    minWidth: '64px',
  },
  labelContainer: {
    width: '100%',
    padding: 0,
  },
  iconRoot: { fontSize: '20px' },
});

/**
 * Tabs make it easy to explore and switch between different views or functional aspects of an app or to browse categorized data sets.
 */
@ComponentComposer
@withStyles(styles)
class TabBar extends ComponentBase {
  static propTypes = {
    ...ComponentBase.propTypes,
    /**
     * If `true`, the tabs are centered.
     * This property is intended for large views.
     */
    centered: PropTypes.bool,
    /**
     * Content of the component.
     */
    children: PropTypes.node,
    /**
     * @ignore
     * Override or extend the styles applied to the component.
     * See [CSS API](#css) below for more details.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * Indicates location of the tabs. Each container type has its own style.
     */
    containerType: PropTypes.oneOf(['default', 'page', 'card']),
    /**
     * The default value of the selected `Tab`.
     */
    defaultValue: PropTypes.any,
    /**
     * If `true`, the tabs expand to use all the available space.
     * This property is intended for small views, like on mobile.
     */
    fullWidth: PropTypes.bool,
    /**
     * @ignore
     */
    indicatorClassName: PropTypes.string,
    /**
     * Determines color of the indicator.
     */
    indicatorColor: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf(['secondary', 'primary']),
    ]),
    /**
     * If `true`, contents of tabs are not shown.
     */
    isContentDisabled: PropTypes.bool,
    /**
     * The icon button is placed on the left side of tabs.
     * It renders a dynamicIcon with a string prop.
     * It also renders a React Element.
     */
    leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /**
     * If `false`, the left icon is not shown.
     */
    leftIconButtonVisibility: PropTypes.bool,
    /**
     * If `primary`, the tabs are colored with the primary color of the current theme.
     */
    mode: PropTypes.oneOf(['primary', 'secondary']),
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback
     * @param {number} value We default to the index of the child
     */
    onChange: PropTypes.func,
    /**
     * Callback fired when the rightIconClick.
     *
     * @param {object} event The event source of the callback
     * @param {number} value We default to the index of the child
     */
    onRightIconClick: PropTypes.func,
    /**
     * The right icon of the component generated inside of the component.
     * rightIconButtonVisibility hides the rightIcon.
     */
    rightIconButtonVisibility: PropTypes.bool,
    /**
     * If `true`, it invokes scrolling properties and allows horizontally
     * scrolling (or swiping) of the tab bar.
     */
    scrollable: PropTypes.bool,
    /**
     * Determines behavior of the scroll buttons when tabs are set to scroll.
     * `auto` shows scroll buttons on medium and larger viewports.
     * `on` always shows scroll buttons.
     * `off` never shows scroll buttons.
     */
    scrollButtons: PropTypes.oneOf(['auto', 'on', 'off']),
    /**
     * Tabs will be rendered in TabBar.
     */
    tabItems: PropTypes.array,
    /**
     * The component used to render the scroll buttons.
     */
    TabScrollButton: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * Override the style of tab contents.
     */
    tabTemplateStyle: PropTypes.object,
    /**
     * The value of the currently selected `Tab`.
     * If you don't want to make tabs selectable, you can set this property to `false`.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    mode: 'primary',
    fullWidth: true,
    isContentDisabled: false,
    value: 0,
    defaultValue: 0,
    leftIconButtonVisibility: false,
    rightIconButtonVisibility: false,
    disableIcons: false,
    tabItems: [],
  };

  state = {
    value: this.props.value || this.props.defaultValue,
    tabItems: this.props.tabItems,
    isScroll: true,
  };

  constructor(props, context) {
    super(props, context);
    this.isClosing = false;
    this.handleChange = this.handleChange.bind(this);
    // this.scrollStateUpdate();
  }

  componentDidMount() {
    super.componentDidMount();
    this.scrollStateUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    super.componentDidUpdate(prevProps, prevState);
    this.scrollStateUpdate();
  }

  resetValue() {
    this.setState({
      value: this.props.defaultValue,
    });
  }

  scrollStateUpdate() {
    if (this.tabs) {
      if (this.tabs._reactInternalFiber.child.memoizedState.tabsMeta) {
        const clientWidth = this.tabs._reactInternalFiber.child.memoizedState.tabsMeta.clientWidth;
        const scrollWidth = this.tabs._reactInternalFiber.child.memoizedState.tabsMeta.scrollWidth;
        const scrollLeft = this.tabs._reactInternalFiber.child.memoizedState.tabsMeta.scrollLeft;

        const showRightScroll =
          this.props.context.theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth;

        this.setState({ isScroll: showRightScroll });
      }
      this.setState({
        isScroll:
          this.tabs._reactInternalFiber.child.memoizedState.showRightScroll &&
          this.tabs._reactInternalFiber.child.memoizedState.showLeftScroll,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value != nextProps.value) {
      this.setState({ value: nextProps.value });
    }
    if (this.state.tabItems != nextProps.tabItems) {
      this.setState({ tabItems: nextProps.tabItems });
    }
  }

  updateBTabBarDynamic(tabItems, value) {
    this.setState({ tabItems, value });
    this.forceUpdate();
  }

  handleChange = (event, value) => {
    if (!this.isClosing) {
      this.setState({ value });
      this.props.onChange && this.props.onChange(event, value);
    }
    this.isClosing = false;
    // this.actions && this.actions.updateIndicator();
  };

  handleRightIconClick(value) {
    this.isClosing = true;
    const valueOfClosingTab = this.state.mouseOverItem ? this.state.mouseOverItem : value;
    this.props.onRightIconClick && this.props.onRightIconClick(valueOfClosingTab);
  }

  handleLeftIconClick(value) {
    this.props.handleLeftIconClick && this.props.handleLeftIconClick(value);
  }

  handleTabItemChange(value) {
    this.props.onChange ? this.props.onChange(event, value) : this.setState({ value });
  }

  getLeftIconButton(isLeftIconButtonVisibile, item) {
    let leftIconButton;
    const iconColor =
      this.props.mode == 'primary'
        ? this.props.context.theme.boaPalette.comp500
        : this.props.context.theme.boaPalette.pri500;

    const style = {
      paddingLeft: isLeftIconButtonVisibile == 'visible' ? '12px' : '0px',
      paddingRight: isLeftIconButtonVisibile == 'visible' ? '8px' : '0px',
      float: 'left',
      width: isLeftIconButtonVisibile == 'visible' ? '42px' : '24px',
      visibility: isLeftIconButtonVisibile,
    };

    if (item.leftIcon && typeof (item.leftIcon) === 'string') {
      leftIconButton = (
        <Button
          context={this.props.context}
          type="icon"
          style={style}
          tooltip={item.toolTip}
          tooltipPosition={'down'}
          dynamicIcon={item.leftIcon}
          iconProperties={{ nativeColor: iconColor }}
          onClick={this.handleLeftIconClick.bind(this, item.value)}
        />
      );
    } else if (item.leftIcon) {
      leftIconButton = this.props.leftIcon;
    } else {
      leftIconButton = (
        <Button
          context={this.props.context}
          type="icon"
          style={style}
          dynamicIcon={'Home'}
          tooltip={item.toolTip}
          tooltipPosition={'down'}
          iconProperties={{ nativeColor: iconColor }}
          onClick={this.handleLeftIconClick.bind(this, item.value)}
        />
      );
    }

    return leftIconButton;
  }

  getRightIconButton(isRightIconButtonVisibile, item) {
    const { classes } = this.props;
    let rightIconButton;
    const iconColor =
      this.props.mode == 'primary'
        ? this.props.context.theme.boaPalette.comp500
        : this.props.context.theme.boaPalette.pri500;

    rightIconButton = this.props.rightIconButton ? (
      this.props.rightIconButton
    ) : (
        <Button
          context={this.props.context}
          type="icon"
          style={{
            float: 'right',
            width: '24px',
            height: '24px',
            marginTop: '12px',
            verticalAlign: 'middle',
            visibility: isRightIconButtonVisibile,
          }}
          tooltip={item.toolTip}
          tooltipPosition={'down'}
          dynamicIcon={'Close'}
          iconProperties={{ nativeColor: iconColor, classes: { root: classes.iconRoot } }}
          onClick={this.handleRightIconClick.bind(this, item.value)}
        />
      );

    return rightIconButton;
  }

  getTabLabel(item) {
    const tabIndex = this.props.tabItems.findIndex(
      currentValue => currentValue.value == item.value,
    );
    let isRightIconButtonVisibile = 'hidden';
    let isLeftIconButtonVisibile = 'hidden';
    if (tabIndex > 0) {
      isRightIconButtonVisibile =
        (this.props.rightIconButtonVisibility && this.props.value == item.value) ||
          this.state.mouseOverItem == item.value
          ? 'visible'
          : 'hidden';
      // isRightIconButtonVisibile && this.setState({ selected: item.value });
    }
    if (this.props.leftIconButtonVisibility && item.leftIconVisibility) {
      isLeftIconButtonVisibile = 'visible';
    }

    const width = isLeftIconButtonVisibile == 'visible' ? 'calc(100% - 68px)' : 'calc(100% - 48px)';
    const title = Localization.stringUpperCase(item.text);
    const titleStyle = {
      margin: '0 auto !important',
      width,
      height: '48px',
      display: 'table-cell',
      verticalAlign: 'middle',
    };

    let leftIconButton;
    let rightIconButton;
    leftIconButton = this.getLeftIconButton(isLeftIconButtonVisibile, item);
    rightIconButton = this.getRightIconButton(isRightIconButtonVisibile, item);

    return this.props.disableIcons ? (
      <div style={this.props.tabLabelStyle}>{title}</div>
    ) : (
        <div
          style={{
            textAlign: 'center',
            height: 48,
            direction: this.props.context.localization.isRightToLeft ? 'rtl' : 'ltr',
          }}
        >
          {leftIconButton}
          {rightIconButton}
          <div style={titleStyle}>
            <div
              style={{
                display: '-webkit-box',
                webkitLineClamp: '2',
                webkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {title}
            </div>
          </div>
        </div>
      );
  }

  renderTabScrollButton() {
    if (this.props.TabScrollButton) return this.props.TabScrollButton();

    const showAllTabIcon = !this.props.context.localization.isRightToLeft ? (
      <DoubleChevronRight
        context={this.props.context}
        style={{ nativeColor: this.props.context.theme.boaPalette.comp500 }}
      />
    ) : (
        <DoubleChevronLeft
          context={this.props.context}
          style={{ nativeColor: this.props.context.theme.boaPalette.comp500 }}
        />
      );
    const popoverTabs = this.props.tabItems.map((item, i) => (
      <ListItem
        key={i}
        context={this.props.context}
        primaryText={item.text}
        onClick={this.handleTabItemChange.bind(this, item.value)}
      />
    ));

    const iconContainerStyle = this.props.containerType == 'page' ? { paddingTop: '12px' } : {};
    let iconStyle;
    const iconColor =
      this.props.mode == 'secondary'
        ? this.props.context.theme.boaPalette.pri500
        : this.props.context.theme.boaPalette.comp500;
    iconStyle = Object.assign({}, iconStyle, { color: iconColor });
    return (
      <div style={iconContainerStyle}>
        <IconMenu
          ref={r => {
            this.showAllTaButton = r;
          }}
          context={this.props.context}
          iconType="custom"
          menuStyle={{ minWidth: '240px', maxWidth: '320px' }}
          customIcon={showAllTabIcon}
          menuItems={popoverTabs}
          iconStyle={iconStyle}
        />
      </div>
    );
  }

  getTabItems() {
    const { classes } = this.props;

    let tabStyle =
      this.props.containerType == 'page' ? { paddingTop: '12px', height: '60px' } : null;
    tabStyle =
      this.props.mode == 'secondary'
        ? Object.assign({}, tabStyle, this.props.style)
        : this.props.style;

    const tabItems = this.state.tabItems.map((item, i) => {
      return (
        <Tab
          className={this.props.className}
          key={i}
          disabled={item.disabled}
          icon={item.icon}
          value={item.value || i}
          label={this.getTabLabel(item)}
          classes={{
            root: this.props.mode == 'secondary' ? classes.secondary : classes.primary,
            labelContainer: classes.labelContainer,
          }}
          style={tabStyle}
        />
      );
    });
    return tabItems;
  }

  mouseOver(value) {
    // console.log("Mouse out!!!");
    this.setState({ mouseOverItem: value });
  }

  mouseOut() {
    // console.log("Mouse over!!!");
    this.setState({ mouseOverItem: null });
  }

  getTabContents() {
    const tabContents = this.props.tabItems.map((item, i) => {
      let style = {};
      if (this.state.value !== item.value) {
        style = { height: 0, overflow: 'hidden' };
      }
      style = Object.assign({}, this.props.tabTemplateStyle, style);
      return (
        <div key={i} style={style}>
          {item.content}
        </div>
      );
    });
    return tabContents;
  }

  render() {
    const type = this.props.containerType ? this.props.containerType : 'default';
    switch (type) {
      case 'default':
        return this.renderDefault();
      case 'page':
        return this.renderPage();
      case 'card':
        return this.renderCard();
      case 'appbar':
        return this.renderAppBar();
      default:
        return this.renderDefault();
    }
  }

  getBorderBottomStyle() {
    if (this.props.mode == 'secondary') {
      return (
        <style>
          {`
          .b-tab-bar > div > div > div { border-bottom: 1px solid #bdbdbd;}
        `}
        </style>
      );
    }
  }

  renderDefault() {
    const { classes } = this.props;
    const tabItems = this.getTabItems();

    const tabContents = this.getTabContents();

    let indicatorColor = this.props.indicatorColor;
    if (this.props.mode == 'secondary') {
      indicatorColor = this.props.context.theme.boaPalette.pri500;
    }

    return (
      <div
        ref={el => {
          this.tabsDiv = el;
        }}
      >
        <Tabs
          className={'b-tab-bar'}
          action={actions => (this.actions = actions)}
          ref={t => {
            this.tabs = t;
          }}
          onChange={this.handleChange}
          style={this.props.style}
          value={this.state.value}
          centered={this.state.isScroll ? false : this.props.centered}
          indicatorColor={indicatorColor}
          scrollable={this.state.isScroll ? this.props.scrollable : false}
          scrollButtons={this.props.scrollButtons}
          TabScrollButton={this.renderTabScrollButton.bind(this)}
          classes={{
            root: this.props.mode == 'primary' ? classes.primary : classes.secondary,
          }}
          isRightScrollActive={this.state.isScroll}
        >
          {tabItems}
        </Tabs>
        {!this.props.isContentDisabled && tabContents}
        {this.getBorderBottomStyle()}
      </div>
    );
  }

  renderPage() {
    const { classes } = this.props;
    const tabItems = this.getTabItems();

    const tabContents = this.getTabContents();

    let indicatorColor = this.props.indicatorColor;
    if (this.props.mode == 'secondary') {
      indicatorColor = this.props.context.theme.boaPalette.pri500;
    }
    const tabsStyle = Object.assign({}, this.props.style, { height: '60px' });

    return (
      <div
        ref={el => {
          this.tabsDiv = el;
        }}
      >
        <Tabs
          className={'b-tab-bar'}
          ref={t => {
            this.tabs = t;
          }}
          onChange={this.handleChange}
          style={tabsStyle}
          value={this.state.value}
          indicatorColor={indicatorColor}
          scrollable
          scrollButtons={this.props.scrollButtons}
          classes={{
            root: this.props.mode == 'primary' ? classes.primary : classes.secondary,
          }}
          isRightScrollActive
          isLeftScrollActive
        >
          {tabItems}
        </Tabs>
        {!this.props.isContentDisabled && tabContents}
        {this.getBorderBottomStyle()}
      </div>
    );
  }

  renderCard() {
    const { classes } = this.props;
    const tabItems = this.getTabItems();

    const tabContents = this.getTabContents();

    let indicatorColor = this.props.indicatorColor;
    if (this.props.mode == 'secondary') {
      indicatorColor = this.props.context.theme.boaPalette.pri500;
    }

    return (
      <div
        ref={el => {
          this.tabsDiv = el;
        }}
      >
        <Tabs
          className={'b-tab-bar'}
          ref={t => {
            this.tabs = t;
          }}
          onChange={this.handleChange}
          style={this.props.style}
          value={this.state.value}
          centered={this.props.centered}
          indicatorColor={indicatorColor}
          scrollable
          scrollButtons={'auto'}
          classes={{
            root: this.props.mode == 'primary' ? classes.primary : classes.secondary,
          }}
          isRightScrollActive
          isLeftScrollActive
        >
          {tabItems}
        </Tabs>
        {!this.props.isContentDisabled && tabContents}
        {this.getBorderBottomStyle()}
      </div>
    );
  }

  getRightIconButtonForAppBar(isRightIconButtonVisibile, value) {
    const { classes } = this.props;
    let rightIconButton;
    const iconColor =
      this.props.mode == 'primary'
        ? this.props.context.theme.boaPalette.comp500
        : this.props.context.theme.boaPalette.pri500;

    rightIconButton = this.props.rightIconButton ? (
      this.props.rightIconButton
    ) : (
        <Button
          context={this.props.context}
          type="icon"
          style={{
            float: 'right',
            width: '24px',
            height: '24px',
            marginTop: '12px',
            verticalAlign: 'middle',
            visibility: isRightIconButtonVisibile,
          }}
          dynamicIcon={'Close'}
          iconProperties={{ nativeColor: iconColor, classes: { root: classes.iconRoot } }}
          onClick={this.handleRightIconClick.bind(this, value)}
        />
      );

    return rightIconButton;
  }

  getTabLabelForAppBar(item) {
    const tabIndex = this.props.tabItems.findIndex(
      currentValue => currentValue.value == item.value,
    );
    let isRightIconButtonVisibile = 'hidden';
    let isLeftIconButtonVisibile = 'hidden';
    if (tabIndex > 0) {
      isRightIconButtonVisibile =
        (this.props.rightIconButtonVisibility && this.props.value == item.value) ||
          this.state.mouseOverItem == item.value
          ? 'visible'
          : 'hidden';
      // isRightIconButtonVisibile && this.setState({ selected: item.value });
    }
    if (item.leftIconVisibility) {
      isLeftIconButtonVisibile = 'visible';
    }

    const width = isLeftIconButtonVisibile == 'visible' ? 'calc(100% - 68px)' : 'calc(100% - 48px)';
    const title = Localization.stringUpperCase(item.text);
    const titleStyle = {
      margin: '0 auto !important',
      width,
      height: '48px',
      display: 'table-cell',
      verticalAlign: 'middle',
    };

    let leftIconButton;
    let rightIconButton;
    leftIconButton = this.getLeftIconButton(isLeftIconButtonVisibile, item);
    rightIconButton = this.getRightIconButtonForAppBar(isRightIconButtonVisibile, item.value);

    return (
      <div
        style={{
          textAlign: 'center',
          height: '48px',
          direction: this.props.context.localization.isRightToLeft ? 'rtl' : 'ltr',
        }}
      >
        {leftIconButton}
        {rightIconButton}
        <div style={titleStyle}>
          <div
            style={{
              display: '-webkit-box',
              webkitLineClamp: '2',
              webkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    );
  }

  renderAppBar() {
    const { classes } = this.props;

    const tabStyle =
      this.props.containerType == 'page' ? { paddingTop: '12px', height: '60px' } : null;

    const tabItems = this.props.tabItems.map((item, i) => {
      return (
        <Tab
          className={this.props.className}
          key={i}
          disabled={item.disabled}
          icon={item.icon}
          value={item.value || i}
          label={this.getTabLabelForAppBar(item)}
          classes={{
            root: this.props.mode == 'secondary' ? classes.secondary : classes.primary,
            labelContainer: classes.labelContainer,
          }}
          style={tabStyle}
          onMouseOut={() => this.mouseOut()}
          onMouseOver={() => this.mouseOver(item.value)}
        />
      );
    });

    const tabContents = this.props.tabItems.map((item, i) => {
      let style = {};
      if (this.props.value !== item.value) {
        style = { height: 0, overflow: 'hidden' };
      }
      style = Object.assign({}, this.props.tabTemplateStyle, style);
      return (
        <div key={i} style={style}>
          {item.content}
        </div>
      );
    });

    let indicatorColor = this.props.indicatorColor;
    if (this.props.mode == 'secondary') {
      indicatorColor = this.props.context.theme.boaPalette.pri500;
    }

    return (
      <div
        ref={el => {
          this.tabsDiv = el;
        }}
      >
        <Tabs
          action={actions => (this.actions = actions)}
          ref={t => {
            this.tabs = t;
          }}
          onChange={this.handleChange}
          style={this.props.style}
          value={this.props.value}
          centered={this.props.centered}
          indicatorColor={indicatorColor}
          scrollable={this.state.isScroll && this.props.scrollable}
          scrollButtons={this.props.scrollButtons}
          TabScrollButton={this.renderTabScrollButton.bind(this)}
          classes={{
            root: this.props.mode == 'primary' ? classes.primary : classes.secondary,
          }}
          isRightScrollActive
        >
          {tabItems}
        </Tabs>
        {!this.props.isContentDisabled && tabContents}
      </div>
    );
  }
}

export default TabBar;
