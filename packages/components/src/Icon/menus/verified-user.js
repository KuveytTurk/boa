/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const VerifiedUser = props => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </SvgIcon>
  );
};

VerifiedUser.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(VerifiedUser);
