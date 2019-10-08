import React, { Component } from 'react';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';
import jquery from 'jquery';
import Container from './container';

global.$ = jquery;
global.jQuery = jquery;

addDecorator((story, context) => {
  return <Container story={story} context={context} />;
});

addDecorator(
  withOptions({
    showAddonPanel: true,
    addonPanelInRight: true,
    name: 'BOA-UI',
    url: 'https://github.com/kuveytturk/boa',
    sidebarAnimations: true,
  }),
);
const req = require.context('../stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => {
    req(filename);
  });
}

configure(loadStories, module);
