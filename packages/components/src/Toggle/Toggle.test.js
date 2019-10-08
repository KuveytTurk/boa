import React from 'react';
import { spy } from 'sinon';
import { assert, expect } from 'chai';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as SvgIcons from '@material-ui/icons';
import Switch from '@material-ui/core/Switch';
import { Label } from '../Label';
import Toggle from './Toggle';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<Toggle />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render FormControlLabel', () => {
    const wrapper = shallow(<Toggle context={context} />);
    const formControl = wrapper.dive().find(FormControlLabel);
    assert.strictEqual(formControl.props().control.type, Switch);
  });

  it('should render errorText', () => {
    const wrapper = shallow(<Toggle errorText="errorText" context={context} />);
    const label = wrapper.dive().find(Label);
    assert.strictEqual(label.props().text, 'errorText');
  });

  it('should render informationText', () => {
    const wrapper = shallow(<Toggle informationText="informationText" context={context} />);
    const label = wrapper.dive().find(Label);
    assert.strictEqual(label.props().text, 'informationText');
  });

  it('should render icon', () => {
    const wrapper = shallow(<Toggle dynamicIcon="Home" context={context} />);
    const icon = wrapper.dive().find(SvgIcons.Home);
    assert.strictEqual(icon.props().style.width, 20);
    assert.strictEqual(icon.props().style.marginRight, 10);
    assert.strictEqual(icon.props().style.disabled, false);
  });

  it('should change disabled', () => {
    const wrapper = shallow(<Toggle dynamicIcon="Home" context={context} />).dive();
    wrapper.setProps({ disabled: true });
    const formControl = wrapper.find(FormControlLabel);
    const icon = wrapper.find(SvgIcons.Home);
    assert.strictEqual(formControl.props().control.props.disabled, true);
    assert.strictEqual(icon.props().style.width, 20);
    assert.strictEqual(icon.props().style.disabled, true);
  });

  it('should change toggled', () => {
    const wrapper = shallow(<Toggle dynamicIcon="Home" context={context} />).dive();
    wrapper.setProps({ toggled: true });
    const formControl = wrapper.find(FormControlLabel);
    assert.strictEqual(formControl.props().control.props.checked, true);
  });

  it('should mount', () => {
    mount(<Toggle context={context} />);
  });

  it('simulates click events (onToggle)', () => {
    const onToggle = spy();
    const wrapper = mount(
      <Toggle onToggle={onToggle} defaultChecked={false} context={context} label="test" />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onToggle).to.have.property('callCount', 1);
  });

  it('simulates click events (onChange)', () => {
    const onChange = spy();
    const wrapper = mount(
      <Toggle onChange={onChange} defaultChecked={false} context={context} label="test" />,
    );
    wrapper.find('input').simulate('change', { target: { checked: true } });
    expect(onChange).to.have.property('callCount', 1);
  });

  it('should setValue, getValue, resetValue', () => {
    const wrapper = shallow(<Toggle context={context} />);
    const input = wrapper.dive();
    assert.strictEqual(
      input
        .instance()
        .getInstance()
        .getValue(),
      false,
    );
    input
      .instance()
      .getInstance()
      .setValue(true);
    assert.strictEqual(
      input
        .instance()
        .getInstance()
        .getValue(),
      true,
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
      false,
    );
  });

  describe('RTL', () => {
    const newContext = Object.assign({}, context, {
      languageId: 5,
      localization: {
        isRightToLeft: true,
      },
    });

    it('should align errorText to right', () => {
      const wrapper = shallow(<Toggle errorText="errorText" context={newContext} />);
      const label = wrapper.dive().find(Label);
      assert.strictEqual(label.props().style.textAlign, 'right');
    });

    it('should icon margin from left ', () => {
      const wrapper = shallow(<Toggle dynamicIcon="Home" context={newContext} />);
      const icon = wrapper.dive().find(SvgIcons.Home);
      assert.strictEqual(icon.props().style.width, 20);
      assert.strictEqual(icon.props().style.marginLeft, 10);
    });
  });
});
