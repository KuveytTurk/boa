/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Customer360 = props => {
  return (
    <SvgIcon {...props}>
      <path fill="none" d="M0,0h24v24H0V0z" />
      <g>
        <path d="M12,11.5c0.8,0,1.4-0.3,1.9-0.8s0.8-1.2,0.8-1.9s-0.3-1.4-0.8-1.9C13.4,6.3,12.8,6,12,6s-1.4,0.3-1.9,0.8C9.5,7.3,9.3,8,9.3,8.8s0.3,1.4,0.8,1.9S11.2,11.5,12,11.5z" />
        <path d="M15.9,13.9C14.5,13.3,13.2,13,12,13s-2.5,0.3-3.9,0.9c-0.6,0.3-1.1,0.6-1.4,0.9c1,1.9,3,3.3,5.3,3.3c2.3,0,4.3-1.3,5.3-3.2C17,14.4,16.5,14.2,15.9,13.9z" />
      </g>
      <path d="M22,10V4l-2,2l0,0c-1.8-2.4-4.7-4-8-4C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10h-2c0,4.4-3.6,8-8,8s-8-3.6-8-8c0-4.4,3.6-8,8-8c2.7,0,5.1,1.4,6.5,3.4L16,10H22z" />
    </SvgIcon>
  );
};

Customer360.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Customer360);
