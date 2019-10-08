import React from 'react';
import PropTypes from 'prop-types';
import { expect, assert } from 'chai';
import sinon from 'sinon';
import { ComponentBase, DeviceSize } from '..';
import { context, createShallow, createMount, serviceCallSync } from '@kuveytturk/boa-test/utils';

// eslint-disable-next-line
class EmptyComponent extends ComponentBase {
  state = {
    foo: 'EmptyComponent',
  };

  render() {
    return <div>{this.state.foo}</div>;
  }
}

describe('<ComponentBase />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount();
  });

  it('should has visible propType', () => {
    assert.strictEqual(EmptyComponent.propTypes.visible, PropTypes.bool);
  });

  it('should render', () => {
    const wrapper = shallow(<EmptyComponent />);
    expect(wrapper.text()).contains('EmptyComponent');
  });

  it('should render with snapshot prop', () => {
    const wrapper = shallow(<EmptyComponent snapshot={{ foo: 'bar' }} />);
    expect(wrapper.text()).contains('bar');
  });

  it('should handle changing snapshot prop ', () => {
    const wrapper = shallow(<EmptyComponent snapshot={{ foo: 'bar' }} />);
    wrapper.setProps({ snapshot: { foo: 'baz' } });
    const foo = wrapper
      .instance()
      .getInstance()
      .getSnapshot().foo;
    expect(foo).equals('baz');
    expect(wrapper.text()).contains('baz');
  });

  it('should assign channel theme to props.context', () => {
    const wrapper = mount(<EmptyComponent context={{ foo: 'bar' }} />);
    assert.strictEqual(wrapper.props().context.theme, context.theme);
  });

  it('should get instance', () => {
    const wrapper = shallow(<EmptyComponent context={context} />);
    assert.strictEqual(wrapper.instance(), wrapper.instance().getInstance());
  });

  it('should get messages', () => {
    const wrapper = shallow(<EmptyComponent context={context} />);
    const versions = [{ id: 1, name: 'test', ClassName: 'test', Version: 1 }];
    const messages = [
      {
        Code: 'code',
        Description: 'test',
        GroupName: 'test',
        LanguageId: 1,
        PropertyName: 'test',
      },
    ];

    // eslint-disable-next-line no-undef
    const stub = sinon.stub($, 'ajax').callsFake(request => {
      return serviceCallSync(request, versions, messages);
    });
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getMessage('test', 'test'),
      'test',
    );
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getMessageCode('test', 'test'),
      'code',
    );
    stub.restore();
  });

  it('should have validateConstraint method', () => {
    const wrapper = shallow(<EmptyComponent context={context} />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .validateConstraint(),
      true,
    );
  });

  it('should get snap key', () => {
    const wrapper = mount(<EmptyComponent snapKey="snapKey" />);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getSnapKey('child'),
      'snapKey_child',
    );
    wrapper.setProps({ snapKey: '' });
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getSnapKey('child'),
      'child',
    );
  });

  it('should check device size', () => {
    const newContext = Object.assign({}, context);
    [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
      newContext.deviceSize = size;
      const wrapper = shallow(<EmptyComponent context={newContext} />);
      if (size <= DeviceSize.SMALL) {
        expect(wrapper.instance().isMobile()).equals(true);
      } else if (size <= DeviceSize.MEDIUM) {
        expect(wrapper.instance().isMobileOrTablet()).equals(true);
      } else {
        expect(wrapper.instance().isMobile()).equals(false);
        expect(wrapper.instance().isMobileOrTablet()).equals(false);
      }
    });
  });
});
