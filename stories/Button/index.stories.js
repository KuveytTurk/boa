/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@kuveytturk/boa-components/Button';
import Header from '../base/header';
import PropsTable from '../base/props-table';
import Preview from '../base/preview';
import doc from './doc.json';
import defaultProps from './default';

const stories = storiesOf('Button', module);

stories.add('Button', ({ props }) => {
  return (
    <div style={{ padding: 20, background: 'white', textAlign: 'justify' }}>
      <Header {...props} component={Button} doc={doc} />
      <Preview {...props} component={Button} doc={doc} defaultProps={defaultProps} />
      <PropsTable {...props} component={Button} doc={doc} />
    </div>
  );
});
