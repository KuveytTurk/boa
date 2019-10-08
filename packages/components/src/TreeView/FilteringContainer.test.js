import React from 'react';
import { InputAction } from '@kuveytturk/boa-components/InputAction';
import { assert } from 'chai';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';
import FilteringContainer from './FilteringContainer';

describe('TreeView:FilteringContainer', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  describe('props:showSearch', () => {
    it('should render search area', () => {
      const renderer = () => <div>test</div>;
      const wrapper = shallow(
        <FilteringContainer
          context={context}
          nodes={[]}
          style={{
            inputDiv: {
              margin: 10,
            },
          }}
          showSearch
          hintText="hintText"
        >
          {renderer}
        </FilteringContainer>,
      );
      const input = wrapper.find(InputAction);
      assert.strictEqual(input.props().hintText, 'hintText');
    });

    it('should not render search area', () => {
      const renderer = () => <div>test</div>;
      const wrapper = shallow(
        <FilteringContainer
          context={context}
          nodes={[]}
          style={{
            inputDiv: {
              margin: 10,
            },
          }}
          showSearch={false}
          hintText="hintText"
        >
          {renderer}
        </FilteringContainer>,
      );
      const input = wrapper.find(InputAction);
      assert.strictEqual(input.isEmptyRender(), true);
    });
  });
});
