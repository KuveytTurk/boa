/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const DocumentRemove = props => {
  return (
    <SvgIcon {...props}>
      <path fill="none" d="M0,0h24v24H0V0z" />
      <path d="M14,2l6,6v12c0,0.5-0.2,1-0.6,1.4C19,21.8,18.5,22,18,22H6c-0.5,0-1-0.2-1.4-0.6C4.2,21,4,20.5,4,20L4,4c0-0.5,0.2-1,0.6-1.4C5,2.2,5.5,2,6,2H14z M16,16v-2H8v2H16z M13,9h5.5L13,3.5V9z" />
    </SvgIcon>
  );
};

DocumentRemove.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(DocumentRemove);
