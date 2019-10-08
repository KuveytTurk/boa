/* eslint-disable max-len, react/prop-types */
import React from 'react';
import { IconMenu } from '@kuveytturk/boa-components/IconMenu';
import Header from '../../base/header';
import PropsTable from '../../base/props-table';
import Preview from '../../base/preview';
import doc from './doc.json';
import defaultProps from './default';

export default ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={IconMenu} doc={doc} />
      <Preview {...props} component={IconMenu} doc={doc} defaultProps={defaultProps} />
      <PropsTable {...props} component={IconMenu} doc={doc} />
    </div>
  );
};
