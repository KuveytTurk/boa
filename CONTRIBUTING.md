# Contributing
We are really glad you are reading this, because BOA is a community project. There are multiple ways you can contribute and be a part of the BOA.

## Reporting an Issue
If you have found what you believe to be an issue please feel free open an issue on the [Issues](https://github.com/kuveytturk/boa/issues). When you are creating a new issue please make sure you can explain the issue with a reproducible test case.

## Submitting a pull request

Pull requests are always welcome, but, before working on a large change, it is best to open an issue first to discuss it with the maintainers.

## Getting started

Please create a new branch from an up to date master on your fork. 

1. Fork the boa repository on GitHub.
2. Clone your fork to your local machine with `git clone https://github.com/<yourname>/boa.git`.
3. Create a branch with `git checkout -b my-topic-branch`.
4. Make your changes, lint, then push to GitHub with `git push --set-upstream origin my-topic-branch`.
5. Visit GitHub and make your pull request.


If you have an existing local repository, please update it before you start, to minimize the chance of merge conflicts.

```sh
git remote add upstream https://github.com/kuveytturk/boa.git
git checkout master
git pull upstream master
git checkout -b my-topic-branch
yarn
```

### Building locally

To use the provided build scripts with yarn you have to [install `yarn`](https://yarnpkg.com/lang/en/docs/install/). Depending on the package you want to build, just run `yarn workspace @kuveytturk/boa-PACKAGE build`.

```sh
## start storybook
yarn start
## build base
yarn workspace @kuveytturk/boa-base build
## build components
yarn workspace @kuveytturk/boa-components build
## build utils
yarn workspace @kuveytturk/boa-utils build
```

### Coding style

Please follow the coding style of the project. BOA uses eslint, so if possible, enable linting in your editor to get real-time feedback. The linting rules can be run manually with the following command `yarn lint`.

### Running Storybook

We are using [storybook](https://storybook.js.org/) as the component catalog. To start stroybook, run:
```sh 
yarn start
```

#### Writing stories

Stories are located in the ***stories*** folder. The [storybook guideline](https://storybook.js.org/basics/writing-stories/) is a good start point to write stories. Also, we have some components that provide convenience to create stories. [Header](stories/base/header.js), [Preview](stories/base/preview.js), [PropsTable](stories/base/props-table.js) components can help you to write a story. Each component requires a [react-docgen's](https://github.com/reactjs/react-docgen) output. We can provide a script to generate required *doc.json*. For example, create doc.json for Button.js:

```sh
yarn generate:doc --input Button
```

Please review ***stories*** folder before writing a new story.


### Testing

To run unit tests with mocha on node.js:

```sh
yarn test:unit
```

Code coverage:
```sh
yarn test:coverage:html
```

To run unit test with karma on real browser:

```sh
yarn test:karma
```
