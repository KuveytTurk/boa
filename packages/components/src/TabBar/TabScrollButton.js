import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';

export const styles = theme => ({
  root: {
    color: 'inherit',
    flex: `0 0 ${theme.spacing.unit * 7}px`,
  },
});

/**
 * @ignore - internal component.
 */
function TabScrollButton(props) {
  const { classes, className: classNameProp, direction, onClick, visible, ...other } = props;

  const className = classNames(classes.root, classNameProp);

  if (!visible) {
    return <div className={className} />;
  }

  return (
    <ButtonBase className={className} onClick={onClick} tabIndex={-1} {...other}>
      {direction === 'left' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </ButtonBase>
  );
}

TabScrollButton.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Direction the button indicates.
   */
  direction: PropTypes.oneOf(['left', 'right']),
  /**
   * Callback to execute for button press.
   */
  onClick: PropTypes.func,
  /**
   * Visibility of the button.
   */
  visible: PropTypes.bool,
};

TabScrollButton.defaultProps = {
  visible: true,
};

export default withStyles(styles, { name: 'MuiTabScrollButton' })(TabScrollButton);
