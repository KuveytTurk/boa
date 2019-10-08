import React from 'react';
import PropTypes from 'prop-types';

const IconComposer = IconType => {
  const IconComposerComponent = props => {
    // eslint-disable-next-line no-unused-vars
    const { context, newLine, ...otherProps } = props;
    return <IconType {...otherProps} />;
  };

  IconComposerComponent.propTypes = {
    context: PropTypes.object,
    newLine: PropTypes.bool,
  };

  return IconComposerComponent;
};

export default IconComposer;
