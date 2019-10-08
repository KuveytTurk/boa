/* eslint-disable max-len */
import React from 'react';
import Flag from '@material-ui/icons/Flag';
import Apps from '@material-ui/icons/Apps';
import Fingerprint from '@material-ui/icons/Fingerprint';
import CloudOff from '@material-ui/icons/CloudOff';
import Nfc from '@material-ui/icons/Nfc';
import FilterVintage from '@material-ui/icons/FilterVintage';
import FlashOn from '@material-ui/icons/FlashOn';
import DoneAll from '@material-ui/icons/DoneAll';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';

const clearIcon = {
  dynamicIcon: 'Clear',
  iconProperties: { color: 'primary' },
};

const hiddenIcon = {
  dynamicIcon: 'CropFree',
  iconProperties: { color: 'primary' },
};

const sampleData = [
  {
    id: 1,
    name: 'Sample Tree Data',
    icon: <PlaylistAddCheck style={{ color: 'coral' }} />,
    isExpanded: true,
    children: [
      {
        id: 2,
        name: 'example',
        detail: 'Detay açıklama',
        icon: <Flag style={{ color: 'red' }} />,
        isExpanded: true,
        children: [
          { id: 3, name: 'app.js', isCheckable: false, icon: <Apps style={{ color: 'yellow' }} /> },
          {
            id: 4,
            name: 'data.js',
            isSelected: true,
            icon: <DoneAll style={{ color: 'deepskyblue' }} />,
          },
          { id: 5, name: 'index.js', icon: clearIcon },
          { id: 6, name: 'styles.js', icon: <CloudOff style={{ color: 'coral' }} /> },
          { id: 7, name: 'webpack.config.js', icon: <FlashOn style={{ color: 'plum' }} /> },
        ],
      },
      {
        id: 8,
        name: 'node_modules',
        loading: true,
        icon: <Fingerprint style={{ color: 'darkorchid' }} />,
      },
      {
        id: 9,
        name: 'src',
        icon: <FilterVintage style={{ color: 'green' }} />,
        children: [
          {
            id: 10,
            name: 'Example',
            icon: <Nfc style={{ color: 'coral' }} />,
            children: [{ id: 11, name: 'decorators.js' }, { id: 12, name: 'treeview.js' }],
          },
          { id: 13, name: 'index.js', icon: <FilterVintage style={{ color: 'green' }} /> },
        ],
      },
      {
        id: 14,
        name: 'themes',
        children: [
          {
            id: 15,
            name: 'animations.js',
            icon: <PlaylistAddCheck style={{ color: 'deepskyblue' }} />,
          },
          { id: 16, name: 'default.js' },
        ],
      },
      { id: 17, name: 'Gulpfile.js', icon: <Nfc style={{ color: 'coral' }} /> },
      { id: 18, name: 'index.js', icon: <PlaylistAddCheck style={{ color: 'deepskyblue' }} /> },
      { id: 19, name: 'package.json', icon: hiddenIcon, isHidden: false },
    ],
  },
];

export default sampleData;
