import React from 'react';
import sinon from 'sinon';
import { assert, expect } from 'chai';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Label } from '../Label';
import CheckBox from './CheckBox';
import { context, createShallow, createMount, getClasses } from '@kuveytturk/boa-test/utils';

describe('<CheckBox />', () => {
  let shallow;
  let mount;
  let classes;

  before(() => {
    shallow = createShallow({ untilSelector: 'CheckBox' });
    mount = createMount();
    classes = getClasses(<CheckBox context={context} label="label" />);
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a MuiCheckbox', () => {
    const wrapper = shallow(<CheckBox context={context} />);
    assert.strictEqual(wrapper.type(), MuiCheckbox);
  });

  describe('props:checked', () => {
    it('should not checked at default', () => {
      const wrapper = shallow(<CheckBox context={context} />);
      assert.strictEqual(wrapper.state().isChecked, false);
    });

    it('should checked with checked prop', () => {
      const wrapper = shallow(<CheckBox context={context} checked />);
      assert.strictEqual(wrapper.state().isChecked, true);
    });

    it('should checked with defaultChecked prop', () => {
      const wrapper = shallow(<CheckBox context={context} defaultChecked />);
      assert.strictEqual(wrapper.state().isChecked, true);
    });
  });

  describe('props:label', () => {
    it('should render MuiFormControlLabel', () => {
      const wrapper = shallow(<CheckBox context={context} label="label" />);
      assert.strictEqual(wrapper.type(), 'div');
      assert.strictEqual(wrapper.childAt(0).type(), MuiFormControlLabel);
      assert.strictEqual(wrapper.childAt(0).props().control.type, MuiCheckbox);
      assert.strictEqual(wrapper.childAt(0).props().label, 'label');
    });

    it('should render label with the label class', () => {
      const wrapper = mount(<CheckBox context={context} label="label" />);
      let label = wrapper.find('label');
      let span = label.childAt(1);
      assert.strictEqual(label.hasClass(classes.root), true);
      assert.strictEqual(span.hasClass(classes.labelLTR), true);
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      wrapper.setProps({ context: newContext });
      wrapper.update();
      label = wrapper.find('label');
      span = label.childAt(1);
      assert.strictEqual(label.hasClass(classes.root), true);
      assert.strictEqual(span.hasClass(classes.labelRTL), true);
    });

    it('should render errorText', () => {
      const wrapper = shallow(
        <CheckBox context={context} errorText="TestErrorText" errorTextVisible label="label" />,
      );
      assert.strictEqual(wrapper.childAt(1).props().text, 'TestErrorText');
    });

    it('should render errorText with RTL', () => {
      const newContext = Object.assign({}, context, {
        languageId: 5,
        localization: {
          isRightToLeft: true,
        },
      });

      const wrapper = mount(
        <CheckBox
          context={newContext}
          defaultChecked={false}
          errorText="TestErrorText"
          errorTextVisible
          label="test"
        />,
      );
      const label = wrapper.find(Label);
      assert.strictEqual(label.props().style.textAlign, 'right');
    });
  });

  it('should render custom checkedIcon', () => {
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const wrapper = mount(
      <CheckBox
        context={context}
        defaultChecked={false}
        checkedIcon={checkedIcon}
        errorTextVisible
        label="test"
      />,
    );
    const mui = wrapper.find(MuiCheckbox);
    assert.strictEqual(mui.props().checkedIcon, checkedIcon);
  });

  it('should have getValue method returns checked status', () => {
    const wrapper = shallow(<CheckBox context={context} />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      false,
    );
  });

  it('should have setValue method changes the checked status', () => {
    const wrapper = shallow(<CheckBox context={context} />);
    wrapper
      .instance()
      .getInstance()
      .setValue(true);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      true,
    );
  });

  it('should have resetValue method changes the checked status to default ', () => {
    const wrapper = shallow(<CheckBox defaultChecked={false} context={context} label="test" />);
    wrapper
      .instance()
      .getInstance()
      .setValue(true);
    wrapper
      .instance()
      .getInstance()
      .resetValue();
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      false,
    );
  });

  it('should have setDisable method change the disabled status', () => {
    const wrapper = shallow(<CheckBox context={context} label="test" />);
    wrapper
      .instance()
      .getInstance()
      .setDisable(true);
    assert.strictEqual(wrapper.state().disabled, true);
  });

  it('simulates click events (onCheck)', () => {
    const onCheck = sinon.spy();
    const wrapper = mount(
      <CheckBox onCheck={onCheck} defaultChecked={false} context={context} label="test" />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onCheck).to.have.property('callCount', 1);
  });

  it('simulates click events (onChange)', () => {
    const onChange = sinon.spy();
    const wrapper = mount(
      <CheckBox onChange={onChange} defaultChecked={false} context={context} label="test" />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).to.have.property('callCount', 1);
  });

  it('should handle checked prop changes', () => {
    const wrapper = mount(
      <CheckBox
        context={context}
        defaultChecked={false}
        errorText="ErrorText"
        errorTextVisible
        label="test"
      />,
    );
    wrapper.setProps({ checked: true });
    let mui = wrapper.find(MuiCheckbox);
    expect(mui.props().checked).to.equals(true);
    wrapper.setProps({ disabled: true });
    mui = wrapper.find(MuiCheckbox);
    expect(mui.props().disabled).to.equals(true);
    wrapper.setProps({ defaultChecked: true });
    mui = wrapper.find(MuiCheckbox);
    expect(mui.props().checked).to.equals(true);
    wrapper.setProps({ disabled: true });
    mui = wrapper.find(MuiCheckbox);
    expect(mui.props().disabled).to.equals(true);
  });

  it('should override style', () => {
    const wrapper = mount(
      <CheckBox context={context} defaultChecked={false} style={{ marginLeft: 10 }} />,
    );
    const mui = wrapper.find(MuiCheckbox);
    assert.strictEqual(mui.props().style.marginLeft, 10);
  });
});
