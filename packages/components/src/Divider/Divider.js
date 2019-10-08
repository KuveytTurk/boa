import React from 'react';
import PropTypes from 'prop-types';
import MuiDivider from '@material-ui/core/Divider';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';

@ComponentComposer
class Divider extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    absolute: PropTypes.bool,
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * If `true`, the divider is indented.
     */
    inset: PropTypes.bool,
    /**
     * If `true`, the divider has a lighter color.
     */
    light: PropTypes.bool,
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    absolute: false,
    component: 'hr',
    inset: false,
    light: false,
  };

  render() {
    let innerStyle = {
      margin: 12,
    };

    const { style, componentSize, newLine, visible, ...props } = this.props;
    innerStyle = Object.assign(innerStyle, style);

    return <MuiDivider style={innerStyle} {...props} />;
  }
}

export default Divider;
