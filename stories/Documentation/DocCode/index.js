/* eslint-disable max-len */
import React from 'react';
import { DocCode } from '@kuveytturk/boa-components/DocCode';
import Header from '../../base/header';
import PropsTable from '../../base/props-table';
import Preview from '../../base/preview';
import doc from './doc.json';

// eslint-disable-next-line
export default ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={DocCode} doc={doc} />
      <Preview {...props} component={DocCode} doc={doc} />
      <PropsTable {...props} component={DocCode} doc={doc} />
    </div>
  );
};
