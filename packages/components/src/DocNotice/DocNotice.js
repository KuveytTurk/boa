import React from 'react';
import PropTypes from 'prop-types';
import { AppProvider, ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Icon } from '../Icon';

/**
 * This component renders the messages with several types:
 * 'Tip, Info, Warning, Error'
 */
@ComponentComposer
class DocNotice extends ComponentBase {
  static propTypes = {
    /**
     * The text to display.
     */
    content: PropTypes.string.isRequired,
    /**
     * Determines the paddings in interior design. Default false, wide paddings like material.
     */
    fitMode: PropTypes.bool,
    /**
     * Header message of the notice.
     */
    header: PropTypes.string,
    /**
     * Determines type of the notice.
     */
    type: PropTypes.oneOf(['info', 'tip', 'warning', 'error']).isRequired,
  };

  static defaultProps = {
    type: 'tip',
    content: '',
    header: '',
    fitMode: false,
  };

  render() {
    const style = this.getStyle();
    return (
      <div style={style}>
        <div
          style={{
            float: 'left',
            marginLeft: -36,
            marginTop: -2,
            height: 24,
          }}
        >
          <AppProvider theme={this.props.context.theme}>{this.getIcon()}</AppProvider>
        </div>
        <b>
          {this.props.header}
          {this.props.header && this.props.content ? ': ' : undefined}
        </b>
        {this.props.content}
      </div>
    );
  }

  getStyle() {
    const style = this.props.fitMode
      ? { padding: '12px 12px 12px 48px', margin: '16px 0px', width: '100%' }
      : { padding: '12px 24px 12px 60px', margin: '16px 0px', width: '100%' };

    style.minHeight = 48;

    switch (this.props.type) {
      case 'info': {
        Object.assign(style, {
          background: 'rgba(2,136,209,.15)',
          color: 'rgba(2,136,209,1)',
        });
        break;
      }
      case 'tip': {
        Object.assign(style, {
          background: 'rgba(2,136,209,.15)',
          color: 'rgba(2,136,209,1)',
        });
        break;
      }
      case 'warning': {
        Object.assign(style, {
          background: 'rgba(255,145,0,.15)',
          color: 'rgba(255,145,0, 1)',
        });
        break;
      }
      case 'error': {
        Object.assign(style, {
          background: 'rgba(255,82,82,.15)',
          color: 'rgba(255,82,82, 1)',
        });
        break;
      }
      /* istanbul ignore next */
      default:
        return null;
    }
    return style;
  }

  getIcon() {
    switch (this.props.type) {
      case 'info': {
        const icon = {
          dynamicIcon: 'Info',
          iconProperties: {
            nativeColor: 'rgba(2,136,209,1)',
          },
        };
        return Icon.getIcon(icon);
      }
      case 'tip': {
        const icon = {
          dynamicIcon: 'Star',
          iconProperties: {
            nativeColor: 'rgba(2,136,209,1)',
          },
        };
        return Icon.getIcon(icon);
      }
      case 'warning': {
        const icon = {
          dynamicIcon: 'Warning',
          iconProperties: {
            nativeColor: 'rgba(255,145,0, 1)',
            float: 'left',
            // marginLeft: -36,
          },
        };
        return Icon.getIcon(icon);
      }
      case 'error': {
        const icon = {
          dynamicIcon: 'Error',
          iconProperties: {
            nativeColor: 'rgba(255,82,82, 1)',
            float: 'left',
            // marginLeft: -36,
          },
        };
        return Icon.getIcon(icon);
      }
      /* istanbul ignore next */
      default:
        return null;
    }
  }
}

export default DocNotice;
