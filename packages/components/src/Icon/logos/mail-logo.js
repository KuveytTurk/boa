/* eslint-disable max-len, react/no-unknown-property, no-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const Logo = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path
        className="st0"
        d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M15,15.4c0,0.8-0.7,1.5-1.5,1.5
		c-0.5,0-1-0.2-1.3-0.6c-0.4,0.4-0.9,0.6-1.5,0.6c-1.2,0-2.1-1-2.1-2.1c0-1.2,1-2.1,2.1-2.1s2.1,1,2.1,2.1v0.6
		c0,0.3,0.3,0.7,0.6,0.7s0.6-0.3,0.6-0.7v-0.6c0-1.8-1.6-3.4-3.4-3.4S7.3,13,7.3,14.8s1.6,3.4,3.4,3.4h2.1V19h-2.1
    c-2.3,0-4.2-1.9-4.2-4.2s1.9-4.2,4.2-4.2s4.2,1.9,4.2,4.2V15.4z M13,9V3.5L18.5,9H13z"
        style={{ fill: '#FFCC00' }}
      />
      <path
        className="st0"
        d="M10.8,13.5c-0.7,0-1.3,0.6-1.3,1.3s0.6,1.3,1.3,1.3s1.3-0.6,1.3-1.3S11.5,13.5,10.8,13.5z"
        style={{ fill: '#FFCC00' }}
      />
    </SvgIcon>
  );
};

Logo.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

Logo.defaultProps = {
  viewBox: '0 0 24 24',
};

export default Logo;
