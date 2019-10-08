import React from 'react';
import { expect, assert } from 'chai';
import { withStyles } from '@material-ui/core/styles';
import { ErrorBoundary, ComponentComposer } from '..';
import { createShallow, createMount } from '@kuveytturk/boa-test/utils';

// eslint disable next-line
class EmptyComponent extends React.Component {
  // eslint-disable-next-line
  foo() {
    return 'foo';
  }

  render() {
    return <div>EmptyComponent</div>;
  }
}

describe('<ComponentComposer />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ includeBOAcontext: false });
    mount = createMount({ includeBOAcontext: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should have a ErrorBoundary', () => {
    const Compose = ComponentComposer(EmptyComponent);
    const wrapper = shallow(<Compose />);
    assert.strictEqual(wrapper.type(), ErrorBoundary);
  });

  it('should have a ErrorBoundary', () => {
    const Compose = ComponentComposer(EmptyComponent);
    const wrapper = shallow(<Compose />);
    assert.strictEqual(wrapper.type(), ErrorBoundary);
  });

  it('should mount', () => {
    const Compose = ComponentComposer(EmptyComponent);
    const wrapper = mount(<Compose />);
    expect(wrapper.text()).contains('EmptyComponent');
  });

  it('should get instance equals own instance', () => {
    const Compose = ComponentComposer(EmptyComponent);
    const wrapper = mount(<Compose />);
    assert.strictEqual(wrapper.instance(), wrapper.instance().getInstance());
  });

  it('should have a displayName property', () => {
    let Compose = ComponentComposer(EmptyComponent);
    EmptyComponent.displayName = '';
    assert.strictEqual(Compose.displayName, 'ComponentComposer(EmptyComponent)');
    EmptyComponent.displayName = 'EmptyComponentDisplay';
    Compose = ComponentComposer(EmptyComponent);
    assert.strictEqual(Compose.displayName, 'ComponentComposer(EmptyComponentDisplay)');
  });

  it('should return null when not visible', () => {
    const Compose = ComponentComposer(EmptyComponent);
    const wrapper = mount(<Compose visible={false} />);
    assert.isTrue(wrapper.isEmptyRender());
  });

  it('should return null when not visible (legacy)', () => {
    const Compose = ComponentComposer(EmptyComponent);
    const wrapper = mount(<Compose isVisible={false} />);
    assert.isTrue(wrapper.isEmptyRender());
  });

  describe('withStyles components', () => {
    it('should have a innerRef', () => {
      const WithStyles = withStyles(() => {
        return 1;
      })(EmptyComponent);
      const Compose = ComponentComposer(WithStyles);
      const wrapper = mount(<Compose />);
      assert.strictEqual(wrapper.instance().innerRef.foo(), 'foo');
    });
  });
});
