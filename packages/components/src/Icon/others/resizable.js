import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Resizable = props => {
  return (
    <SvgIcon {...props}>
      <rect x="4" width="2" height="2" />
      <rect y="4" width="2" height="2" />
      <rect x="4" y="4" width="2" height="2" />
    </SvgIcon>
  );
};

Resizable.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Resizable);
