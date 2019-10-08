/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const KTLogoOnlyOriginal = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path d="M0,40A40,40,0,1,1,40,80,40,40,0,0,1,0,40" style={{ fill: '#006647' }} />
      <path
        d="M38.1,75.9l-4,2.51L31.41,72ZM31.68,58.23l6.46,4-3.82,2.59Zm-.21-13.88,6.77,4.09-4,2.86ZM42.21,55.51l6.61-4.1-2.57,6.74ZM31.58,65.1,44,72.63l-3.75,2.43-6.44-3.61Zm4.85.44L48.7,58.13l-2,6-6.39,4.32Zm-4.84-14,12.5,7.18L40,61.54l-6.23-3.78Zm4.67.43,12.45-7.49L46.46,50.9l-6.07,3.67Zm-.39-7.17h8.31l-3.95,3.11Zm6.34,24.06,6.61-4.1-2.57,6.74ZM40,40.1s-6.69-19.32-8-23.18c-.52-1.58-.74-2.93.27-4.25L40,2.59l7.69,10.08c1,1.32.79,2.68.27,4.25-1.27,3.86-8,23.18-8,23.18m37.86,2.21H42.36L58.53,34c9-4.64,12-.75,15.3,3.33ZM41.58,40.53l11.16-20a6,6,0,0,1,8.39-1.95l12.53,7.54H67.37a12.66,12.66,0,0,0-7,2.35ZM2.14,42.31l4-5c3.3-4.08,6.28-8,15.3-3.33l16.17,8.32Zm36.29-1.78-18.83-12a12.66,12.66,0,0,0-7-2.35H6.35l12.53-7.54a6,6,0,0,1,8.39,1.95ZM35.71,79.76l13-7.68-2.48,7.46a40.55,40.55,0,0,1-10.51.22"
        style={{ fill: '#b88400' }}
      />
    </SvgIcon>
  );
};

KTLogoOnlyOriginal.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

KTLogoOnlyOriginal.defaultProps = {
  viewBox: '0 0 80 80',
};

export default KTLogoOnlyOriginal;
