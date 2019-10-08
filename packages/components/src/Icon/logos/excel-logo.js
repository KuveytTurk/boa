/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const ExcelLogo = props => {
  // eslint-disable-next-line no-unused-vars
  const { context, ...otherProps } = props;
  return (
    <SvgIcon {...otherProps}>
      <path
        d="M6,2A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8L14,2Z"
        style={{ fill: '#1f6b41' }}
      />
      <path
        d="M12,15.56,13.79,13h1.63l-2.67,3.46L15.5,20H13.89L12,17.38,10.12,20H8.5l2.75-3.54L8.58,13H10.2Z"
        style={{ fill: '#fff' }}
      />
      <polygon points="13 9 13 3.5 18.5 9 13 9" style={{ fill: '#fff' }} />
    </SvgIcon>
  );
};

ExcelLogo.propTypes = {
  context: PropTypes.object,
  viewBox: PropTypes.string,
};

ExcelLogo.defaultProps = {
  viewBox: '0 0 24 24',
};

export default ExcelLogo;
