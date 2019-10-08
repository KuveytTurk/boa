import React from 'react';
import { expect, assert } from 'chai';
import { spy, useFakeTimers } from 'sinon'; // eslint-disable-line
import { IconButton } from '../IconButton';
import MuiInput from '@material-ui/core/Input';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiFormHelperText from '@material-ui/core/FormHelperText';
import Input from './Input';
import { context, createShallow, createMount, getClasses } from '@kuveytturk/boa-test/utils';

describe('<Input />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow();
    classes = getClasses(<Input context={context} />);
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('shuld render a div', () => {
    const wrapper = shallow(<Input context={context} />).dive();
    assert.strictEqual(wrapper.dive().name(), 'div');
  });

  it('shuld render a MuiFormControl inside the div', () => {
    const wrapper = shallow(<Input context={context} />).dive();
    const control = wrapper.dive().find(MuiFormControl);
    assert.strictEqual(control.shallow().name(), 'FormControl');
  });

  it('should render a MuiInputLabel inside the FormControl', () => {
    const wrapper = shallow(<Input floatingLabelText="test" context={context} />).dive();
    const control = wrapper.dive().find(MuiFormControl);
    const input = control.shallow().find(MuiInputLabel);
    assert.strictEqual(input.shallow().name(), 'WithFormControlContext(InputLabel)');
    assert.strictEqual(input.shallow().props().children, 'test');
  });

  it('shuld render a MuiInput inside the FormControl', () => {
    const wrapper = shallow(<Input defaultValue="test" context={context} />).dive();
    const control = wrapper.dive().find(MuiFormControl);
    const input = control.shallow().find(MuiInput);
    assert.strictEqual(input.shallow().name(), 'Input');
    assert.strictEqual(input.shallow().props().value, 'test');
  });

  it('should mount with defaultValue', () => {
    const wrapper = mount(<Input context={context} defaultValue="testDefaultValue" />);
    expect(wrapper.find('input').props().value).equals('testDefaultValue');
  });

  it('should mount with value', () => {
    const wrapper = mount(<Input context={context} value="testValue" />);
    expect(wrapper.find('input').props().value).equals('testValue');
  });

  it('should render a disabled input', () => {
    const wrapper = shallow(<Input context={context} disabled />).dive();
    const control = wrapper.dive().find(MuiFormControl);
    const input = control.shallow().find(MuiInput);
    assert.strictEqual(input.shallow().name(), 'Input');
    assert.strictEqual(input.shallow().props().disabled, true);
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = mount(<Input defaultValue="test" context={context} {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  it('should setValue, getValue, resetValue', () => {
    const wrapper = shallow(<Input context={context} defaultValue="test" />).dive();
    const input = wrapper.dive();
    assert.strictEqual(
      input
        .instance()
        .getInstance()
        .getValue(),
      'test',
    );
    input
      .instance()
      .getInstance()
      .setValue('test-new');
    assert.strictEqual(
      input
        .instance()
        .getInstance()
        .getValue(),
      'test-new',
    );
    input
      .instance()
      .getInstance()
      .resetValue();
    assert.strictEqual(
      input
        .instance()
        .getInstance()
        .getValue(),
      'test',
    );
  });

  it('should set disable', () => {
    const wrapper = shallow(<Input context={context} defaultValue="test" />).dive();
    const input = wrapper.dive();
    input
      .instance()
      .getInstance()
      .setDisable(true);
    assert.strictEqual(input.state().disabled, true);
  });

  it('should fire counter event', () => {
    const onTimerFinished = spy();
    const clock = useFakeTimers(new Date());
    mount(
      <Input onTimerFinished={onTimerFinished} context={context} timerDuration={5} showCounter />,
    );
    clock.tick(6000);
    assert.strictEqual(
      onTimerFinished.callCount,
      1,
      'should have called the onTimerFineshed handler',
    );
    clock.restore();
  });

  describe('focus', () => {
    let mountFocus;

    before(() => {
      mountFocus = createMount();
    });

    after(() => {
      mountFocus.cleanUp();
    });

    it('should focus', () => {
      const wrapper = mountFocus(<Input context={context} />);
      wrapper
        .instance()
        .getInstance()
        .focus();
      assert.strictEqual(document.activeElement, wrapper.instance().getInstance().textField);
    });
  });

  describe('props', () => {
    it('should change timerDuration', () => {
      const onTimerFinished = spy();
      const wrapper = mount(
        <Input onTimerFinished={onTimerFinished} context={context} timerDuration={3} showCounter />,
      );
      const clock = useFakeTimers(new Date());
      wrapper.setProps({ timerDuration: 10 });
      clock.tick(11000);
      assert.strictEqual(
        onTimerFinished.callCount,
        1,
        'should have called the onTimerFineshed handler',
      );
      clock.restore();
    });

    it('should change disabled', () => {
      const wrapper = mount(<Input context={context} />);
      wrapper.setProps({ disabled: true });
      const input = wrapper.find(MuiInput);
      assert.strictEqual(input.props().disabled, true);
    });

    it('should change textSelection', () => {
      const wrapper = mount(<Input value="hello" context={context} />);
      wrapper.setProps({ textSelection: { start: 1, end: 2 } });
      const input = wrapper.find('input');
      assert.strictEqual(input.getDOMNode().selectionStart, 1);
      assert.strictEqual(input.getDOMNode().selectionEnd, 2);
    });
  });

  describe('prop:clearButton', () => {
    it('should render clear buton', () => {
      const wrapper = mount(<Input context={context} value="test" showClearButton />);
      const button = wrapper.find(IconButton);
      assert.strictEqual(button.props().dynamicIcon, 'Close');
    });

    it('should clear value with onClick', () => {
      const onChange = spy();
      const wrapper = mount(
        <Input context={context} onChange={onChange} value="test" showClearButton />,
      );

      const button = wrapper.find(IconButton);
      button.simulate('click');
      assert.strictEqual(onChange.callCount, 1);
      assert.strictEqual(
        wrapper
          .instance()
          .getInstance()
          .getValue(),
        '',
      );
    });

    it('should fire onClearClick after onClick', () => {
      const onClearClick = spy();
      const wrapper = mount(
        <Input context={context} onClearClick={onClearClick} value="test" showClearButton />,
      );

      const button = wrapper.find(IconButton);
      button.simulate('click');
      assert.strictEqual(onClearClick.callCount, 1);
    });
  });

  describe('bottomRightInfoSpan', () => {
    it('should render bottomRightInfo', () => {
      const wrapper = mount(<Input context={context} bottomRightInfo="test" />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.props().style.fontSize, 11);
      assert.strictEqual(span.props().style.right, 0);
      assert.strictEqual(span.props().style.float, 'right');
      assert.strictEqual(span.childAt(0).props().children, 'test');
    });

    it('should render bottomRightInfo RTL', () => {
      const newContext = Object.assign({}, context);
      newContext.localization = { isRightToLeft: true };
      const wrapper = mount(<Input context={newContext} bottomRightInfo="test" />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.props().style.fontSize, 11);
      assert.strictEqual(span.props().style.left, 0);
      assert.strictEqual(span.props().style.float, 'left');
      assert.strictEqual(span.childAt(0).props().children, 'test');
    });

    it('should render timerDuration', () => {
      const wrapper = mount(<Input context={context} timerDuration={10} />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.childAt(0).props().children, '00:10');
    });

    it('should render timerDuration', () => {
      const wrapper = mount(<Input context={context} timerDuration={10} />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.childAt(0).props().children, '00:10');
    });

    it('should render maxLength', () => {
      const wrapper = mount(<Input context={context} maxLength={10} showCounter />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.text(), '0/10');
    });

    it('should render maskedMaxLength', () => {
      const wrapper = mount(
        <Input context={context} maxLength={10} maskedMaxLength={12} showCounter />,
      );
      const span = wrapper.find('span').first();
      assert.strictEqual(span.text(), '0/12');
    });

    describe('counterUpdate', () => {
      it('should update counter', () => {
        const wrapper = mount(<Input context={context} maxLength={10} showCounter />);
        const instance = wrapper.instance().getInstance();
        instance.counterUpdate(wrapper.props(), 'test');
        const span = wrapper
          .find('span')
          .first()
          .childAt(0);
        assert.strictEqual(span.getDOMNode().innerText.toString(), '4');
      });

      it('should update counter', () => {
        const wrapper = mount(<Input context={context} value="value" maxLength={10} showCounter />);
        const instance = wrapper.instance().getInstance();
        instance.counterUpdate(wrapper.props());
        const span = wrapper
          .find('span')
          .first()
          .childAt(0);
        assert.strictEqual(span.getDOMNode().innerText.toString(), '5');
      });

      it('should update counter disabledCounterCharacter', () => {
        const wrapper = mount(
          <Input context={context} disabledCounterCharacter=" " maxLength={10} showCounter />,
        );
        const instance = wrapper.instance().getInstance();
        instance.counterUpdate(wrapper.props(), 'test prop');
        const span = wrapper
          .find('span')
          .first()
          .childAt(0);
        assert.strictEqual(span.getDOMNode().innerText.toString(), '8');
      });
    });
  });

  describe('bottomLeftInfoSpan', () => {
    it('should render bottomLeftInfo', () => {
      const wrapper = mount(<Input context={context} bottomLeftInfo="test" />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.props().style.fontSize, 11);
      assert.strictEqual(span.props().style.left, 0);
      assert.strictEqual(span.props().style.float, 'left');
      assert.strictEqual(span.childAt(0).props().children, 'test');
    });

    it('should not render bottomLeftInfo when error exists', () => {
      const wrapper = mount(<Input context={context} bottomLeftInfo="test" errorText="error" />);
      const span = wrapper.find('span');
      assert.strictEqual(span.exists(), false);
    });

    it('should render bottomLeftInfo RTL', () => {
      const newContext = Object.assign({}, context);
      newContext.localization = { isRightToLeft: true };
      const wrapper = mount(<Input context={newContext} bottomLeftInfo="test" />);
      const span = wrapper.find('span').first();
      assert.strictEqual(span.props().style.fontSize, 11);
      assert.strictEqual(span.props().style.right, 0);
      assert.strictEqual(span.props().style.float, 'right');
      assert.strictEqual(span.childAt(0).props().children, 'test');
    });
  });

  describe('props:prefixText', () => {
    it('should render MuiInputAdornment with prefixText', () => {
      const wrapper = mount(<Input context={context} prefixText="test" />);
      const input = wrapper.find(MuiInput);
      assert.strictEqual(input.props().startAdornment.props.style.marginTop, -11);
      assert.strictEqual(input.props().startAdornment.props.style.marginRight, 0);
      assert.strictEqual(input.props().startAdornment.props.position, 'start');
    });

    it('should render MuiInputAdornment with prefixText RTL', () => {
      const newContext = Object.assign({}, context);
      newContext.localization = { isRightToLeft: true };
      const wrapper = mount(<Input context={newContext} prefixText="test" />);
      const input = wrapper.find(MuiInput);
      assert.strictEqual(input.props().startAdornment.props.style.marginTop, -11);
      assert.strictEqual(input.props().startAdornment.props.style.marginRight, -4);
      assert.strictEqual(input.props().startAdornment.props.position, 'start');
    });
  });

  describe('props:suffixText', () => {
    it('should render MuiInputAdornment with suffixText', () => {
      const wrapper = mount(<Input context={context} suffixText="test" />);
      const input = wrapper.find(MuiInput);
      assert.strictEqual(input.props().endAdornment.props.style.marginTop, -11);
      assert.strictEqual(input.props().endAdornment.props.style.marginLeft, 0);
      assert.strictEqual(input.props().endAdornment.props.position, 'end');
    });

    it('should render MuiInputAdornment with suffixText RTL', () => {
      const newContext = Object.assign({}, context);
      newContext.localization = { isRightToLeft: true };
      const wrapper = mount(<Input context={newContext} suffixText="test" />);
      const input = wrapper.find(MuiInput);
      assert.strictEqual(input.props().endAdornment.props.style.marginTop, -11);
      assert.strictEqual(input.props().endAdornment.props.style.marginLeft, -4);
      assert.strictEqual(input.props().endAdornment.props.position, 'end');
    });
  });

  it('should render validation result', () => {
    const validationResult = [{ message: 'test result' }];
    const wrapper = mount(<Input context={context} validationResult={validationResult} />);
    assert.strictEqual(
      wrapper
        .find(MuiFormHelperText)
        .first()
        .text(),
      'test result',
    );
  });

  it('should assign floating label style', () => {
    const wrapper = mount(
      <Input context={context} floatingLabelText="test" floatingLabelStyle={{ margin: 10 }} />,
    );
    const input = wrapper.find(MuiInputLabel);
    assert.strictEqual(input.props().style.margin, 10);
  });

  it('should assign disabled styles to floating label', () => {
    const wrapper = mount(<Input context={context} disabled floatingLabelText="test" />);
    const input = wrapper.find(MuiInputLabel);
    assert.strictEqual(input.props().classes.root, classes.inputLabelRootDisabled);
  });

  it('should assign value constraint styles', () => {
    const wrapper = mount(<Input context={context} valueConstraint={{ required: true }} />);
    const input = wrapper.find(MuiInput);
    assert.strictEqual(input.props().classes.underline, classes.inputUnderlineRequired);
  });

  it('should assign value constraint styles when value exists', () => {
    const wrapper = mount(
      <Input context={context} defaultValue="test" valueConstraint={{ required: true }} />,
    );
    const input = wrapper.find(MuiInput);
    assert.strictEqual(input.props().classes.underline, classes.inputUnderline);
  });
});
