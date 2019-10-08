import React from 'react';
import { assert } from 'chai';
import { context, createShallow } from '@kuveytturk/boa-test/utils';
import Footer from './Footer';

describe('TreeView:Footer', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render children with styles', () => {
    const wrapper = shallow(<Footer context={context}>test</Footer>);
    assert.strictEqual(wrapper.type(), 'p');
    assert.strictEqual(wrapper.text(), 'test');
    assert.strictEqual(wrapper.props().style.borderColor, context.theme.boaPalette.base200);
  });
});
