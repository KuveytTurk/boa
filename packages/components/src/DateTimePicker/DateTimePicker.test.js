import React from 'react';
import { AppProvider } from '@kuveytturk/boa-base';
import DateTimePicker from './DateTimePicker';
import { IconButton } from '../IconButton';
import { context, createMount } from '@kuveytturk/boa-test/utils';
import { assert } from 'chai';

describe('<DateTimePicker />', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    const wrapper = mount(
      <AppProvider theme={context.theme}>
        <DateTimePicker context={context} />
      </AppProvider>,
    );
    const dateInput = wrapper.find('input').first();
    dateInput.simulate('focus');
  });

  it('should select day', () => {
    const wrapper = mount(
      <AppProvider theme={context.theme}>
        <DateTimePicker context={context} />
      </AppProvider>,
    );
    const dateInput = wrapper.find('input').first();
    dateInput.simulate('click');

    wrapper
      .find('button')
      .last()
      .simulate('click');
  });

  it('should validateConstraint', () => {
    const wrapper = mount(
      <DateTimePicker context={context} />,
    );
    const dateInput = wrapper.instance();
    assert.isTrue(dateInput.validateConstraint());
  });

  it('should transactional page and with suffixText', () => {
    const wrapper = mount(
      <DateTimePicker context={context} suffixText={<IconButton />} pageType={'transactional'} />,
    );
    const dateInput = wrapper.find('input').first();
    dateInput.simulate('focus');
  });

  it('should no time format', () => {
    const wrapper = mount(
      <DateTimePicker context={context} format={'DDMMYYYY'} />,
    );
    const dateInput = wrapper.find('input').first();
    dateInput.simulate('focus');
  });

  it('should time format and with fullWidth', () => {
    const wrapper = mount(
      <DateTimePicker context={context} format={'hmmss'} fullWidth />,
    );
    const dateInput = wrapper.find('input').first();
    dateInput.simulate('focus');
  });
});
