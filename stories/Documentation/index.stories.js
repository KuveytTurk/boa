import { storiesOf } from '@storybook/react';
import DocCode from './DocCode';
import DocNotice from './DocNotice';
import DocToc from './DocToc';
import DocViewer from './DocViewer';

const stories = storiesOf('Documentation', module);

stories.add('DocCode', DocCode);
stories.add('DocNotice', DocNotice);
stories.add('DocToc', DocToc);
stories.add('DocViewer', DocViewer);
