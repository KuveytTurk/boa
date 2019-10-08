/* eslint-disable max-len */
import React from 'react';
import { DocToc } from '@kuveytturk/boa-components/DocToc';
import Header from '../../base/header';
import PropsTable from '../../base/props-table';
import Preview from '../../base/preview';
import doc from './doc.json';
import defaultProps from './default';

// eslint-disable-next-line
export default ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={DocToc} doc={doc} />
      <Preview {...props} component={DocToc} doc={doc} defaultProps={defaultProps} />
      <PropsTable {...props} component={DocToc} doc={doc} />
    </div>
  );
};
