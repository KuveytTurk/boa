/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const StopCircleFilled = props => {
  return (
    <SvgIcon {...props}>
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path d="M19.1,4.9C17.1,3,14.8,2,12,2C9.2,2,6.9,3,4.9,4.9C3,6.9,2,9.2,2,12c0,2.8,1,5.1,2.9,7.1c2,2,4.3,2.9,7.1,2.9c2.8,0,5.1-1,7.1-2.9c2-2,2.9-4.3,2.9-7.1C22,9.2,21,6.9,19.1,4.9z M16,16H8V8h8V16z" />
    </SvgIcon>
  );
};

StopCircleFilled.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(StopCircleFilled);
