/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const PartialCheckedBox = props => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" />
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
    </SvgIcon>
  );
};

PartialCheckedBox.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(PartialCheckedBox);
