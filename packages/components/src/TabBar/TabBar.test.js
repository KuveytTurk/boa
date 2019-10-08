import React from 'react';
// import { assert } from 'chai';
// import { spy } from 'sinon';
import TabBar from './TabBar';
import { context, createShallow } from '@kuveytturk/boa-test/utils';

describe('<TabBar />', () => {
  // let mount;
  let shallow;

  before(() => {
    // mount = createMount();
    shallow = createShallow({ dive: true });
  });

  it('should mount', () => {
    const tabItems = [
      {
        text: 'Test',
        value: 0,
        content: <div>Tab Content 1</div>,
      },
      {
        text: 'Test 2',
        value: 1,
        content: <div>Tab Content 2</div>,
      },
    ];

    shallow(
      <TabBar context={context} tabItems={tabItems} rightIconButtonVisibility value={0} />,
    ).dive();

    shallow(
      <TabBar
        context={context}
        tabItems={tabItems}
        rightIconButtonVisibility
        value={0}
        mode={'secondary'} />,
    ).dive();

    shallow(
      <TabBar context={context} tabItems={tabItems} containerType={'page'} value={0} />,
    ).dive();
    shallow(
      <TabBar context={context} tabItems={tabItems} containerType={'card'} value={0} />,
    ).dive();
    shallow(
      <TabBar context={context} tabItems={tabItems} containerType={'default'} value={0} />,
    ).dive();
  });
});
