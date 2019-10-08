/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const AcrobatLogo = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <polygon points="13 9 13 3.5 18.5 9 13 9" fill="#fff" />
      <path
        d="M13,9h5.5L13,3.5V9M6,2h8l6,6V20a2.006,2.006,0,0,1-2,2H6a2.006,2.006,0,0,1-2-2V4A2.006,2.006,0,0,1,6,2m4.9,10.4a7.123,7.123,0,0,0,1.5,2.2l.4.3a18.447,18.447,0,0,0-3.3.9H9.4l.5-1a8.18,8.18,0,0,0,1-2.4m6.5,3.8a.908.908,0,0,0,.3-.7,1.268,1.268,0,0,0-.1-.6c-.3-.5-1-.7-2.3-.7l-1.3.2-.9-.6a5.8,5.8,0,0,1-1.6-2.6v-.1c.3-1.3.6-2.9,0-3.6a.735.735,0,0,0-.6-.2h-.2c-.4,0-.7.4-.8.8a5.3,5.3,0,0,0,.2,3.3h0A13.1,13.1,0,0,1,9,14.3L8,16.1l-.9.5a4.5,4.5,0,0,0-1.977,2.119.727.727,0,0,0-.031.332A.973.973,0,0,0,5.2,19.3c.072.127.5.3.5.3a1.682,1.682,0,0,0,.4.1c.724-.053,1.7-1,3-3.1l.2-.1a17.111,17.111,0,0,1,4-.7,7.209,7.209,0,0,0,3,.7,1.445,1.445,0,0,0,1.1-.3m-.4-.7.1.1c0,.1,0,.1-.1.1h-.2a5.367,5.367,0,0,1-1.9-.5c.1-.1.1-.1.2-.1,1.4.1,1.8.3,1.9.4M7.8,17c-.6,1.2-1.2,1.9-1.7,2a4.409,4.409,0,0,1,1.2-1.7l.5-.3m3.1-6.9A5.191,5.191,0,0,1,10.8,8l.1-.1L11,8c.2.2.2.6.1,1.1v.2l-.2.8Z"
        fill="#d30000"
      />
    </SvgIcon>
  );
};

AcrobatLogo.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

AcrobatLogo.defaultProps = {
  viewBox: '0 0 24 24',
};

export default AcrobatLogo;
