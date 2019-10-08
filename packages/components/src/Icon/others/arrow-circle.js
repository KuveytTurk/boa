/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const ArrowCircle = props => {
  return (
    <SvgIcon {...props}>
      <path d="M4.9,4.9C6.8,3,9.3,2,12,2c2.7,0,5.2,1,7.1,2.9C21,6.8,22,9.3,22,12c0,2.7-1,5.2-2.9,7.1C17.2,21,14.7,22,12,22c-2.7,0-5.2-1-7.1-2.9C3,17.2,2,14.7,2,12C2,9.3,3,6.8,4.9,4.9z M6.3,17.7C7.8,19.2,9.9,20,12,20c2.1,0,4.2-0.8,5.7-2.4c1.5-1.5,2.4-3.5,2.3-5.6c0-2.1-0.8-4.2-2.4-5.7C16.2,4.8,14.1,4,12,4C9.9,4,7.8,4.8,6.3,6.3C4.8,7.8,4,9.9,4,12C4,14.1,4.8,16.2,6.3,17.7z" />
      <polygon points="13,16 17,12 13,8 13,11 13,11 7,11 7,13 13,13 13,13 " />
    </SvgIcon>
  );
};

ArrowCircle.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(ArrowCircle);
