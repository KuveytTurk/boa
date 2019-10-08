import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const ChevronRight = props => {
  return (
    <SvgIcon {...props}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  );
};

ChevronRight.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(ChevronRight);
