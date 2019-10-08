import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import { ComponentBase, ComponentComposer, Platform } from '@kuveytturk/boa-base';
import PerfectScrollbar from 'perfect-scrollbar';
import ReactResizeDetector from 'react-resize-detector';
import 'perfect-scrollbar/css/perfect-scrollbar.css';


const handlerNameByEvent = {
  'ps-scroll-y': 'onScrollY',
  'ps-scroll-x': 'onScrollX',
  'ps-scroll-up': 'onScrollUp',
  'ps-scroll-down': 'onScrollDown',
  'ps-scroll-left': 'onScrollLeft',
  'ps-scroll-right': 'onScrollRight',
  'ps-y-reach-start': 'onYReachStart',
  'ps-y-reach-end': 'onYReachEnd',
  'ps-x-reach-start': 'onXReachStart',
  'ps-x-reach-end': 'onXReachEnd',
};
Object.freeze(handlerNameByEvent);
@ComponentComposer
class Scroll extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    children: PropTypes.node.isRequired,
    divStyle: PropTypes.object,
    onScrollDown: PropTypes.func,
    onScrollLeft: PropTypes.func,
    onScrollRight: PropTypes.func,
    onScrollUp: PropTypes.func,
    onScrollX: PropTypes.func,
    onScrollY: PropTypes.func,
    onXReachEnd: PropTypes.func,
    onXReachStart: PropTypes.func,
    onYReachEnd: PropTypes.func,
    onYReachStart: PropTypes.func,
    option: PropTypes.object,
  };

  static defaultProps = {
    divStyle: { overflow: 'auto' },
  };

  state = {
    disabled: this.props.disabled,
  };

  constructor(props, context) {
    super(props, context);
    this.handlerByEvent = new Map();
  }

  componentDidMount() {
    super.componentDidMount();
    if (!this.mbContainer) {
      const innerStyleScroll = { minScrollbarLength: 16 };
      this.ps = new PerfectScrollbar(this.container, merge(innerStyleScroll, this.props.option));
      Object.keys(handlerNameByEvent).forEach(key => {
        const callback = this.props[handlerNameByEvent[key]];
        if (callback) {
          const handler = () => callback(this.container);
          this.handlerByEvent.set(key, handler);
          this.container.addEventListener(key, handler, false);
        }
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    // unhook up evens
    Object.keys(this.handlerByEvent).forEach((value, key) => {
      this.container.removeEventListener(key, value, false);
    });
    this.handlerByEvent.clear();
    if (this.ps) {
      this.ps.destroy();
      this.ps = null;
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setDisable(nextProps.disabled);
    this.update();
  }

  /**
   * Reset scroll position
   */
  resetScrollPosition() {
    if (this.container) {
      this.container.scrollTop = 0;
      this.container.scrollLeft = 0;
      this.ps.update(this.container);
    }
  }

  update() {
    if (this.ps && this.container) {
      this.ps.update(this.container);
    }
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  setScrollTop(top) {
    if (this.container) {
      this.container.scrollTop = top;
      this.ps.update();
      return true;
    }
    return false;
  }

  setScrollLeft(left) {
    if (this.container) {
      if (!this.props.context.localization.isRightToLeft) {
        this.container.scrollLeft = left;
      } else {
        this.container.scrollRight = left;
      }
      this.ps.update();
      return true;
    }
    return false;
  }

  render() {
    // TODO: disabled eklenecek mgumus
    // const childs = Utils.getFormChildren(this.props.children, this.state.disabled);
    const childs = this.props.children;
    const context = this.props.context;
    const innerStyle = Object.assign({}, { direction: 'ltr' }, this.props.style);
    let divStyle = Object.assign({ height: '100%' }, this.props.divStyle, { position: 'relative' });

    if (context.platform === Platform.MOBILE || context.platform === Platform.TABLET) {
      divStyle = Object.assign({}, divStyle, { height: '100%', WebkitOverflowScrolling: 'touch' });
      if (this.props.context.localization.isRightToLeft) {
        divStyle = Object.assign({}, divStyle, {
          direction: 'rtl',
          WebkitOverflowScrolling: 'touch',
        });
      }

      return (
        <ReactResizeDetector handleHeight>
          <div
            style={divStyle}
            ref={ref => {
              this.mbContainer = ref;
            }}
          >
            <div style={innerStyle}>{childs}</div>
          </div>
        </ReactResizeDetector>
      );
    }

    if (this.props.context.localization.isRightToLeft) {
      divStyle = { direction: 'rtl' };
    }
    return (
      <div
        className="scrollbar-container"
        style={divStyle}
        ref={ref => {
          this.container = ref;
        }}
      >
        <div style={innerStyle}>{childs}</div>
      </div>
    );
  }
}
export default Scroll;
