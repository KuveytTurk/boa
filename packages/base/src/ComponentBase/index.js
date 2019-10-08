/* eslint-disable react/no-unused-prop-types */
import { Component } from 'react';
import PropTypes from 'prop-types';
import { CHANNEL } from '@material-ui/core/styles/themeListener';
import { getMessage } from '@kuveytturk/boa-utils';
import { ComponentSize, DeviceSize } from '../enums';
import { shallowEqual } from '../helpers';

export default class ComponentBase extends Component {
  static propTypes = {
    /**
     * Defines size of the component. The ComponentSize constant is exported from enums.
     * @ignore
     */
    componentSize: PropTypes.oneOf([
      ComponentSize.LARGE,
      ComponentSize.MEDIUM,
      ComponentSize.SMALL,
      ComponentSize.XSMALL,
    ]),
    /**
     * Defines application requirements such as localization, theme, platform.
     */
    context: PropTypes.object,
    /**
     * If true, all component functionalities are disabled.
     */
    disabled: PropTypes.bool,
    /**
     * All components must have an id prop.
     */
    id: PropTypes.string,
    /**
     * @deprecated
     * @ignore
     * In the ComponentComposer, we change the visibility of the component with this prop.
     */
    isVisible: PropTypes.bool,
    /**
     * As described in componentSize prop, if one of the components takes part in the new line
     * on a card we are using this prop.
     * @ignore
     */
    newLine: PropTypes.bool,
    /**
     * The snapKey property is used to manage snapshots of the child components.
     * @ignore
     */
    snapKey: PropTypes.string,
    /**
     * In our SPA, we want to keep the state of each component when a page unmounts.
     * And when the same page mounts again, the component mounts with the snapshot prop and
     * it gets the previous state.
     * @ignore
     */
    snapshot: PropTypes.object,
    /**
     * All components must have a style prop.
     */
    style: PropTypes.object,
    /**
     * The valueConstraint is used for validations on components like limit, required, etc.
     */
    valueConstraint: PropTypes.object,
    /**
     * In the ComponentComposer, we change the visibility of the component with this prop.
     */
    visible: PropTypes.bool,
  };

  static defaultProps = {
    disabled: false,
    componentSize: ComponentSize.LARGE,
    newLine: false,
    visible: true,
  };

  static contextTypes = {
    [CHANNEL]: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    if (this.props.context && context && context[CHANNEL]) {
      this.props.context.theme = context[CHANNEL].getState();
    }
  }

  componentWillMount() {
    if (this.props.snapshot) {
      this.setSnapshot(this.props.snapshot);
    }
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.snapshot) {
      this.setSnapshot(nextProps.snapshot);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

  // eslint-disable-next-line no-unused-vars
  componentWillUpdate(nextProps, nextState) { }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) { }

  componentWillUnmount() { }

  /**
   * @returns {this}
   */
  getInstance() {
    return this;
  }

  /**
   *
   * @param {string} groupName
   * @param {string} propertyName
   * @returns {string}
   */
  getMessage(groupName, propertyName) {
    return getMessage(groupName, propertyName, this.props.context.language).Description;
  }

  /**
   *
   * @param {string} groupName
   * @param {string} propertyName
   */
  getMessageCode(groupName, propertyName) {
    return getMessage(groupName, propertyName, this.props.context.language).Code;
  }

  /**
   *
   * @param {string} childSnapKey
   * @returns {string}
   */
  getSnapKey(childSnapKey) {
    return this.props.snapKey ? `${this.props.snapKey}_${childSnapKey}` : childSnapKey;
  }

  getSnapshot() {
    return this.state;
  }

  setSnapshot(snapshot) {
    this.setState({ ...snapshot });
  }

  /**
   * @return {bool}
   */
  isMobile() {
    return this.props.context.deviceSize <= DeviceSize.SMALL;
  }

  /**
   * @returns {bool}
   */
  isMobileOrTablet() {
    return this.props.context.deviceSize <= DeviceSize.MEDIUM;
  }

  /**
   * @returns {bool}
   */
  // eslint-disable-next-line class-methods-use-this
  validateConstraint() {
    return true;
  }

  /* eslint-disable */
  render() {
    /* istanbul ignore next */
    return;
  }
  /* eslint-enable */
}
