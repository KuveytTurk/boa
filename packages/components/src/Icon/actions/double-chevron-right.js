import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const DoubleChevronRight = props => {
  return (
    <SvgIcon {...props}>
      <path d="M7.78,7.5l4.5,4.5-4.5,4.5L6.72,15.45,10.17,12,6.72,8.55Z" />
      <path d="M12.78,7.5l4.5,4.5-4.5,4.5-1.05-1.05L15.17,12,11.72,8.55Z" />
    </SvgIcon>
  );
};

DoubleChevronRight.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(DoubleChevronRight);
