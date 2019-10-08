/* eslint-disable max-len, react/prop-types */
import React from 'react';
import { InputAction } from '@kuveytturk/boa-components/InputAction';
import Header from '../../base/header';
import PropsTable from '../../base/props-table';
import Preview from '../../base/preview';
import doc from './doc.json';
import defaultProps from './default';

export default ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={InputAction} doc={doc} />
      <Preview
        {...props}
        defaultProps={defaultProps(props.context)}
        component={InputAction}
        doc={doc}
      />
      <PropsTable {...props} component={InputAction} doc={doc} />
    </div>
  );
};
