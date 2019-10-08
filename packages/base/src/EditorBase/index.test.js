import React from 'react';
import { assert, expect } from 'chai';
import ComponentBase from '../ComponentBase';
import EditorBase from '.';
import { context, createShallow } from '@kuveytturk/boa-test/utils';

/* eslint-disable-next-line */
class EmptyComponent extends EditorBase {
  render() {
    return <div>{this.props.value}</div>;
  }
}

describe('<EditorBase />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should be inherit from ComponentBase', () => {
    expect(EditorBase.prototype).instanceOf(ComponentBase);
  });

  it('should have ComponentBase propTypes', () => {
    Object.keys(ComponentBase.propTypes).forEach(prop => {
      expect(EmptyComponent.propTypes).to.have.property(prop);
    });
  });

  describe('has not getValue', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<EmptyComponent context={context} />);
    });

    it('should valid when props are empty ', () => {
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, true);
    });

    it('should valid when non-visible', () => {
      wrapper.setProps({ isVisible: false });
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, true);
    });

    it('should not valid when value is required', () => {
      wrapper.setProps({
        valueConstraint: { required: true },
        isVisible: true,
      });
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, false);
    });

    it('should valid when minLength was given', () => {
      wrapper.setProps({
        valueConstraint: { minLength: 100 },
        isVisible: true,
        value: 'test',
      });
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, true);
    });

    it('should valid when maxLength was given', () => {
      wrapper.setProps({
        valueConstraint: { maxLength: 1 },
        isVisible: true,
        value: 'test',
      });
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, true);
    });
  });

  describe('has getValue method', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<EmptyComponent context={context} />);
    });

    it('should not valid when value is null and required', () => {
      const value = null;
      wrapper.setProps({
        valueConstraint: { required: true },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, false);
      const message = wrapper
        .instance()
        .getInstance()
        .getMessage('BOA', 'Nullable');
      const validationResult = wrapper.instance().getInstance().validationResult;
      expect(validationResult).to.be.include({ key: 'required', message });
    });

    it('should not valid when value is undefined and required', () => {
      const value = undefined;
      wrapper.setProps({
        valueConstraint: { required: true },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, false);
      const message = wrapper
        .instance()
        .getInstance()
        .getMessage('BOA', 'Nullable');
      const validationResult = wrapper.instance().getInstance().validationResult;
      expect(validationResult).to.be.include({ key: 'required', message });
    });

    it('should not valid when value is empty and required', () => {
      const value = ' ';
      wrapper.setProps({
        valueConstraint: { required: true },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, false);
      const message = wrapper
        .instance()
        .getInstance()
        .getMessage('BOA', 'Nullable');
      const validationResult = wrapper.instance().getInstance().validationResult;
      expect(validationResult).to.be.include({ key: 'required', message });
    });

    it('should valid when value is required', () => {
      const value = 'test';
      wrapper.setProps({
        valueConstraint: { required: true },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, true);
    });

    it('should not valid when minLength was given', () => {
      const value = 'test';
      wrapper.setProps({
        valueConstraint: { minLength: 100 },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, false);
      const message = wrapper
        .instance()
        .getInstance()
        .getMessage('BOA', 'MinLength')
        .replace('{0}', 100);
      const validationResult = wrapper.instance().getInstance().validationResult;
      expect(validationResult).to.be.include({ key: 'minLength', message });
    });

    it('should not valid when maxLength was given', () => {
      const value = 'test';
      wrapper.setProps({
        valueConstraint: { maxLength: 1 },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, false);
      const message = wrapper
        .instance()
        .getInstance()
        .getMessage('BOA', 'MaxLength')
        .replace('{0}', 1);
      const validationResult = wrapper.instance().getInstance().validationResult;
      expect(validationResult).to.be.include({ key: 'maxLength', message });
    });

    it('should valid when minLength and maxLength were given', () => {
      const value = 'test';
      wrapper.setProps({
        valueConstraint: { minLength: 1, maxLength: 10 },
        isVisible: true,
        value,
      });
      wrapper.instance().getValue = () => {
        return value;
      };
      const result = wrapper
        .instance()
        .getInstance()
        .validateConstraint();
      assert.strictEqual(result, true);
    });
  });
});
