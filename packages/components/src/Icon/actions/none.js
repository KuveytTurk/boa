/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const None = (props) => {
  return (
    <SvgIcon {...props}>
      <path />
    </SvgIcon>
  );
};

None.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(None);
