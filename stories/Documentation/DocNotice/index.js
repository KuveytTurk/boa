/* eslint-disable max-len */
import React from 'react';
import { DocNotice } from '@kuveytturk/boa-components/DocNotice';
import Header from '../../base/header';
import PropsTable from '../../base/props-table';
import Preview from '../../base/preview';
import doc from './doc.json';
import defaultProps from './default';

// eslint-disable-next-line
export default ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={DocNotice} doc={doc} />
      <Preview {...props} component={DocNotice} doc={doc} defaultProps={defaultProps} />
      <PropsTable {...props} component={DocNotice} doc={doc} />
    </div>
  );
};
