import React from 'react';
import { assert } from 'chai';
import SpecialDay from './SpecialDay';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';
import { dateTimeFormat } from './dateUtils';

describe('<SpecialDay />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount({ includeBOAcontext: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a div', () => {
    const date = new Date();
    const wrapper = shallow(
      <SpecialDay context={context} DateTimeFormat={dateTimeFormat} selectedDate={date} />,
    );
    assert.strictEqual(wrapper.type(), 'div');
  });
});
