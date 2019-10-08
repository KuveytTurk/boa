import React from 'react';
import ListItem from './ListItem';
import { context, createMount } from '@kuveytturk/boa-test/utils';

describe('<ListItem />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    mount(<ListItem context={context} />);
  });
});
