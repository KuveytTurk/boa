/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { CheckBox } from '@kuveytturk/boa-components/CheckBox';
import Header from '../base/header';
import PropsTable from '../base/props-table';
import Preview from '../base/preview';
import doc from './doc.json';
import defaultProps from './default';

const stories = storiesOf('CheckBox', module);

stories.add('CheckBox', ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={CheckBox} doc={doc} />
      <Preview {...props} component={CheckBox} doc={doc} defaultProps={defaultProps} />
      <PropsTable {...props} component={CheckBox} doc={doc} />
    </div>
  );
});
