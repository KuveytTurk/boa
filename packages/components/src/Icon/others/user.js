/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const User = props => {
  /* eslint-disable no-unused-vars */
  const { context, ...otherProps } = props;
  /* eslint-enable no-unused-vars */
  return (
    <SvgIcon {...otherProps}>
      <defs>
        <clipPath id="clip-path">
          <circle id="SVGID" style={{ fill: 'none' }} cx="32" cy="32" r="32" />
        </clipPath>
      </defs>
      <title>user</title>
      <circle style={{ opacity: '0.48' }} cx="32" cy="32" r="32" />
      <g style={{ clipPath: 'url(#clip-path)' }}>
        <path d="M32,36.59h0A10.37,10.37,0,1,0,21.73,26.22,10.35,10.35,0,0,0,32,36.59Z" />
        <path d="M32,39.87c-7.15,0-20.62,3.74-20.62,10.91V65.33H52.67V50.78C52.67,43.61,39.1,39.87,32,39.87Z" />
      </g>
    </SvgIcon>
  );
};

User.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

User.defaultProps = {
  viewBox: '0 0 64 64',
};

export default User;
