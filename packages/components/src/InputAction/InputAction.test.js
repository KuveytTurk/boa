import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { spy, useFakeTimers, stub } from 'sinon'; // eslint-disable-line
import { IconButton } from '../IconButton';
import { Input } from '../Input';
import { InputNumeric } from '../InputNumeric';
import InputAction from './InputAction';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<InputAction />', () => {
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
    const wrapper = shallow(<InputAction value="test" context={context} />);
    const input = wrapper.find(Input);
    assert.strictEqual('test', input.props().value);
  });

  it('should render InputNumeric', () => {
    const wrapper = shallow(<InputAction type="numeric" value={10} context={context} />);
    const input = wrapper.find(InputNumeric);
    assert.strictEqual(10, input.props().value);
  });

  it('should mount RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    mount(<InputAction context={newContext} />);
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = mount(<InputAction defaultValue="test" context={context} {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  describe('onBlur', () => {
    it('should no effect when input is focussed', () => {
      const onBlur = spy();
      const wrapper = mount(<InputAction context={context} onBlur={onBlur} />);
      const textField = wrapper.instance().binput.getInstance().textField;
      wrapper.find('input').simulate('blur', { relatedTarget: textField });
      assert.strictEqual(onBlur.callCount, 0);
    });

    it('should no effect when button is focussed', () => {
      const onBlur = spy();
      const wrapper = mount(
        <InputAction
          context={context}
          rightIconList={[
            { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
            { key: 'clearAction', dynamicIcon: 'Clear' },
          ]}
          defaultValue="test"
          onBlur={onBlur}
        />,
      );
      const focussedButton = wrapper.instance().refs.buttons[0];
      const relatedTarget = ReactDOM.findDOMNode(focussedButton);
      wrapper.find('input').simulate('blur', { relatedTarget });
      assert.strictEqual(onBlur.callCount, 0);
    });

    it('should no effect when prop not exists', () => {
      const wrapper = mount(<InputAction context={context} />);
      wrapper.find('input').simulate('blur');
    });
  });

  it('should setValue, getValue, resetValue', () => {
    const wrapper = mount(<InputAction context={context} defaultValue="test" />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test',
    );
    wrapper
      .instance()
      .getInstance()
      .setValue('test-new');
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test-new',
    );
    wrapper
      .instance()
      .getInstance()
      .resetValue();
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test',
    );
  });

  it('should setDisable', () => {
    const wrapper = shallow(<InputAction context={context} defaultValue="test" />);
    wrapper
      .instance()
      .getInstance()
      .setDisable(true);
    assert.strictEqual(wrapper.state().disabled, true);
  });

  describe('props:disabled', () => {
    it('should disabled', () => {
      const wrapper = shallow(<InputAction context={context} disabled />);
      assert.strictEqual(wrapper.state().disabled, true);
      assert.strictEqual(wrapper.state().inputDisabled, true);
    });

    it('should disabled', () => {
      const wrapper = shallow(<InputAction context={context} inputDisabled />);
      assert.strictEqual(wrapper.state().disabled, false);
      assert.strictEqual(wrapper.state().inputDisabled, true);
    });
  });

  describe('actions', () => {
    describe('right icons', () => {
      it('should render right icons', () => {
        mount(
          <InputAction
            context={context}
            rightIconList={[
              { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
              { key: 'clearAction', dynamicIcon: 'Clear' },
            ]}
            defaultValue="test"
          />,
        );
        // const iconButtons = wrapper.find(IconButton);
      });

      it('should render right icons without key', () => {
        mount(
          <InputAction
            context={context}
            rightIconList={[{ dynamicIcon: 'AlarmOn' }, { dynamicIcon: 'Clear' }]}
            defaultValue="test"
          />,
        );
        // const iconButtons = wrapper.find(IconButton);
      });
    });

    describe('left icons', () => {
      it('should render left icons', () => {
        mount(
          <InputAction
            context={context}
            leftIconList={[
              { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
              { key: 'clearAction', dynamicIcon: 'Clear' },
            ]}
            defaultValue="test"
          />,
        );
        // const iconButtons = wrapper.find(IconButton);
      });

      it('should render left icons without key', () => {
        mount(
          <InputAction
            context={context}
            leftIconList={[{ dynamicIcon: 'AlarmOn' }, { dynamicIcon: 'Clear' }]}
            defaultValue="test"
          />,
        );
        // const iconButtons = wrapper.find(IconButton);
      });
    });
  });

  describe('instance methods', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <InputAction
          context={context}
          rightIconList={[
            { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
            { key: 'clearAction', dynamicIcon: 'Clear' },
          ]}
          leftIconList={[
            { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
            { key: 'clearAction', dynamicIcon: 'Clear' },
          ]}
          defaultValue="test"
        />,
      );
    });

    it('should hide left icons', () => {
      wrapper
        .instance()
        .getInstance()
        .hideLeftIcons();
    });

    it('should show left icons', () => {
      wrapper
        .instance()
        .getInstance()
        .showLeftIcons();
    });

    it('should hide right icons', () => {
      wrapper
        .instance()
        .getInstance()
        .hideRightIcons();
    });

    it('should show riht icons', () => {
      wrapper
        .instance()
        .getInstance()
        .showRightIcons();
    });
  });

  describe('password', () => {
    it('should render password type', () => {
      const wrapper = mount(<InputAction context={context} type="password" />);
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().type, 'password');
    });

    it('should show password', () => {
      const wrapper = mount(<InputAction context={context} type="password" />);
      wrapper.setState({ showPassword: true });
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().type, 'text');
    });

    it('should handle password clicked', () => {
      const wrapper = mount(<InputAction context={context} type="password" />);
      const button = wrapper.find(IconButton);
      button.simulate('click');
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().type, 'text');
    });

    it('should hide righ icons', () => {
      const wrapper = mount(<InputAction context={context} type="password" hideRightIcons />);
      const button = wrapper.find(IconButton);
      assert.strictEqual(button.exists(), false);
    });
  });

  describe('numeric', () => {
    it('should render numeric type', () => {
      const wrapper = mount(<InputAction context={context} type="numeric" test />);
      const input = wrapper.find(InputNumeric);
      assert.strictEqual(input.props().test, true);
    });

    it('should render leftIconList', () => {
      const leftIconList = [
        { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
        { key: 'clearAction', dynamicIcon: 'Clear' },
      ];
      const wrapper = mount(
        <InputAction context={context} type="numeric" leftIconList={leftIconList} />,
      );
      const input = wrapper.find(InputNumeric);
      assert.strictEqual(input.props().prefixText.length, 2);
    });

    it('should render rightIcons', () => {
      const rightIconList = [
        { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
        { key: 'clearAction', dynamicIcon: 'Clear' },
      ];
      const wrapper = mount(
        <InputAction context={context} type="numeric" rightIconList={rightIconList} />,
      );
      const input = wrapper.find(InputNumeric);
      assert.strictEqual(input.props().suffixText.length, 2);
    });
  });

  it('should focus', () => {
    const wrapper = mount(<InputAction context={context} defaultValue="test" />);
    const instance = wrapper.instance();
    const inputInstance = instance.binput.getInstance();
    const focusStub = stub(inputInstance, 'focus').returns(true);
    instance.focus();
    focusStub.restore();
    assert.strictEqual(focusStub.callCount, 1);
  });

  it('should validate constraint', () => {
    const wrapper = mount(<InputAction context={context} defaultValue="test" />);
    const instance = wrapper.instance();
    const inputInstance = instance.binput.getInstance();
    const validateConstraintStub = stub(inputInstance, 'validateConstraint').returns(false);
    let result = instance.validateConstraint();
    validateConstraintStub.restore();
    assert.strictEqual(validateConstraintStub.callCount, 1);
    assert.strictEqual(result, false);
    instance.binput = undefined;
    result = instance.validateConstraint();
    assert.strictEqual(result, true);
  });

  describe('prop changes', () => {
    it('should change disabled', () => {
      const wrapper = mount(<InputAction context={context} defaultValue="test" />);
      wrapper.setProps({ disabled: true });
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().disabled, true);
    });

    it('should change value', () => {
      const wrapper = mount(<InputAction context={context} defaultValue="test" />);
      wrapper.setProps({ value: 'new-value' });
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().value, 'new-value');
    });

    it('should change inputDisabled', () => {
      const wrapper = mount(<InputAction context={context} defaultValue="test" />);
      wrapper.setProps({ inputDisabled: true });
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().disabled, true);
    });

    it('should change leftIconList', () => {
      const wrapper = mount(<InputAction context={context} defaultValue="test" />);
      wrapper.setProps({
        leftIconList: [
          { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
          { key: 'clearAction', dynamicIcon: 'Clear' },
        ],
      });
    });

    it('should change rightIconList', () => {
      const wrapper = mount(<InputAction context={context} defaultValue="test" />);
      wrapper.setProps({
        rightIconList: [
          { key: 'alarmAction', dynamicIcon: 'AlarmOn' },
          { key: 'clearAction', dynamicIcon: 'Clear' },
        ],
      });
    });
  });
});
