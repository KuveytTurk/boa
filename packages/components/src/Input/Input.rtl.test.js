import React from 'react';
import { spy, useFakeTimers } from 'sinon'; // eslint-disable-line
import Input from './Input';
import { context, createMount } from '@kuveytturk/boa-test/utils';

describe('<Input />', () => {
  let mount;

  before(() => {
    mount = createMount();
    context.theme.direction = 'rtl';
    context.localization = { isRightToLeft: true };
  });

  after(() => {
    context.theme.direction = 'ltr';
    context.localization = { isRightToLeft: false };
  });

  it('shuld mount', () => {
    mount(<Input context={context} />);
  });
});
