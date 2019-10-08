import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import classNames from 'classnames';
import EventListener from 'react-event-listener';
import debounce from 'lodash/debounce';
import { getNormalizedScrollLeft, detectScrollType } from 'normalize-scroll-left';
import scroll from 'scroll';
import { ScrollbarSize } from '../ScrollbarSize';
import { withStyles } from '@material-ui/core/styles';
import TabIndicator from './TabIndicator';
import TabScrollButton from './TabScrollButton';

export const styles = theme => ({
  root: {
    overflow: 'hidden',
    minHeight: 48,
    WebkitOverflowScrolling: 'touch', // Add iOS momentum scrolling.
  },
  flexContainer: {
    display: 'flex',
  },
  scrollingContainer: {
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
  },
  fixed: {
    overflowX: 'hidden',
    width: '100%',
  },
  scrollable: {
    overflowX: 'scroll',
  },
  centered: {
    justifyContent: 'center',
  },
  buttonAuto: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

class Tabs extends React.Component {
  state = {
    indicatorStyle: {},
    scrollerStyle: {
      marginBottom: 0,
    },
    showLeftScroll: false,
    showRightScroll: false,
    mounted: false,
  };

  handleResize = debounce(() => {
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();
  }, 166);

  handleTabsScroll = debounce(() => {
    this.updateScrollButtonState();
  }, 166);

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ mounted: true });
    this.updateIndicatorState(this.props);
    this.updateScrollButtonState();

    if (this.props.action) {
      this.props.action({
        updateIndicator: this.handleResize,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateScrollButtonState();

    // The index might have changed at the same time.
    // We need to check again the right indicator position.
    this.updateIndicatorState(this.props);

    if (this.state.indicatorStyle !== prevState.indicatorStyle) {
      this.scrollSelectedIntoView();
    }
  }

  componentWillUnmount() {
    this.handleResize.cancel();
    this.handleTabsScroll.cancel();
  }

  getConditionalElements = () => {
    const {
      classes,
      buttonClassName,
      scrollable,
      scrollButtons,
      TabScrollButton: TabScrollButtonProp,
      theme,
    } = this.props;
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? (
      <ScrollbarSize
        onLoad={this.handleScrollbarSizeChange}
        onChange={this.handleScrollbarSizeChange}
      />
    ) : null;

    const showScrollButtons = scrollable && (scrollButtons === 'auto' || scrollButtons === 'on');

    conditionalElements.scrollButtonLeft = showScrollButtons ? (
      <TabScrollButtonProp
        direction={theme && theme.direction === 'rtl' ? 'right' : 'left'}
        onClick={this.handleLeftScrollClick}
        visible={this.state.showLeftScroll}
        className={classNames(
          {
            [classes.buttonAuto]: scrollButtons === 'auto',
          },
          buttonClassName,
        )}
      />
    ) : null;

    conditionalElements.scrollButtonRight = showScrollButtons ? (
      <TabScrollButtonProp
        direction={theme && theme.direction === 'rtl' ? 'left' : 'right'}
        onClick={this.handleRightScrollClick}
        visible={this.state.showRightScroll}
        className={classNames(
          {
            [classes.buttonAuto]: scrollButtons === 'auto',
          },
          buttonClassName,
        )}
      />
    ) : null;

    return conditionalElements;
  };

  getTabsMeta = (value, direction) => {
    let tabsMeta;
    if (this.tabs) {
      const rect = this.tabs.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: this.tabs ? this.tabs.clientWidth : 0,
        scrollLeft: this.tabs ? this.tabs.scrollLeft : 0,
        scrollLeftNormalized: this.tabs ? getNormalizedScrollLeft(this.tabs, direction) : 0,
        scrollWidth: this.tabs ? this.tabs.scrollWidth : 0,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (this.tabs && value !== false) {
      const children = this.tabs.children[0].children;

      if (children.length > 0) {
        const tab = children[this.valueToIndex.get(value)];
        warning(tab, `Material-UI: the value provided \`${value}\` is invalid`);
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, tabMeta };
  };

  handleLeftScrollClick = () => {
    if (this.tabs) {
      this.moveTabsScroll(-this.tabs.clientWidth);
    }
  };

  handleRightScrollClick = () => {
    if (this.tabs) {
      this.moveTabsScroll(this.tabs.clientWidth);
    }
  };

  handleScrollbarSizeChange = ({ scrollbarHeight }) => {
    this.setState({
      scrollerStyle: {
        marginBottom: -scrollbarHeight,
      },
    });
  };

  moveTabsScroll = delta => {
    const { theme } = this.props;

    if (this.tabs) {
      const multiplier = theme.direction === 'rtl' ? -1 : 1;
      const nextScrollLeft = this.tabs.scrollLeft + delta * multiplier;
      // Fix for Edge
      const invert = theme.direction === 'rtl' && detectScrollType() === 'reverse' ? -1 : 1;
      scroll.left(this.tabs, invert * nextScrollLeft);
    }
  };

  scrollSelectedIntoView = () => {
    const { theme, value } = this.props;
    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll.left(this.tabs, nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft = tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      scroll.left(this.tabs, nextScrollLeft);
    }
  };

  updateScrollButtonState = () => {
    const { scrollable, scrollButtons, theme } = this.props;

    if (scrollable && scrollButtons !== 'off') {
      const { scrollWidth, clientWidth } = this.tabs;
      const scrollLeft = getNormalizedScrollLeft(this.tabs, theme.direction);

      const showLeftScroll =
        theme.direction === 'rtl' ? scrollWidth > clientWidth + scrollLeft : scrollLeft > 0;

      const showRightScroll =
        theme.direction === 'rtl' ? scrollLeft > 0 : scrollWidth > clientWidth + scrollLeft;

      if (
        showLeftScroll !== this.state.showLeftScroll ||
        showRightScroll !== this.state.showRightScroll
      ) {
        this.setState({ showLeftScroll, showRightScroll });
      }
    }
  };

  updateIndicatorState(props) {
    const { theme, value } = props;

    const { tabsMeta, tabMeta } = this.getTabsMeta(value, theme.direction);
    let left = 0;

    if (tabMeta && tabsMeta) {
      const correction =
        theme.direction === 'rtl'
          ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth
          : tabsMeta.scrollLeft;
      left = tabMeta.left - tabsMeta.left + correction;
    }

    const indicatorStyle = {
      left,
      // May be wrong until the font is loaded.
      width: tabMeta ? tabMeta.width : 0,
    };

    if (
      (indicatorStyle.left !== this.state.indicatorStyle.left ||
        indicatorStyle.width !== this.state.indicatorStyle.width) &&
      !Number.isNaN(indicatorStyle.left) &&
      !Number.isNaN(indicatorStyle.width)
    ) {
      this.setState({ indicatorStyle });
    }
  }

  render() {
    const {
      centered,
      children: childrenProp,
      classes,
      className: classNameProp,
      fullWidth,
      indicatorClassName,
      indicatorColor,
      onChange,
      scrollable,
      textColor,
      value,
      ...other
    } = this.props;

    const className = classNames(classes.root, classNameProp);
    const scrollerClassName = classNames(classes.scrollingContainer, {
      [classes.fixed]: !scrollable,
      [classes.scrollable]: scrollable,
    });
    const tabItemContainerClassName = classNames(classes.flexContainer, {
      [classes.centered]: centered && !scrollable,
    });

    const indicator = (
      <TabIndicator
        style={this.state.indicatorStyle}
        className={indicatorClassName}
        color={indicatorColor}
      />
    );

    this.valueToIndex = new Map();
    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue = child.props.value || childIndex;
      this.valueToIndex.set(childValue, childIndex);
      const selected = childValue === value;

      childIndex += 1;
      return React.cloneElement(child, {
        fullWidth,
        indicator: selected && !this.state.mounted && indicator,
        selected,
        onChange,
        textColor,
        value: childValue,
      });
    });

    const conditionalElements = this.getConditionalElements();

    // eslint-disable-next-line
    const { scrollButtons, TabScrollButton, action, ...divProps } = other;
    return (
      <div className={className} {...divProps}>
        <EventListener target="window" onResize={this.handleResize} />
        {conditionalElements.scrollbarSizeListener}
        <div className={classes.flexContainer}>
          {conditionalElements.scrollButtonLeft}
          <div
            className={scrollerClassName}
            style={this.state.scrollerStyle}
            ref={node => {
              this.tabs = node;
            }}
            role="tablist"
            onScroll={this.handleTabsScroll}
          >
            <div className={tabItemContainerClassName}>{children}</div>
            {this.state.mounted && indicator}
          </div>
          {conditionalElements.scrollButtonRight}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It currently only supports `updateIndicator()` action.
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: PropTypes.func,
  /**
   * The CSS class name of the scroll button elements.
   */
  buttonClassName: PropTypes.string,
  /**
   * If `true`, the tabs will be centered.
   * This property is intended for large views.
   */
  centered: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, the tabs will expand to use all the available space.
   * This property is intended for small views, like on mobile.
   */
  fullWidth: PropTypes.bool,
  /**
   * CSS class name of the indicator element.
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
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {number} value We default to the index of the child
   */
  onChange: PropTypes.func,
  /**
   * True invokes scrolling properties and allow for horizontally scrolling
   * (or swiping) the tab bar.
   */
  scrollable: PropTypes.bool,
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll.
   * `auto` shows scroll buttons on medium and larger viewports.
   * `on` always shows scroll buttons.
   * `off` never shows scroll buttons.
   */
  scrollButtons: PropTypes.oneOf(['auto', 'on', 'off']),
  /**
   * The component used to render the scroll buttons.
   */
  TabScrollButton: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Determines color of the `Tab`.
   */
  textColor: PropTypes.oneOf(['secondary', 'primary', 'inherit']),
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * Value of the currently selected `Tab`.
   * If you do not want tabs to be selectable, you can set this property to `false`.
   */
  value: PropTypes.any,
};

Tabs.defaultProps = {
  centered: false,
  fullWidth: false,
  indicatorColor: 'secondary',
  scrollable: false,
  scrollButtons: 'auto',
  TabScrollButton,
  textColor: 'inherit',
};

export default withStyles(styles, { name: 'MuiTabs', withTheme: true })(Tabs);
