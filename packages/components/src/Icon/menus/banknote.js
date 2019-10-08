/* eslint-disable max-len */
import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import IconComposer from '../IconComposer';

const Banknote = props => {
  return (
    <SvgIcon {...props}>
      <g>
        <path d="M1,9h2v9h15v2H3c-1.1,0-2-0.9-2-2V9z" />
        <g>
          <circle cx="14" cy="10" r="2.5" />
          <path
            d="M20.9,4H20H8H7.1H5v2.1V7v6v1v2h2.1l0,0H21l0,0h2v-2.1V13V7V6.1V4H20.9z M19,14H9c0-1.1-0.9-2-2-2V8c1.1,0,2-0.9,2-2h10
            c0,1.1,0.9,2,2,2v4C19.9,12,19,12.9,19,14z"
          />
        </g>
      </g>
    </SvgIcon>
  );
};

Banknote.defaultProps = {
  viewBox: '0 0 24 24',
};

export default IconComposer(Banknote);
