/* eslint-disable max-len, react/no-unknown-property */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const ImageLogo = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path
        className="st0"
        d="M14,2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8L14,2z M13,3.5L18.5,9H13V3.5z M5,19l3.5-4.5
    l2.5,3l3.5-4.5l4.5,6H5z"
        style={{ fill: '#2993CE' }}
      />
    </SvgIcon>
  );
};

ImageLogo.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

ImageLogo.defaultProps = {
  viewBox: '0 0 24 24',
};

export default ImageLogo;
