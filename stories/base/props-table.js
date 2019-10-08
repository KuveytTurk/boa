/* eslint-disable no-useless-concat */
import React from 'react';
import PropTypes from 'prop-types';
import { DocViewer } from '@kuveytturk/boa-components/DocViewer';
import * as Utils from './utils';

export default class PropsTable extends React.Component {
  static propTypes = {
    doc: PropTypes.any,
  };

  prepareData = doc => {
    let docString = '## Props';

    if (doc.composes && doc.composes.length > 0) {
      docString += '\n';
      docString = `${docString}The ${doc.displayName} propTypes have spread attribute from: `;
      const composes = doc.composes.map(compose => {
        return `\`${Utils.parseComponent(compose)}\``;
      });
      docString = `${docString + composes.join(', ')}\n`;
    }

    const propTable = propMetaData => {
      let docTable = '';
      docTable = `${docTable}\n` + '| gray |' + '\n' + '| Name | Type  |  Default | Description |';
      docTable = `${docTable}\n` + '|---|----|----|----:|';

      Object.keys(propMetaData)
        .sort()
        .forEach(key => {
          const prop = propMetaData[key];

          if (prop.description && prop.description.includes('@ignore')) return;

          if (prop.type && prop.type.name === 'func') return;

          // eslint-disable-next-line max-len
          docTable =
            `${docTable}\n` +
            `|${Utils.getPropName(prop, key)}|${Utils.getPropType(
              prop,
            )}|${Utils.getDefaultValueForMarkdown(prop)}|${Utils.getPropDescription(prop)}|`;
        });
      return docTable;
    };

    docString += propTable(doc.props);
    if (doc.composeProps) {
      Object.keys(doc.composeProps).forEach(composeName => {
        const composeClassPath = composeName.split('/');
        const composeClass = composeClassPath[composeClassPath.length - 2];
        docString += '\n';
        docString += `## ${composeClass} Props`;
        docString += '\n';
        docString += propTable(doc.composeProps[composeName]);
      });
    }

    return docString;
  };

  render() {
    const data = this.prepareData(this.props.doc);
    return <DocViewer content={data} editorType="github" />;
  }
}
