/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const FeatherPen = props => {
  return (
    <SvgIcon {...props}>
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path d="M20,4c0,0-6.5-0.3-11.6,6.7C4.5,16.1,3,21,3,21l1.6-0.9c1.2-2.1,1.9-3,3.1-4.3c2.2,0.6,4.4,0.6,6.3-1.7C12.3,13.7,11,13.8,9,14c2.3-1.5,3.8-1.9,5.9-1.5l0.9-1.7c-1.5-0.3-2.6-0.3-4.1,0c1.7-1.2,2.8-1.8,4.9-1.7l1-1.6c-1.3-0.1-2.1,0.1-3.6,0.4c1.4-1.2,2.6-1.8,4.4-1.9C18.4,6,19.3,4.4,20,4z" />
    </SvgIcon>
  );
};

FeatherPen.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(FeatherPen);
