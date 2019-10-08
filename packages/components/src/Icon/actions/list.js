/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const List = props => {
  return (
    <SvgIcon {...props}>
      <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </SvgIcon>
  );
};

List.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(List);
