import React from 'react';
import { assert } from 'chai';
import Label from './Label';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<Label />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a label inside div', () => {
    const wrapper = shallow(<Label context={context} text="Test" />);
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.childAt(0).type(), 'label');
    assert.strictEqual(wrapper.childAt(0).text(), 'Test');
  });

  it('should mount', () => {
    const wrapper = mount(<Label context={context} text="Test" maxWidth={50} />);
    assert.strictEqual(wrapper.text(), 'Test');
  });

  it('should handle minFontSize', () => {
    const wrapper = shallow(<Label minFontSize={15} context={context} text="Test" />);
    assert.strictEqual(wrapper.find('div').props().style.fontSize, 15);
  });

  it('should handle maxFontSize', () => {
    const wrapper = shallow(<Label maxFontSize={10} context={context} text="Test" />);
    assert.strictEqual(wrapper.find('div').props().style.fontSize, 10);
  });

  it('should handle maxWidth', () => {
    const wrapper = shallow(<Label maxWidth={10} context={context} text="Test" />);
    assert.strictEqual(wrapper.find('div').props().style.width, 10);
  });

  it('should handle textPosition', () => {
    const wrapper = shallow(<Label textPosition="center" context={context} text="Test" />);
    assert.strictEqual(wrapper.find('div').props().style.textAlign, 'center');
  });

  it('should handle RTL', () => {
    const newContext = Object.assign({}, context, {
      languageId: 5,
      localization: {
        isRightToLeft: true,
      },
    });
    const wrapper = shallow(<Label maxWidth={10} context={newContext} text="Test" />);
    assert.strictEqual(wrapper.find('div').props().style.width, 10);
    assert.strictEqual(wrapper.find('div').props().style.textAlign, 'right');
  });

  describe('offsetWidth greater then maxWidth', () => {
    it('should calculate fontSize', () => {
      const wrapper = mount(
        <Label maxWidth={10} textAlign="center" context={context} text="Test" />,
      );
      const instance = wrapper.instance().getInstance();
      instance.label = { offsetWidth: 100 };
      instance.checkLabelFontSize();
      assert.strictEqual(wrapper.state().fontSize, (12 * 10) / 100);
    });

    it('should select minFontSize', () => {
      const wrapper = mount(
        <Label maxWidth={10} minFontSize={3} textAlign="center" context={context} text="Test" />,
      );
      const instance = wrapper.instance().getInstance();
      instance.label = { offsetWidth: 100 };
      instance.checkLabelFontSize();
      assert.strictEqual(wrapper.state().fontSize, 3);
    });
  });

  it('should select maxFontSize', () => {
    const wrapper = mount(
      <Label maxWidth={1000} maxFontSize={10} textAlign="center" context={context} text="Test" />,
    );
    const instance = wrapper.instance().getInstance();
    instance.label = { offsetWidth: 1001 };
    instance.checkLabelFontSize();
    assert.strictEqual(wrapper.state().fontSize, 10);
  });
});
