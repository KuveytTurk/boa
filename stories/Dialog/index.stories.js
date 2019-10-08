/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { DocViewer } from '@kuveytturk/boa-components/DocViewer';
import { Dialog } from '@kuveytturk/boa-components/Dialog';
import DialogFixture from './dialog';
import doc from './doc.json';
import { dialogHelperDoc } from './docs';
import Header from '../base/header';
import PropsTable from '../base/props-table';

const stories = storiesOf('Dialog', module);

stories.add('Dialog', ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={Dialog} doc={doc} />
      <PropsTable {...props} component={Dialog} doc={doc} />
    </div>
  );
});
stories.add('DialogHelper', ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <DocViewer content={dialogHelperDoc} editorType="github" />
      <DialogFixture {...props} />
      {/* <Preview {...props} component={DateTimePicker} doc={doc} />
      <PropsTable {...props} component={DateTimePicker} doc={doc} /> */}
    </div>
  );
});
