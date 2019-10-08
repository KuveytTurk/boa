/* eslint-disable max-len, react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { TabBar } from '@kuveytturk/boa-components/TabBar';
import Header from '../base/header';
import PropsTable from '../base/props-table';
import Preview from '../base/preview';
import doc from './doc.json';
import defaultProps from './default';

const stories = storiesOf('TabBar', module);

stories.add('TabBar', ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={TabBar} doc={doc} />
      <Preview {...props} component={TabBar} doc={doc} defaultProps={defaultProps} />
      <PropsTable {...props} component={TabBar} doc={doc} />
    </div>
  );
});
