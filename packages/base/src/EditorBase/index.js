import isEqual from 'lodash/isEqual';
import ComponentBase from '../ComponentBase';

export default class EditorBase extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from Input.
     */
    ...ComponentBase.propTypes,
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
  };

  validateConstraint() {
    const { valueConstraint } = this.props;
    let result = true;
    if (!valueConstraint || !this.props.visible) {
      return result;
    }

    const value = this.getValue ? this.getValue() : null;
    const newValidationResult = [];

    if (valueConstraint.required) {
      const message = this.isNullOrEmpty(value);
      /* istanbul ignore next */
      if (message) {
        newValidationResult.push({ key: 'required', message });
      }
    }

    if (valueConstraint.minLength) {
      const message = this.checkLength(value, { min: valueConstraint.minLength });
      /* istanbul ignore next */
      if (message) {
        newValidationResult.push({ key: 'minLength', message });
      }
    }

    if (valueConstraint.maxLength) {
      const message = this.checkLength(value, { max: valueConstraint.maxLength });
      /* istanbul ignore next */
      if (message) {
        newValidationResult.push({ key: 'maxLength', message });
      }
    }

    result = newValidationResult.length <= 0;

    if (
      !this.validationResult ||
      !isEqual(this.validationResult.sort(), newValidationResult.sort())
    ) {
      this.validationResult = newValidationResult;
      this.forceUpdate();
    }

    return result;
  }

  isNullOrEmpty(value) {
    if (value === null || value === undefined) {
      return this.getMessage('BOA', 'Nullable');
    }
    if (typeof value === 'string' && value.trim() === '') {
      return this.getMessage('BOA', 'Nullable');
    }
    return null;
  }

  checkLength(value, options) {
    if (!value || typeof value !== 'string' || !options) {
      return null;
    }

    const min = options.min && options.min >= 0 ? options.min : 0;
    const max = options.max && options.max >= 0 ? options.max : 0;
    const len = value.length;

    if (len < min) {
      return this.getMessage('BOA', 'MinLength').replace('{0}', min);
    }
    if (max && len > max) {
      return this.getMessage('BOA', 'MaxLength').replace('{0}', max);
    }
    return null;
  }

  /* eslint-disable */
  render() {
    /* istanbul ignore next */
    return;
  }
  /* eslint-enable */
}
