import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const ChevronLeft = props => {
  return (
    <SvgIcon {...props}>
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  );
};

ChevronLeft.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(ChevronLeft);
