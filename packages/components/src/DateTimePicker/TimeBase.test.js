import React from 'react';
import { assert } from 'chai';
import TimeBase from './TimeBase';
import Calendar from './Calendar';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<TimeBase />', () => {
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
      <TimeBase
        selectedDate={date}
        context={context}
        maxValue={Calendar.defaultProps.maxDate.getFullYear()}
        minValue={Calendar.defaultProps.minDate.getFullYear()}
      />,
    );
    assert.strictEqual(wrapper.type(), 'div');
  });
});
