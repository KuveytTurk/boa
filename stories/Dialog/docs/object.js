/* eslint-disable max-len */
export default `
\`\`\`js
const obj = {
  mainContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  subcontents: [
    {
      header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
    },
    {
      header: 'Sed convallis mauris in est elementum, nec accumsan ante pulvinar.',
      contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
    },
    {
      header: 'Cras in nibh eu nunc aliquam suscipit sed vitae dolor.',
      contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
    },
    {
      header: 'Etiam hendrerit metus quis vulputate finibus.',
      contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
    },
    {
      header: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
    },
    {
      header: 'Sed convallis mauris in est elementum, nec accumsan ante pulvinar.',
      contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
    },
    {
      header: 'Cras in nibh eu nunc aliquam suscipit sed vitae dolor.',
      contents: ['Phasellus', 'Donec', 'Fusce aliquet'],
    },
    {
      header: 'Etiam hendrerit metus quis vulputate finibus.',
      contents: ['Donec lacinia', 'Curabitur blandit', 'Turpis eget'],
    },
  ],
};
const onClose = function onClose(closeType) {
  let closeTypeString;
  Object.keys(DialogResponse).forEach((key) => {
    if (DialogResponse[key] === closeType) {
      closeTypeString = \`DialogResponse.\${key}\`;
    }
  });
  action('onClose')(closeTypeString);
};
DialogHelper.show(
  this.props.context,
  obj,
  DialogType.ERROR,
  DialogResponseStyle.YESNOCANCEL,
  null,
  onClose,
  null,
  false,
);
\`\`\`
`;
