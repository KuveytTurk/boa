/* eslint-disable max-len, react/no-unknown-property */
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
        d="M13,9h5.5L13,3.5V9 M6,2h8l6,6v12c0,1.1-0.9,2-2,2H6c-1.1,0-2-0.9-2-2V4C4,2.9,4.9,2,6,2 M15,18v-2H6v2H15
  M18,14v-2H6v2H18z"
        style={{ fill: '#939393' }}
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
