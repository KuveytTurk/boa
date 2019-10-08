/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Group = props => {
  return (
    <SvgIcon {...props}>
      <g transform="translate(-909 21064) rotate(-90)">
        <g transform="translate(21040 909)" opacity="0">
           <rect width="24" height="24" transform="translate(0 24) rotate(-90)" />
           <rect width="23" height="23" transform="translate(0.5 23.5) rotate(-90)" fill="none" />
        </g>
        <rect width="8" height="2" transform="translate(21054.553 925.002) rotate(-90)" />
        <rect width="8" height="2" transform="translate(21051.053 925.002) rotate(-90)" />
        <rect width="8" height="2" transform="translate(21047.553 925.002) rotate(-90)" />
        <path d="M21061,928v-3h-2v3h-14v-3h-2v3a2,2,0,0,0,2,2h14A2,2,0,0,0,21061,928Z" />
        <path d="M21045,917v-3h14v3h2v-3a1.993,1.993,0,0,0-1.986-2H21045a2,2,0,0,0-2,2v3Z" />
      </g>
    </SvgIcon>
  );
};

Group.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Group);
