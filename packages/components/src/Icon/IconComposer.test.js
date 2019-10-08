import React from 'react';
import IconComposer from './IconComposer';
import * as SvgIcons from '@material-ui/icons';
import { createMount } from '@kuveytturk/boa-test/utils';

describe('<IconComposer />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    const Composer = IconComposer(SvgIcons.Home);
    mount(<Composer nativeColor="#ffffff" />);
  });
});
