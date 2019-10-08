/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Apps = props => {
  return (
    <SvgIcon {...props}>
      <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  );
};

Apps.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Apps);
