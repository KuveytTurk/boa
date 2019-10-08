import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const ArrowLeft = props => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </SvgIcon>
  );
};

ArrowLeft.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(ArrowLeft);
