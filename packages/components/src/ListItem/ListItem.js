import React from 'react';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemText from '@material-ui/core/ListItemText';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    minHeight: 36,
    paddingTop: 12,
    paddingBottom: 12,
    color: theme.boaPalette.base400,
    '&:hover': {
      background: theme.boaPalette.pri300,
    },
  },
  selected: {
    backgroundColor: theme.boaPalette.pri250,
  },
  isRTL: {
    textAlign: 'right',
  },
  gutters: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  itemTextRoot: {
    padding: 0,
  },
  itemTextPrimary: {
    fontSize: 14,
    color: theme.boaPalette.base400,
  },
  itemTextSecondary: {
    fontSize: 12,
    color: theme.boaPalette.base350,
  },
});

/**
 * ListItem BOA Component
 */
@ComponentComposer
@withStyles(styles)
class ListItem extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * If `true`, the list item will be a button (using `ButtonBase`).
     */
    button: PropTypes.bool,
    /**
     * Content of the component.
     */
    children: PropTypes.node,
    /**
     * Useful to extend the style applied to components.
     */
    classes: PropTypes.object,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The component used for the root node.
     * Either a string to use a DOM element or a component.
     * By default, it is a `li` when `button` is `false` and a `div` when `button` is `true`.
     */
    component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * The container component. Useful when a `ListItemSecondaryAction` is rendered.
     */
    ContainerComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    /**
     * Properties applied to the container element when the component
     * is used to display a `ListItemSecondaryAction`.
     */
    ContainerProps: PropTypes.object,
    /**
     * If `true`, the compact vertical padding designed for the keyboard and the mouse input is used.
     */
    dense: PropTypes.bool,
    /**
     * If `true`, left and right paddings are removed.
     */
    disableGutters: PropTypes.bool,
    /**
     * If `true`, a 1px light border is added to the bottom of the list item.
     */
    divider: PropTypes.bool,

    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    selected: PropTypes.bool,
  };

  static defaultProps = {
    ContainerComponent: 'li',
    primaryText: '',
    dense: false,
    disabled: false,
    disableGutters: false,
    divider: false,
    button: true,
    selected: false,
  };

  render() {
    const {
      classes,
      selected,
      primaryText,
      secondaryText,
      componentSize,
      newLine,
      visible,
      ...other
    } = this.props;
    const { isRightToLeft } = this.props.context.localization;
    const className = classNames(classes.root, {
      [classes.isRTL]: isRightToLeft,
      [classes.selected]: selected,
    });

    return (
      <MuiListItem
        {...other}
        classes={{
          root: className,
          gutters: classes.gutters, // MuiListItemGutters11
        }}
      >
        <MuiListItemText
          classes={{
            root: classes.itemTextRoot,
            primary: classes.itemTextPrimary,
            secondary: classes.itemTextSecondary,
          }}
          primary={primaryText}
          secondary={secondaryText}
        />
      </MuiListItem>
    );
  }
}

export default ListItem;
