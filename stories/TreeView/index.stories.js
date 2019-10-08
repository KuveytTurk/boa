/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { TreeView } from '@kuveytturk/boa-components/TreeView';
import Header from '../base/header';
import PropsTable from '../base/props-table';
import Preview from '../base/preview';
import doc from './doc.json';
import defaultProps from './default';

const stories = storiesOf('TreeView', module);

stories.add('TreeView', ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={TreeView} doc={doc} />
      <Preview
        {...props}
        defaultProps={defaultProps}
        component={TreeView}
        doc={doc}
        ignoreProps={['data']}
      />
      <PropsTable {...props} component={TreeView} doc={doc} />
    </div>
  );
});
