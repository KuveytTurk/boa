import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import keycode from 'keycode';
import { Input } from '../Input';
import { IconButton } from '../IconButton';
import InputMask from './InputMask';
import PredefinedMask from './constants';
import { context, createMount, createShallow } from '@kuveytturk/boa-test/utils';

describe('<InputMask />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render Input', () => {
    const wrapper = shallow(<InputMask mask="aa nn" value="1234" context={context} />);
    const input = wrapper.find(Input);
    assert.strictEqual(wrapper.instance().currentMask, 'aa nn');
    assert.strictEqual(input.props().value, '12 34');
  });

  it('should change value', () => {
    const wrapper = shallow(<InputMask context={context} />);
    wrapper.setProps({ value: '1234' });
    const input = wrapper.find(Input);
    assert.strictEqual(wrapper.state().value, '1234');
    assert.strictEqual(input.props().value, '12 34');
  });

  it('should change disabled', () => {
    const wrapper = shallow(<InputMask context={context} />);
    wrapper.setProps({ disabled: true });
    const input = wrapper.find(Input);
    assert.strictEqual(wrapper.state().disabled, true);
    assert.strictEqual(input.props().disabled, true);
  });

  it('should set type from PredefinedMask', () => {
    const wrapper = shallow(<InputMask context={context} />);
    Object.keys(PredefinedMask.Type).forEach(type => {
      wrapper.setProps({ type });
      assert.strictEqual(wrapper.instance().currentMask, PredefinedMask.Type[type]);
    });
  });

  it('should set mask from PredefinedMask', () => {
    const wrapper = shallow(<InputMask context={context} />);
    Object.keys(PredefinedMask.Type).forEach(type => {
      wrapper.setProps({ mask: PredefinedMask.Type[type] });
      assert.strictEqual(wrapper.instance().currentMask, PredefinedMask.Type[type]);
    });
  });

  it('should set helper text', () => {
    const wrapper = shallow(<InputMask helperText="helperText" context={context} />);
    assert.strictEqual(wrapper.instance().helperText, 'helperText');
    wrapper.setState({ focussed: true });
    const input = wrapper.find(Input);
    assert.strictEqual(input.props().helperText, 'helperText');
  });

  describe('onChange', () => {
    it('should fire onChange when value not match with mask', () => {
      const onChange = spy();
      const wrapper = shallow(<InputMask mask="aa nnn" onChange={onChange} context={context} />);
      const input = wrapper.find(Input);
      input.simulate('change', { target: { value: '1234' } });
      assert.strictEqual(onChange.callCount, 1);
      assert.strictEqual(onChange.args[0][1], '12 34');
      assert.strictEqual(onChange.args[0][2], '1234');
      assert.strictEqual(onChange.args[0][3], false);
    });

    it('should fire onChange when value  match with mask', () => {
      const onChange = spy();
      const wrapper = shallow(<InputMask mask="aa nnn" onChange={onChange} context={context} />);
      const input = wrapper.find(Input);
      input.simulate('change', { target: { value: '12345' } });
      assert.strictEqual(onChange.callCount, 1);
      assert.strictEqual(onChange.args[0][1], '12 345');
      assert.strictEqual(onChange.args[0][2], '12345');
      assert.strictEqual(onChange.args[0][3], true);
    });
  });

  describe('onClearClick', () => {
    it('should fire onClearClick after onClick', () => {
      const onClearClick = spy();
      const wrapper = mount(
        <InputMask context={context} onClearClick={onClearClick} value="test" showClearButton />,
      );
      const button = wrapper.find(IconButton);
      button.simulate('click');
      assert.strictEqual(onClearClick.callCount, 1);
    });
    it('should clear value when clear button is clicked', () => {
      const wrapper = mount(
        <InputMask context={context} value="test" showClearButton />,
      );
      const button = wrapper.find(IconButton);
      button.simulate('click');
      assert.strictEqual(wrapper.instance().getValue().value, '');
      assert.strictEqual(wrapper.instance().getValue().saltValue, '');
    });
  });

  describe('onKeyDown', () => {
    it('should handle copy', () => {
      const wrapper = shallow(<InputMask context={context} />);
      const input = wrapper.find(Input);
      input.simulate('keyDown', { key: 'c', keyCode: keycode('c'), ctrlKey: true });
      assert.strictEqual(wrapper.instance().testResult, false);
    });

    it('should handle paste', () => {
      const wrapper = shallow(<InputMask context={context} />);
      const input = wrapper.find(Input);
      input.simulate('keyDown', { key: 'c', which: keycode('c'), ctrlKey: true });
      assert.strictEqual(wrapper.instance().testResult, false);
    });

    it('should return when current value length equals to mask length', () => {
      const wrapper = shallow(<InputMask mask="nn nnn" context={context} />);
      const getValueStub = stub().returns('12 345');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: '5',
        which: keycode('5'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, false);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should allow a numeric value when mask equals "n"', () => {
      const wrapper = shallow(<InputMask mask="nn nnn" context={context} />);
      const getValueStub = stub().returns('12 34');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: '5',
        which: keycode('5'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, true);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should not allow a value other than numeric when mask equals "n"', () => {
      const wrapper = shallow(<InputMask mask="nn nnn" context={context} />);
      const getValueStub = stub().returns('12 34');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: 'a',
        which: keycode('a'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, false);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should allow a letter value when mask equals "l"', () => {
      const wrapper = shallow(<InputMask mask="ll lll" context={context} />);
      const getValueStub = stub().returns('ab cd');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: 'e',
        which: keycode('e'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, true);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should not allow a value other than letter when mask equals "l"', () => {
      const wrapper = shallow(<InputMask mask="ll lll" context={context} />);
      const getValueStub = stub().returns('ab cd');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: '1',
        which: keycode('1'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, false);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should allow all values when mask equals "a"', () => {
      const wrapper = shallow(<InputMask mask="aa aaa" context={context} />);
      const getValueStub = stub().returns('12 ab');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: 'a',
        which: keycode('a'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, true);
      assert.strictEqual(wrapper.instance().specialKey, false);

      input.simulate('keyDown', {
        key: '1',
        which: keycode('1'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, true);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should not allow unknown mask', () => {
      const wrapper = shallow(<InputMask mask="xx" context={context} />);
      const getValueStub = stub().returns('');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: 'a',
        which: keycode('a'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, false);
      assert.strictEqual(wrapper.instance().specialKey, false);
    });

    it('should fire onKeyDown prop', () => {
      const onKeyDown = spy();
      const wrapper = shallow(<InputMask onKeyDown={onKeyDown} nmask="nn nnn" context={context} />);
      const getValueStub = stub().returns('12 34');
      const getInstanceStub = stub().returns({
        getValue: getValueStub,
      });
      wrapper.instance().binput = {
        getInstance: getInstanceStub,
      };
      const input = wrapper.find(Input);
      input.simulate('keyDown', {
        key: '5',
        which: keycode('5'),
        preventDefault: () => { },
      });
      assert.strictEqual(wrapper.instance().testResult, true);
      assert.strictEqual(onKeyDown.callCount, 1);
    });
  });

  it('should get formatted value and original value', () => {
    const wrapper = shallow(<InputMask mask="aa nnn" context={context} />);
    const input = wrapper.find(Input);
    input.simulate('change', { target: { value: '1234' } });
    const instance = wrapper.instance();
    assert.strictEqual(instance.getInstance().getValue().value, '12 34');
    assert.strictEqual(instance.getInstance().getValue().saltValue, '1234');
  });

  it('should reset value', () => {
    const wrapper = shallow(<InputMask defaultValue="00 000" mask="aa nnn" context={context} />);
    const input = wrapper.find(Input);
    input.simulate('change', { target: { value: '1234' } });
    const instance = wrapper.instance();
    assert.strictEqual(instance.getInstance().getValue().value, '12 34');
    assert.strictEqual(instance.getInstance().getValue().saltValue, '1234');
    instance.getInstance().resetValue();
    assert.strictEqual(instance.getInstance().getValue().value, '00 000');
  });

  describe('onFocus', () => {
    it('should handle focus', () => {
      const wrapper = shallow(<InputMask context={context} />);
      const input = wrapper.find(Input);
      input.simulate('focus');
      assert.strictEqual(wrapper.state().focussed, true);
    });

    it('should fire onFocus', () => {
      const onFocus = spy();
      const wrapper = shallow(<InputMask onFocus={onFocus} context={context} />);
      const input = wrapper.find(Input);
      input.simulate('focus');
      assert.strictEqual(onFocus.callCount, 1);
    });

    it('should set country code when type is IBAN', () => {
      const wrapper = shallow(<InputMask type="IBAN" countryCode="TR" context={context} />);
      const input = wrapper.find(Input);
      input.simulate('focus');
      assert.strictEqual(wrapper.state().value, 'TR');
    });
  });

  describe('onBlur', () => {
    it('should handle lost focus', () => {
      const wrapper = shallow(<InputMask context={context} />);
      const input = wrapper.find(Input);
      input.simulate('blur');
      assert.strictEqual(wrapper.state().focussed, false);
    });

    it('should fire onBlur', () => {
      const onBlur = spy();
      const wrapper = shallow(<InputMask onBlur={onBlur} context={context} />);
      const input = wrapper.find(Input);
      input.simulate('blur');
      assert.strictEqual(onBlur.callCount, 1);
    });

    it('should clear country code when type is IBAN', () => {
      const wrapper = shallow(<InputMask type="IBAN" countryCode="TR" context={context} />);
      const input = wrapper.find(Input);
      input.simulate('focus');
      assert.strictEqual(wrapper.state().value, 'TR');
      input.simulate('blur');
      assert.strictEqual(wrapper.state().value, '');
    });
  });

  describe('prop: maxLength', () => {
    it('should set maxLength', () => {
      const wrapper = shallow(<InputMask maxLength={2} context={context} />);
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().maxLength, 2);
    });
  });

  describe('isCorrectFormatText', () => {
    let instance;

    before(() => {
      const wrapper = shallow(<InputMask mask="nn aa" context={context} />);
      instance = wrapper.instance();
    });

    it('should allow numbers', () => {
      const result = instance.isCorrectFormatText('n n', '11');
      assert.strictEqual(instance.isCorrectFormat, true);
      assert.strictEqual(result.value, '1 1');
      assert.strictEqual(result.saltValue, '11');
    });

    it('should allow letters', () => {
      const result = instance.isCorrectFormatText('l l', 'aa');
      assert.strictEqual(instance.isCorrectFormat, true);
      assert.strictEqual(result.value, 'a a');
      assert.strictEqual(result.saltValue, 'aa');
    });

    it('should allow all', () => {
      const result = instance.isCorrectFormatText('a a', '1a');
      assert.strictEqual(instance.isCorrectFormat, true);
      assert.strictEqual(result.value, '1 a');
      assert.strictEqual(result.saltValue, '1a');
    });

    it('should not allow invalid format', () => {
      const result = instance.isCorrectFormatText('a u', '1a');
      assert.strictEqual(instance.isCorrectFormat, false);
      assert.strictEqual(result.value, '1 u');
      assert.strictEqual(result.saltValue, '1');
    });
  });

  it('should generate helper text', () => {
    const wrapper = shallow(<InputMask mask="nn aa" context={context} />);
    assert.strictEqual(wrapper.instance().helperText, '## ##');
  });

  describe('force update', () => {
    it('should re-render when it has not special keys', () => {
      const wrapper = shallow(<InputMask context={context} />);
      const instance = wrapper.instance();
      spy(instance, 'forceUpdate');
      instance.specialKey = false;
      instance.runRender();
      assert.strictEqual(instance.forceUpdate.callCount, 1);
      instance.forceUpdate.restore();
    });

    it('should not re-render when it has special keys', () => {
      const wrapper = shallow(<InputMask context={context} />);
      const instance = wrapper.instance();
      spy(instance, 'forceUpdate');
      instance.specialKey = true;
      instance.runRender();
      assert.strictEqual(instance.forceUpdate.callCount, 0);
      instance.forceUpdate.restore();
    });
  });

  it('should style IBAN', () => {
    const wrapper = shallow(
      <InputMask
        type="IBAN"
        countryCode="TR"
        value="TR320010009999901234567890"
        context={context}
      />,
    );
    const input = wrapper.find(Input);
    assert.strictEqual(input.props().inputStyle.fontSize, 13);
  });
});
