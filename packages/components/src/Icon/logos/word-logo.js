/* eslint-disable max-len, react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const WordLogo = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path
        className="st0"
        d="M6,2C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8l-6-6H6z"
        style={{ fill: '#2D5B9F' }}
      />
      <path
        className="st1"
        d="M14.5,18.4l1.6-5.4h1.4l-2.4,7h-1.1l-2-5.3L10,20H8.9l-2.4-7h1.4l1.6,5.2l1.9-5.2h1.1L14.5,18.4z"
        style={{ fill: '#FFFFFF' }}
      />
      <polygon className="st1" points="13,9 13,3.5 18.5,9 " style={{ fill: '#FFFFFF' }} />
    </SvgIcon>
  );
};

WordLogo.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

WordLogo.defaultProps = {
  viewBox: '0 0 24 24',
};

export default WordLogo;
