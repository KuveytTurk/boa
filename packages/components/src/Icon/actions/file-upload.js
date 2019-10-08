import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const FileUpload = props => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
    </SvgIcon>
  );
};

FileUpload.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(FileUpload);
