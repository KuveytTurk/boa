import React from 'react';
import * as Icons from './icons';
import { createMount } from '@kuveytturk/boa-test/utils';

describe('Icons', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount all icons', () => {
    Object.keys(Icons).forEach(key => {
      Object.keys(Icons[key]).forEach(subKey => {
        const RenderedIcon = Icons[key][subKey];
        mount(<RenderedIcon />);
      });
    });
  });
});
