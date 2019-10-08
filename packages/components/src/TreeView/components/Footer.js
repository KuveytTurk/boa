import React from 'react';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';

@ComponentComposer
class Footer extends ComponentBase {
  getStyle() {
    return {
      margin: 0,
      padding: '14px 18px',
      backgroundColor: 'white',
      borderWidth: 0,
      borderTop: 0,
      borderStyle: 'solid',
      fontSize: 14,
      borderColor: this.props.context.theme.boaPalette.base200,
    };
  }

  render() {
    const style = this.getStyle();
    return <p style={style}>{this.props.children}</p>;
  }
}

export default Footer;
