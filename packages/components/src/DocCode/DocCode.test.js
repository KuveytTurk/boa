import React from 'react';
import chai from 'chai';
import DocCode from './DocCode';
import { createMount } from '@kuveytturk/boa-test/utils';

describe('<DocCode />', () => {
  let mount;

  before(() => {
    mount = createMount();
    chai.should();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    const wrapper = mount(<DocCode content="console.log('Hello world');" />);
    const className = wrapper.getDOMNode().querySelector('code').className;
    className.should.be.equals('hljs');
  });

  it('should mount with lang', () => {
    const wrapper = mount(<DocCode content="console.log('Hello world');" lang="js" />);
    const className = wrapper.getDOMNode().querySelector('code').className;
    className.should.be.equals('hljs');
  });

  it('should mount with highlight', () => {
    const wrapper = mount(<DocCode content="console.log('Hello world');" highlight />);
    const className = wrapper.getDOMNode().querySelector('code').className;
    className.should.be.equals('hljs');
  });

  it('should mount without highlight', () => {
    const wrapper = mount(<DocCode content="console.log('Hello world');" highlight={false} />);
    const className = wrapper.getDOMNode().querySelector('code').className;
    className.should.be.equals('hljs');
  });
});
