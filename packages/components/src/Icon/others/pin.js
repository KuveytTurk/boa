/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Pin = props => {
  return (
    <SvgIcon {...props}>
      <polygon points="16 12 14 12 14 7 16 7 16 5 8 5 8 7 10 7 10 12 8 12 8 14 11 14 11 19 13 19 13 14 16 14 16 12" />
    </SvgIcon>
  );
};

Pin.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Pin);
