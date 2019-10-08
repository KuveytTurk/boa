/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const KTLogoWhite = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path
        fill={'white'}
        d="M40,0a40,40,0,1,0,0,80h.12a40.36,40.36,0,0,1-4.41-.24l13-7.68-2.48,7.44A40,40,0,0,0,40,0ZM61.12,18.59l12.53,7.54H67.37a12.66,12.66,0,0,0-7,2.35l-18.83,12,11.16-20A6,6,0,0,1,61.12,18.59ZM48.7,58.13l-2,6-6.39,4.32-3.9-2.87ZM34.32,64.81l-2.64-6.58,6.46,4ZM40,61.54l-6.23-3.78-2.14-6.22,12.5,7.18Zm-8.5-17.2,6.77,4.09-4,2.86ZM36.26,52l12.45-7.49L46.46,50.9l-6.07,3.67Zm4-4.05-4.37-3.11h8.31ZM32.31,12.67,40,2.59l7.69,10.08c1,1.32.79,2.68.27,4.25-1.27,3.86-8,23.18-8,23.18s-6.69-19.32-8-23.18C31.52,15.34,31.31,14,32.31,12.67ZM18.89,18.59a6,6,0,0,1,8.39,1.95l11.16,20-18.83-12a12.66,12.66,0,0,0-7-2.35H6.35ZM2.14,42.31l4-5c3.3-4.08,6.28-8,15.3-3.33l16.17,8.32ZM34.07,78.41,31.41,72,38.1,75.9Zm6.16-3.36-6.44-3.61L31.58,65.1,44,72.63Zm6-3.54-4-2.64,6.61-4.1Zm0-13.37-4-2.63,6.61-4.1ZM42.36,42.31,58.53,34c9-4.64,12-.75,15.3,3.33l4,5Z"
      />
    </SvgIcon>
  );
};

KTLogoWhite.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

KTLogoWhite.defaultProps = {
  viewBox: '0 0 80 80',
};

export default KTLogoWhite;
