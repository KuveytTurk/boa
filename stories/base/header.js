import React from 'react';
import PropTypes from 'prop-types';
import { DocViewer } from '@kuveytturk/boa-components/DocViewer';

export default class ComponentHeader extends React.Component {
  static propTypes = {
    doc: PropTypes.any,
  };

  prepareData() {
    let doc = `# ${this.props.doc.displayName}`;
    doc = `${doc}\n${this.props.doc.description}`;

    return doc;
  }

  render() {
    const data = this.prepareData();
    return <DocViewer content={data} editorType="github" />;
  }
}
