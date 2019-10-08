/* eslint-disable max-len */
import React from 'react';
import { InputMask } from '@kuveytturk/boa-components/InputMask';
import Header from '../../base/header';
import PropsTable from '../../base/props-table';
import Preview from '../../base/preview';
import doc from './doc.json';

// eslint-disable-next-line
export default ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={InputMask} doc={doc} />
      <Preview {...props} component={InputMask} doc={doc} />
      <PropsTable {...props} component={InputMask} doc={doc} />
    </div>
  );
};
