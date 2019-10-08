/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const UncheckedBox = props => {
  return (
    <SvgIcon {...props}>
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  );
};

UncheckedBox.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(UncheckedBox);
