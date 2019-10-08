/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const UserSquare = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <rect
        width="64"
        height="64"
        style={{ opacity: '0.47999998927116394', isolation: 'isolate' }}
      />
      <path d="M15.55,48.63A43.88,43.88,0,0,1,32,45.18a43.88,43.88,0,0,1,16.45,3.46q8.55,3.46,8.55,9V64H7V57.68Q7,52.09,15.55,48.63Z" />
      <path d="M40.82,35.18A12,12,0,0,1,32,38.86a12,12,0,0,1-8.82-3.68,12,12,0,0,1-3.68-8.82,12.27,12.27,0,0,1,3.68-8.9,12.25,12.25,0,0,1,17.64,0,12.29,12.29,0,0,1,3.68,8.9A12,12,0,0,1,40.82,35.18Z" />
    </SvgIcon>
  );
};

UserSquare.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

UserSquare.defaultProps = {
  viewBox: '0 0 64 64',
};

export default UserSquare;
