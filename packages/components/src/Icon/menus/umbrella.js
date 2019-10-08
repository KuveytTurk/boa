/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Umbrella = props => {
  return (
    <SvgIcon {...props}>
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path d="M22,12c0-5.5-4.5-10-10-10S2,6.5,2,12h2h7v7c0,0.6-0.4,1-1,1s-1-0.4-1-1H7c0,1.8,1.5,3.2,3.4,3c1.5-0.2,2.6-1.6,2.6-3.1V12h7H22z" />
    </SvgIcon>
  );
};

Umbrella.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Umbrella);
