import React from 'react';
import { assert } from 'chai';
import { stub } from 'sinon';
import MuiDialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { Button } from '../Button';
import Dialog from './Dialog';
import DialogHelper from './DialogHelper';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<Dialog />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ untilSelector: 'Dialog' });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a MuiDialog', () => {
    const wrapper = shallow(<Dialog context={context} open={false} showHeader={false} />);
    assert.strictEqual(wrapper.type(), MuiDialog);
  });

  it('should change open', () => {
    const wrapper = shallow(<Dialog context={context} open />);
    wrapper.setProps({ open: false });
    assert.strictEqual(wrapper.state().open, false);
    assert.strictEqual(wrapper.dive().props().open, false);
  });

  it('should change title', () => {
    const wrapper = shallow(<Dialog context={context} open />);
    wrapper.setProps({ title: 'test' });
    assert.strictEqual(wrapper.state().title, 'test');
  });

  it('should show header', () => {
    const wrapper = shallow(
      <Dialog context={context} open title="test" titleWithCloseButtonEnabled showHeader />,
    );
    let title = wrapper.dive().find(MuiDialogTitle);
    assert.strictEqual(title.childAt(0).text(), 'test');
    wrapper
      .instance()
      .getInstance()
      .setTitle('test-title');
    title = wrapper.find(MuiDialogTitle);
    assert.strictEqual(title.childAt(0).text(), 'test-title');
  });

  it('should override style', () => {
    const wrapper = shallow(
      <Dialog context={context} open={false} style={{ marginRight: 10 }} content="test" />,
    );
    const content = wrapper.find(MuiDialogContent);
    assert.strictEqual(content.props().style.marginRight, 10);
  });

  it('should show left title button', () => {
    const wrapper = shallow(
      <Dialog context={context} title="test" titleWithCloseButtonEnabled open showHeader />,
    );

    const leftButton = (
      <Button
        context={context}
        type="icon"
        style={{ width: 40, height: 40 }}
        dynamicIcon={'ArrowBack'}
        iconProperties={{ nativeColor: '#FFF' }}
      />
    );

    wrapper
      .instance()
      .getInstance()
      .setLeftTitleButton(leftButton);
    const title = wrapper.find(MuiDialogTitle);
    // double dive to child inside of a div
    assert.strictEqual(
      title
        .childAt(0)
        .childAt(0)
        .type(),
      Button,
    );
    assert.strictEqual(
      title
        .childAt(0)
        .childAt(0)
        .type(),
      Button,
    );
    assert.strictEqual(
      title
        .childAt(0)
        .childAt(0)
        .props().dynamicIcon,
      'ArrowBack',
    );
  });

  it('should change status with open method', () => {
    const wrapper = shallow(<Dialog context={context} open dialogKey="dialogKey" />);
    const clearRefs = stub(DialogHelper, 'clearRefs');
    wrapper
      .instance()
      .getInstance()
      .open(false);
    assert.strictEqual(wrapper.state().open, false);
    assert.strictEqual(clearRefs.callCount, 1);
    clearRefs.restore();
  });

  it('should handle scroll require when onEntered', () => {
    const wrapper = shallow(<Dialog context={context} open />);
    const scrollDiv = {
      offsetHeight: 10,
      scrollHeight: 15,
      style: {},
    };
    const documentStub = stub(document, 'getElementById').returns(scrollDiv);
    wrapper.find(MuiDialog).simulate('entered');
    documentStub.restore();
    assert.strictEqual(scrollDiv.style.borderBottomColor, context.theme.boaPalette.base200);
    assert.strictEqual(scrollDiv.style.borderBottomStyle, 'solid');
    assert.strictEqual(scrollDiv.style.borderBottomWidth, 1);
  });

  it('should handle scroll not require when onEntered', () => {
    const wrapper = shallow(<Dialog context={context} open />);
    const scrollDiv = {
      offsetHeight: 15,
      scrollHeight: 10,
      style: {},
    };
    const documentStub = stub(document, 'getElementById').returns(scrollDiv);
    wrapper.find(MuiDialog).simulate('entered');
    documentStub.restore();
    assert.strictEqual(scrollDiv.style.borderBottomColor, 'transparent');
  });

  it('should onEntered', () => {
    const wrapper = shallow(<Dialog context={context} open />);
    wrapper.find(MuiDialog).simulate('entered');
  });
});
