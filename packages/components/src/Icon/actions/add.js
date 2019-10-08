import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Add = props => {
  return (
    <SvgIcon {...props}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  );
};

Add.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Add);
