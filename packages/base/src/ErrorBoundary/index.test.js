import React, { Component } from 'react';
import { assert, expect } from 'chai';
import { stub } from 'sinon';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ErrorBoundary from '.';
import { createShallow, createMount, getTestRunner } from '@kuveytturk/boa-test/utils';

// eslint-disable-next-line
class EmptyComponent extends Component {
  constructor() {
    throw new Error('EmptyComponentError');
  }
}

describe('<ErrorBoundary />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ includeBOAcontext: false });
    mount = createMount({ includeBOAcontext: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render child when no error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>ErrorBoundaryTest</div>
      </ErrorBoundary>,
    );
    expect(wrapper.text()).contains('ErrorBoundaryTest');
  });

  it('should render error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>ErrorBoundaryTest</div>
      </ErrorBoundary>,
    );
    wrapper.setState({ hasError: true, open: true, error: { message: 'ErrorMessage' } });
    const dialog = wrapper.find(DialogTitle).shallow();
    expect(dialog.props()).to.have.property('children', 'ErrorMessage');
  });

  it('should handle close', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <div>ErrorBoundaryTest</div>
      </ErrorBoundary>,
    );
    wrapper.setState({ hasError: true, open: true, error: { message: 'ErrorMessage' } });
    wrapper.find(Button).simulate('click');
    expect(wrapper.state()).to.have.property('open', false);
  });

  describe('componentDidCatch', () => {
    let consoleErrorStub;

    before(() => {
      consoleErrorStub = stub(console, 'error');
    });

    after(() => {
      consoleErrorStub.restore();
    });

    it('should handle child component catch', () => {
      if (getTestRunner() !== 'karma') {
        const wrapper = mount(
          <ErrorBoundary>
            <EmptyComponent />
          </ErrorBoundary>,
        );
        assert.strictEqual(consoleErrorStub.callCount > 0, true);
        assert.strictEqual(wrapper.state().hasError, true);
        assert.strictEqual(wrapper.state().error.message, 'EmptyComponentError');
      }
    });
  });
});
