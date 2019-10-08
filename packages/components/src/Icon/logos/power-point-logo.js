/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const PowerPointLogo = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path
        d="M13.26,13.92a2.1,2.1,0,0,0-1.14-.28H10.5v1.99h1.57a2.3,2.3,0,0,0,1.19-.25.809.809,0,0,0,.41-.73A.832.832,0,0,0,13.26,13.92Z"
        fill="#d24a27"
      />
      <path
        d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8Zm.24,14.21a3.669,3.669,0,0,1-2.17.55H10.5V20H9V12.5h3.08a3.491,3.491,0,0,1,2.15.59A1.85,1.85,0,0,1,15,14.64,1.82,1.82,0,0,1,14.24,16.21ZM13,9V3.5L18.5,9Z"
        fill="#d24a27"
      />
    </SvgIcon>
  );
};

PowerPointLogo.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

PowerPointLogo.defaultProps = {
  viewBox: '0 0 24 24',
};

export default PowerPointLogo;
