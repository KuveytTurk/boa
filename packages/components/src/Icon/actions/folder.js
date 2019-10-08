/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Folder = props => {
  return (
    <SvgIcon {...props}>
      <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
    </SvgIcon>
  );
};

Folder.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Folder);
