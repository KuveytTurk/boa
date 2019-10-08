import React from 'react';
import { assert } from 'chai';
import { spy, useFakeTimers, stub } from 'sinon'; // eslint-disable-line
import keycode from 'keycode';
import { Input } from '../Input';
import { Localization } from '@kuveytturk/boa-utils';
import InputNumeric from './InputNumeric';
import KeyboardEnum from './KeyboardEnum';
import { context, createMount } from '@kuveytturk/boa-test/utils';

describe('<InputNumeric />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render Input', () => {
    const wrapper = mount(<InputNumeric value={12} context={context} />);
    const input = wrapper.find(Input);
    assert.strictEqual('12', input.props().value);
  });

  it('should setValue, getValue, resetValue', () => {
    const wrapper = mount(<InputNumeric context={context} defaultValue={12} />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      12,
    );
    wrapper
      .instance()
      .getInstance()
      .setValue(1234);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      1234,
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
      12,
    );
  });

  describe('prop changes', () => {
    it('should change disabled', () => {
      const wrapper = mount(<InputNumeric value={12} context={context} />);
      wrapper.setProps({ disabled: true });
      const input = wrapper.find(Input);
      assert.strictEqual(input.props().disabled, true);
    });

    it('should change value to null', () => {
      const wrapper = mount(<InputNumeric value={12} context={context} />);
      wrapper.setProps({ value: null });
      assert.strictEqual(
        wrapper
          .instance()
          .getInstance()
          .getValue(),
        null,
      );
    });

    it('should change value ', () => {
      const wrapper = mount(<InputNumeric value={12} context={context} />);
      wrapper.setProps({ value: 1234 });
      assert.strictEqual(
        wrapper
          .instance()
          .getInstance()
          .getValue(),
        1234,
      );
    });

    it('should change caretPosition', () => {
      const wrapper = mount(<InputNumeric value={12345} context={context} />);
      wrapper.setProps({ caretPosition: 1 });
      const input = wrapper.find('input');
      assert.strictEqual(input.getDOMNode().selectionStart, 1);
      assert.strictEqual(input.getDOMNode().selectionEnd, 1);
    });
  });

  it('should support snapshot', () => {
    const wrapper = mount(<InputNumeric value={12} context={context} />);
    const snapshot = wrapper
      .instance()
      .getInstance()
      .getSnapshot();
    wrapper.setProps({ value: null });
    wrapper
      .instance()
      .getInstance()
      .setSnapshot(snapshot);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      12,
    );
  });

  it('should disable with instance method', () => {
    const wrapper = mount(<InputNumeric value={12} context={context} />);
    wrapper
      .instance()
      .getInstance()
      .setDisable(true);
    assert.strictEqual(wrapper.state().disabled, true);
  });

  it('should mount RTL', () => {
    const newContext = Object.assign({}, context, {
      languageId: 5,
      localization: {
        isRightToLeft: true,
      },
    });
    mount(<InputNumeric context={newContext} />);
  });

  it('should fire event callbacks', () => {
    const events = ['onChange', 'onFocus', 'onBlur', 'onKeyUp', 'onKeyDown'];
    const handlers = events.reduce((result, n) => {
      result[n] = spy();
      return result;
    }, {});

    const wrapper = mount(<InputNumeric defaultValue={1} context={context} {...handlers} />);

    events.forEach(n => {
      const event = n.charAt(2).toLowerCase() + n.slice(3);
      wrapper.find('input').simulate(event);
      assert.strictEqual(handlers[n].callCount, 1, `should have called the ${n} handler`);
    });
  });

  describe('keyboard events', () => {
    describe('modifier keys', () => {
      it('should handle copy-paste keys', () => {
        [
          { ctrlKey: true, keyCode: KeyboardEnum.KEY_C },
          { ctrlKey: true, keyCode: KeyboardEnum.KEY_V },
          { metaKey: true, keyCode: KeyboardEnum.KEY_C },
          { metaKey: true, keyCode: KeyboardEnum.KEY_V },
        ].forEach(event => {
          const onKeyDown = spy();
          const wrapper = mount(<InputNumeric context={context} onKeyDown={onKeyDown} />);
          wrapper.find('input').simulate('keyDown', event);
          const instance = wrapper.instance().getInstance();
          assert.strictEqual(instance.onKeyDownResult, true);
          assert.strictEqual(onKeyDown.callCount, 1);
        });
      });

      it('should handle user selection', () => {
        [
          { shiftKey: true, keyCode: KeyboardEnum.HOME },
          { shiftKey: true, keyCode: KeyboardEnum.END },
          { shiftKey: true, keyCode: KeyboardEnum.LEFT_ARROW },
          { shiftKey: true, keyCode: KeyboardEnum.RIGHT_ARROW },
        ].forEach(event => {
          const onKeyDown = spy();
          const wrapper = mount(<InputNumeric context={context} onKeyDown={onKeyDown} />);
          wrapper.find('input').simulate('keyDown', event);
          const instance = wrapper.instance().getInstance();
          assert.strictEqual(instance.onKeyDownResult, true);
          assert.strictEqual(onKeyDown.callCount, 1);
        });
      });

      it('should not handle another keys with modifiers', () => {
        [
          { altKey: true, keyCode: KeyboardEnum.NUMPAD_0 },
          { shiftKey: true, keyCode: KeyboardEnum.KEY_D },
          { metaKey: true, keyCode: KeyboardEnum.KEY_6 },
          { ctrlKey: true, keyCode: KeyboardEnum.SEMICOLON },
        ].forEach(event => {
          const wrapper = mount(<InputNumeric context={context} />);
          wrapper.find('input').simulate('keyDown', event);
          const instance = wrapper.instance().getInstance();
          assert.strictEqual(instance.onKeyDownResult, false);
        });
      });
    });

    describe('numeric keys', () => {
      it('should handle number', () => {
        [
          KeyboardEnum.KEY_0,
          KeyboardEnum.KEY_1,
          KeyboardEnum.KEY_2,
          KeyboardEnum.KEY_3,
          KeyboardEnum.KEY_4,
          KeyboardEnum.KEY_5,
          KeyboardEnum.KEY_6,
          KeyboardEnum.KEY_7,
          KeyboardEnum.KEY_8,
          KeyboardEnum.KEY_9,
        ].forEach(number => {
          const wrapper = mount(<InputNumeric context={context} />);
          wrapper.find('input').simulate('keyDown', { keyCode: number });
          wrapper.find('input').simulate('change', { target: { value: keycode(number) } });
          const instance = wrapper.instance().getInstance();
          assert.strictEqual(instance.onKeyDownResult, true);
          assert.strictEqual(instance.getValue(), Number(keycode(number)));
        });
      });

      it('should handle numpad numbers', () => {
        [
          KeyboardEnum.NUMPAD_0,
          KeyboardEnum.NUMPAD_1,
          KeyboardEnum.NUMPAD_2,
          KeyboardEnum.NUMPAD_3,
          KeyboardEnum.NUMPAD_4,
          KeyboardEnum.NUMPAD_5,
          KeyboardEnum.NUMPAD_6,
          KeyboardEnum.NUMPAD_7,
          KeyboardEnum.NUMPAD_8,
          KeyboardEnum.NUMPAD_9,
        ].forEach(number => {
          const wrapper = mount(<InputNumeric context={context} />);
          wrapper.find('input').simulate('keyDown', { keyCode: number });
          wrapper.find('input').simulate('change', { target: { value: keycode(number - 48) } });
          const instance = wrapper.instance().getInstance();
          assert.strictEqual(instance.onKeyDownResult, true);
          assert.strictEqual(instance.getValue(), Number(keycode(number - 48)));
        });
      });

      it('should change selected text', () => {
        const wrapper = mount(<InputNumeric context={context} />);
        const instance = wrapper.instance().getInstance();
        wrapper
          .instance()
          .getInstance()
          .setValue(111, 'D');
        const target = { selectionStart: 1, selectionEnd: 4 };
        wrapper.find('input').simulate('keyDown', { keyCode: KeyboardEnum.KEY_0, target });
        assert.strictEqual(instance.onKeyDownResult, true);
      });

      it('should not change selected text with same', () => {
        const wrapper = mount(<InputNumeric context={context} />);
        const instance = wrapper.instance().getInstance();
        wrapper
          .instance()
          .getInstance()
          .setValue(111, 'D');
        const target = { selectionStart: 1, selectionEnd: 2 };
        wrapper.find('input').simulate('keyDown', { keyCode: KeyboardEnum.KEY_1, target });
        assert.strictEqual(instance.onKeyDownResult, false);
      });

      it('should not change greater than maxValue', () => {
        const wrapper = mount(<InputNumeric context={context} maxValue={10} />);
        const instance = wrapper.instance().getInstance();
        wrapper
          .instance()
          .getInstance()
          .setValue(1, 'D');
        const target = { selectionStart: 1, selectionEnd: 2 };
        wrapper.find('input').simulate('keyDown', { keyCode: KeyboardEnum.KEY_1, target });
        assert.strictEqual(instance.onKeyDownResult, false);
      });

      it('should not change lesser than minValue', () => {
        const wrapper = mount(<InputNumeric context={context} minValue={10} />);
        const instance = wrapper.instance().getInstance();
        wrapper
          .instance()
          .getInstance()
          .setValue(1, 'D');
        const target = { selectionStart: 1, selectionEnd: 2 };
        wrapper.find('input').simulate('keyDown', { keyCode: KeyboardEnum.KEY_1, target });
        assert.strictEqual(instance.onKeyDownResult, true);
      });
    });

    it('should handle TAB, INSERT and CursorMove Keys', () => {
      [
        KeyboardEnum.TAB,
        KeyboardEnum.INSERT,
        KeyboardEnum.HOME,
        KeyboardEnum.END,
        KeyboardEnum.LEFT_ARROW,
        KeyboardEnum.RIGHT_ARROW,
      ].forEach(key => {
        const wrapper = mount(<InputNumeric context={context} />);
        const instance = wrapper.instance().getInstance();
        wrapper.find('input').simulate('keyDown', { keyCode: key });
        assert.strictEqual(instance.onKeyDownResult, true, keycode(key));
      });
    });

    describe('DELETE and BACKSPACE', () => {
      let languageId;

      before(() => {
        languageId = Localization.getLocalizationLanguage().languageId;
        Localization.changeLocalizationLanguage(2); // for english localization
      });

      after(() => {
        Localization.changeLocalizationLanguage(languageId);
      });

      it('should handle multiple delete', () => {
        [KeyboardEnum.DELETE, KeyboardEnum.BACKSPACE].forEach(key => {
          const wrapper = mount(<InputNumeric context={context} />);
          const instance = wrapper.instance().getInstance();
          instance.setValue(111, 'D');
          const target = { selectionStart: 0, selectionEnd: 2 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, true, keycode(key));
        });
      });

      it('should handle single delete', () => {
        [KeyboardEnum.DELETE, KeyboardEnum.BACKSPACE].forEach(key => {
          const wrapper = mount(<InputNumeric context={context} />);
          const instance = wrapper.instance().getInstance();
          instance.setValue(111, 'D');
          const target = { selectionStart: 1, selectionEnd: 1 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, true, keycode(key));
        });
      });

      it('should backspace not change the text if cursor at first character', () => {
        [KeyboardEnum.BACKSPACE].forEach(key => {
          const wrapper = mount(<InputNumeric context={context} />);
          const instance = wrapper.instance().getInstance();
          instance.setValue(111, 'D');
          const target = { selectionStart: 0, selectionEnd: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, false, keycode(key));
        });
      });

      it('should backspace not change if cursor at thousands delimiter character ', () => {
        [KeyboardEnum.BACKSPACE].forEach(key => {
          const wrapper = mount(<InputNumeric test context={context} />);
          const instance = wrapper.instance().getInstance();
          const getValueStub = stub(instance.binput.getInstance(), 'getValue').returns('1,000');
          const target = { selectionStart: 2, selectionEnd: 2 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          getValueStub.restore();
          assert.strictEqual(instance.onKeyDownResult, false, keycode(key));
          assert.strictEqual(wrapper.state().caretPosition, 1);
        });
      });

      it('should delete not change if cursor at thousands delimiter character ', () => {
        [KeyboardEnum.DELETE].forEach(key => {
          const wrapper = mount(<InputNumeric test context={context} />);
          const instance = wrapper.instance().getInstance();
          const getValueStub = stub(instance.binput.getInstance(), 'getValue').returns('1,000');
          const target = { selectionStart: 1, selectionEnd: 1 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          getValueStub.restore();
          assert.strictEqual(instance.onKeyDownResult, false, keycode(key));
          assert.strictEqual(wrapper.state().caretPosition, 2);
        });
      });
    });

    describe('seperator keys', () => {
      it('should add multiple seperator with PERIOD', () => {
        [KeyboardEnum.PERIOD].forEach(key => {
          const wrapper = mount(<InputNumeric format="F" context={context} />);
          const instance = wrapper.instance().getInstance();
          const getValueStub = stub(instance.binput.getInstance(), 'getValue').returns('1');
          const target = { selectionStart: 1, selectionEnd: 1 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          getValueStub.restore();
          assert.strictEqual(instance.onKeyDownResult, true, keycode(key));
        });
      });

      it('should not add multiple seperator with PERIOD', () => {
        [KeyboardEnum.PERIOD].forEach(key => {
          const wrapper = mount(<InputNumeric format="F" context={context} />);
          const instance = wrapper.instance().getInstance();
          const getValueStub = stub(instance.binput.getInstance(), 'getValue').returns('1.23');
          const target = { selectionStart: 1, selectionEnd: 1 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          getValueStub.restore();
          assert.strictEqual(instance.onKeyDownResult, false, keycode(key));
        });
      });

      describe('COMMA and DECIMAL', () => {
        let languageId;

        before(() => {
          languageId = Localization.getLocalizationLanguage().languageId;
          Localization.changeLocalizationLanguage(1);
        });

        after(() => {
          Localization.changeLocalizationLanguage(languageId);
        });

        it('should add seperator', () => {
          [KeyboardEnum.COMMA, KeyboardEnum.DECIMAL].forEach(key => {
            const wrapper = mount(<InputNumeric format="F" context={context} />);
            const instance = wrapper.instance().getInstance();
            const getValueStub = stub(instance.binput.getInstance(), 'getValue').returns('1');
            const target = { selectionStart: 1, selectionEnd: 1 };
            wrapper.find('input').simulate('keyDown', { keyCode: key, target });
            getValueStub.restore();
            assert.strictEqual(instance.onKeyDownResult, true, keycode(key));
          });
        });

        it('should not add multiple seperator', () => {
          [KeyboardEnum.COMMA, KeyboardEnum.DECIMAL].forEach(key => {
            const wrapper = mount(<InputNumeric format="F" context={context} />);
            const instance = wrapper.instance().getInstance();
            const getValueStub = stub(instance.binput.getInstance(), 'getValue').returns('1,23');
            const target = { selectionStart: 1, selectionEnd: 1 };
            wrapper.find('input').simulate('keyDown', { keyCode: key, target });
            getValueStub.restore();
            assert.strictEqual(instance.onKeyDownResult, false, keycode(key));
          });
        });
      });
    });

    describe('sign change keys', () => {
      it('should change sign to negative', () => {
        [KeyboardEnum.DASH, KeyboardEnum.SUBTRACT].forEach(key => {
          const wrapper = mount(<InputNumeric defaultValue={1} context={context} />);
          const instance = wrapper.instance().getInstance();
          const target = { selectionStart: 0, selectionEnd: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, false);
          assert.strictEqual(wrapper.instance().state.formattedValue, '-1');
          assert.strictEqual(wrapper.instance().state.caretPosition, 1);
        });
      });

      it('should change sign to positive', () => {
        [KeyboardEnum.DASH, KeyboardEnum.SUBTRACT].forEach(key => {
          const wrapper = mount(<InputNumeric defaultValue={-1} context={context} />);
          const instance = wrapper.instance().getInstance();
          const target = { selectionStart: 0, selectionEnd: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, false);
          assert.strictEqual(wrapper.instance().state.formattedValue, '1');
        });
      });

      it('should check minValue and maxValue', () => {
        [KeyboardEnum.DASH, KeyboardEnum.SUBTRACT].forEach(key => {
          let wrapper = mount(<InputNumeric minValue={1} defaultValue={1} context={context} />);
          let instance = wrapper.instance().getInstance();
          let target = { selectionStart: 0, selectionEnd: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, false);
          assert.strictEqual(wrapper.instance().state.formattedValue, '1');
          wrapper = mount(<InputNumeric maxValue={0} defaultValue={-1} context={context} />);
          instance = wrapper.instance().getInstance();
          target = { selectionStart: 0, selectionEnd: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, false);
          assert.strictEqual(wrapper.instance().state.formattedValue, '-1');
        });
      });
    });

    describe('increase decrease keys', () => {
      it('should handle UP_ARROW', () => {
        [1, 2].forEach(step => {
          const wrapper = mount(<InputNumeric context={context} defaultValue={1} step={step} />);
          const instance = wrapper.instance().getInstance();
          const target = { selectionStart: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: KeyboardEnum.UP_ARROW, target });
          assert.strictEqual(instance.onKeyDownResult, false, keycode(KeyboardEnum.UP_ARROW));
          assert.strictEqual(wrapper.state().formattedValue, (1 + step).toString());
        });
      });

      it('should handle DOWN_ARROW', () => {
        [1, 2].forEach(step => {
          const wrapper = mount(<InputNumeric context={context} defaultValue={1} step={step} />);
          const instance = wrapper.instance().getInstance();
          const target = { selectionStart: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: KeyboardEnum.DOWN_ARROW, target });
          assert.strictEqual(instance.onKeyDownResult, false, keycode(KeyboardEnum.DOWN_ARROW));
          assert.strictEqual(wrapper.state().formattedValue, (1 - step).toString());
        });
      });

      it('should check minValue and maxValue', () => {
        [KeyboardEnum.UP_ARROW, KeyboardEnum.DOWN_ARROW].forEach(key => {
          const wrapper = mount(
            <InputNumeric minValue={1} maxValue={1} defaultValue={1} context={context} />,
          );
          const instance = wrapper.instance().getInstance();
          const target = { selectionStart: 0, selectionEnd: 0 };
          wrapper.find('input').simulate('keyDown', { keyCode: key, target });
          assert.strictEqual(instance.onKeyDownResult, false);
          assert.strictEqual(wrapper.instance().state.formattedValue, '1');
        });
      });
    });

    it('should handle random key', () => {
      const onKeyDown = spy();
      const wrapper = mount(<InputNumeric context={context} onKeyDown={onKeyDown} />);
      const instance = wrapper.instance().getInstance();
      wrapper.find('input').simulate('keyDown', { keyCode: 1234567 });
      assert.strictEqual(instance.onKeyDownResult, false);
      assert.strictEqual(onKeyDown.callCount, 1);
      assert.strictEqual(onKeyDown.args[0][0].keyCode, 1234567);
    });
  });

  describe('checkNumberFormatIsValid', () => {
    let instance;
    let wrapper;
    let languageId;

    beforeEach(() => {
      wrapper = mount(<InputNumeric context={context} />);
      instance = wrapper.instance().getInstance();
      languageId = Localization.getLocalizationLanguage().languageId;
      Localization.changeLocalizationLanguage(1);
    });

    after(() => {
      Localization.changeLocalizationLanguage(languageId);
    });

    it('should valid for empty values', () => {
      assert.strictEqual(instance.checkNumberFormatIsValid(), true);
      assert.strictEqual(instance.checkNumberFormatIsValid(''), true);
      assert.strictEqual(instance.checkNumberFormatIsValid('-'), true);
    });

    it('should valid for numeric values', () => {
      assert.strictEqual(instance.checkNumberFormatIsValid(1), true);
      assert.strictEqual(instance.checkNumberFormatIsValid(1.1), true);
      assert.strictEqual(instance.checkNumberFormatIsValid(-1), true);
      assert.strictEqual(instance.checkNumberFormatIsValid(-1.1), true);
    });

    it('should not valid double delimiters', () => {
      assert.strictEqual(instance.checkNumberFormatIsValid('1..00'), false);
      assert.strictEqual(instance.checkNumberFormatIsValid('1,,00'), false);
    });

    it('should valid floats', () => {
      wrapper.setProps({ format: 'F' });
      instance = wrapper.instance().getInstance();
      assert.strictEqual(instance.checkNumberFormatIsValid('1,00'), true);
    });

    it('should not valid floats', () => {
      wrapper.setProps({ format: 'F' });
      instance = wrapper.instance().getInstance();
      assert.strictEqual(instance.checkNumberFormatIsValid('1,A0'), false);
    });
  });

  describe('onChange', () => {
    it('should change value', () => {
      const wrapper = mount(<InputNumeric context={context} />);
      const target = {
        value: '1',
        selectionStart: 0,
      };
      wrapper.find('input').simulate('change', { target });
      assert.strictEqual(wrapper.state().formattedValue, '1');
    });

    it('should not change value', () => {
      const wrapper = mount(<InputNumeric context={context} />);
      const target = {
        value: 'a',
        selectionStart: 0,
      };
      wrapper.find('input').simulate('change', { target });
      assert.strictEqual(wrapper.state().formattedValue, null);
    });
  });

  it('should focus', () => {
    const wrapper = mount(<InputNumeric defaultValue={11} context={context} />);
    const focusStub = stub(
      wrapper
        .instance()
        .getInstance()
        .binput.getInstance(),
      'focus',
    );
    wrapper
      .instance()
      .getInstance()
      .focus();
    focusStub.restore();
    assert.strictEqual(focusStub.callCount, 1);
  });

  it('should validate constraint', () => {
    const wrapper = mount(<InputNumeric defaultValue={11} context={context} />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .validateConstraint(),
      true,
    );
  });

  it('should parse float value', () => {
    const wrapper = mount(<InputNumeric format="F" context={context} />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getParsedValue(11.1),
      11.1,
    );
  });

  it('should not parse letter value', () => {
    const wrapper = mount(<InputNumeric format="F" context={context} />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getParsedValue('A'),
      null,
    );
  });

  describe('getFormattedValue', () => {
    let instance;
    let wrapper;
    let languageId;

    beforeEach(() => {
      wrapper = mount(<InputNumeric context={context} />);
      instance = wrapper.instance().getInstance();
      languageId = Localization.getLocalizationLanguage().languageId;
      Localization.changeLocalizationLanguage(1);
    });

    after(() => {
      Localization.changeLocalizationLanguage(languageId);
    });

    it('should return null for undefined values', () => {
      assert.strictEqual(instance.getFormattedValue(), null);
    });

    it('should return null for empty values', () => {
      assert.strictEqual(instance.getFormattedValue(''), '');
    });

    it('should return sign', () => {
      assert.strictEqual(instance.getFormattedValue('-'), '-');
    });

    it('should format delimiter', () => {
      wrapper.setProps({ format: 'F' });
      instance = wrapper.instance().getInstance();
      assert.strictEqual(instance.getFormattedValue('1.000'), '1000');
      assert.strictEqual(instance.getFormattedValue('1,00'), '1,00');
      assert.strictEqual(instance.getFormattedValue('1,000'), '1,00');
      assert.strictEqual(instance.getFormattedValue('1,0'), '1,00');
      assert.strictEqual(instance.getFormattedValue('1,000'), '1,00');
      wrapper.setProps({ format: '0000' });
      assert.strictEqual(instance.getFormattedValue('1000'), '1000');
    });
  });
});
