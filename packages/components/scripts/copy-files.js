/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import glob from 'glob';

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  await fse.copy(file, buildPath);
  console.log(`Copied ${file} to ${buildPath}`);
}

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = fse.readFileSync(path.join(__dirname, '../package.json'), {
    encoding: 'utf8',
  });
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
    packageData,
  );

  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    module: './index.es.js',
    private: false,
  };
  const buildPath = path.resolve(__dirname, '../build/package.json');

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${buildPath}`);

  return newPackageData;
}

async function run() {
  await Promise.all(
    ['../../README.md', '../../CHANGELOG.md', '../../LICENSE'].map(file => copyFile(file)),
  );
  await createPackageFile();
  // TypeScript
  const from = path.resolve(__dirname, '../src');
  await Promise.all([
    typescriptCopy(from, path.resolve(__dirname, '../build')),
    typescriptCopy(from, path.resolve(__dirname, '../build/es')),
  ]);
}

run();
