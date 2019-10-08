import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const DoubleChevronLeft = props => {
  return (
    <SvgIcon {...props}>
      <path d="M 17.28 8.55 L 13.83 12 l 3.45 3.45 L 16.22 16.5 L 11.72 12 l 4.5 -4.5 Z" />
      <path d="M 12.28 8.55 L 8.83 12 l 3.44 3.45 l -1 1.05 L 6.72 12 l 4.5 -4.5 Z" />
    </SvgIcon>
  );
};

DoubleChevronLeft.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(DoubleChevronLeft);
