/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const SupervisorAccount = props => {
  return (
    <SvgIcon {...props}>
      <defs>
        <clipPath id="clip-path">
          <circle id="SVGID" style={{ fill: 'none' }} cx="28" cy="28" r="28" />
        </clipPath>
      </defs>
      <title>inThePool</title>
      <circle style={{ opacity: '0.48' }} cx="28" cy="28" r="28" />
      <path d="M14.33,30.75A24.39,24.39,0,0,1,20.05,30a24.37,24.37,0,0,1,5.71.75,17.79,17.79,0,0,1,5.66,2.44Q34,34.87,34,37v5H6V37q0-2.16,2.62-3.84A18.46,18.46,0,0,1,14.33,30.75Zm9.9-6.53A5.58,5.58,0,0,1,20.06,26a6.08,6.08,0,0,1-6-6,6.08,6.08,0,0,1,6-6,5.58,5.58,0,0,1,4.17,1.78,6,6,0,0,1,0,8.44Zm16,0A6,6,0,0,1,30,20a6,6,0,0,1,10.22-4.22,5.89,5.89,0,0,1,0,8.44ZM35.94,30a24.45,24.45,0,0,1,5.72.75,18.52,18.52,0,0,1,5.72,2.44C49.12,34.31,50,35.59,50,37v5H38V37q0-4.12-3.94-6.94A14.9,14.9,0,0,1,35.94,30Z" />
    </SvgIcon>
  );
};

SupervisorAccount.defaultProps = {
  viewBox: '0 0 56 56',
};

export default IconComposer(SupervisorAccount);
