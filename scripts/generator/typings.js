
import yargs from 'yargs';
import { generate } from 'react-dts-generator';
import readlineSync from 'readline-sync';
import AllComponents from './typings.config';

const options = yargs
  .option('input', {
    default: 'all',
    type: 'string',
  })
  .option('output', {
    default: 'console',
    type: 'string',
  }).argv;


const generateTypings = (input, typingOptions) => {
  if (input === 'Scroll' || input === 'Icon') {
    return;
  }

  generate({ input, ...typingOptions });
};

const run = () => {
  if (options.input === 'all' && options.output === 'console') {
    // eslint-disable-next-line
    const response = readlineSync.question(
      'The all of typings will re-generate. Are you sure? (Y/N): ',
    );
    if (response.toLocaleLowerCase().startsWith('y')) {
      AllComponents.forEach(item => {
        console.log('generating: ' + item.input); // eslint-disable-line
        generateTypings(item.input, item.typingOptions);
      });
    } else {
      process.exit(0);
    }
  } else if (options.input === 'all') {
    throw new Error('input not specified, use --input "packages/components/src/Button/Button.js"');
  } else {
    const cmp = AllComponents.find(x => x.alias === options.input);
    if (cmp && cmp.alias) {
      generateTypings(cmp.input, cmp.typingOptions);
    } else {
      // eslint-disable-next-line
      throw new Error('input not specified, use --input "packages/components/src/Button/Button.js"');
    }
  }
};

run();
