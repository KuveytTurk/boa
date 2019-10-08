/* eslint-disable no-restricted-syntax */

import path from 'path';
import fs from 'fs';
import yargs from 'yargs';
import { parse } from 'react-docgen';
import readlineSync from 'readline-sync';
import AllComponents from './components.json';

const options = yargs
  .option('input', {
    default: 'all',
    type: 'string',
  })
  .option('output', {
    default: 'console',
    type: 'string',
  }).argv;

const repair = obj => {
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] === 'object') {
        repair(obj[property]);
      } else {
        let str = obj[property];
        if (typeof str === 'string' && str.includes('\r')) {
          obj[property] = str.split('\r').join('');
        }
        if (typeof str === 'string' && str[0] === "'" && str[str.length - 1] === "'") {
          obj[property] = str.slice(1, str.length - 1);
        } else if (typeof str === 'string' && str.startsWith('new Date(')) {
          str = str.slice(9, str.length - 1).replace(' ', '');
          const params = str.split(',');
          obj[property] = new Date(...params);
        } else {
          try {
            obj[property] = JSON.parse(str);
          } catch (err) {
            // eslint-disable
          }
        }
      }
    }
  }
};

const getFileContent = filePath => {
  return fs.readFileSync(path.join(__dirname, '..', '..', filePath), {
    encoding: 'utf8',
  });
};

const generateDocument = (input, output, composes) => {
  if (input === 'Scroll' || input === 'Icon') return;

  const fileContent = getFileContent(input);

  const componentInfo = parse(fileContent);
  const composeProps = {};
  if (composes) {
    composes.forEach(compose => {
      const composeContent = getFileContent(compose);
      composeProps[compose] = parse(composeContent).props;
    });
  }
  componentInfo.composeProps = composeProps;

  repair(componentInfo);

  if (output === 'console') {
    console.log(JSON.stringify(componentInfo, null, '\t')); // eslint-disable-line
  } else {
    fs.writeFileSync(
      path.join(__dirname, '..', '..', output),
      JSON.stringify(componentInfo, null, '\t'),
      { flag: 'w', encoding: 'utf8' },
    );
  }
};

const generate = () => {
  if (options.input === 'all' && options.output === 'console') {
    // eslint-disable-next-line
    const response = readlineSync.question(
      "The all of doc.json's will re-generate. Are you sure? (Y/N): ",
    );
    if (response.toLocaleLowerCase().startsWith('y')) {
      AllComponents.forEach(item => {
        console.log('generating: ' + item.input + ' to ' + item.output); // eslint-disable-line
        generateDocument(item.input, item.output, item.composes);
      });
    } else {
      process.exit(0);
    }
  } else if (options.input === 'all') {
    throw new Error('input not specified, use --input "packages/components/src/Button/Button.js"');
  } else {
    const cmp = AllComponents.find(x => x.alias === options.input);
    if (cmp && cmp.alias) {
      generateDocument(cmp.input, cmp.output, cmp.composes);
    } else {
      generateDocument(options.input, options.output, cmp.composes);
    }
  }
};

generate();
