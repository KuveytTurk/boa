/* eslint-disable max-len */
export default `
\`\`\`js
const content = (
  <Button
    context={this.props.context}
    type="contained"
    text="Open Dialog"
    onClick={() => DialogHelper.show(this.props.context,
      <div>Test</div>,
      DialogType.ERROR,
      DialogResponseStyle.OK,
      'Test Title',
      null,
      null,
      null,
      true,
    )} />
);
DialogHelper.show(this.props.context,
  content,
  DialogType.ERROR,
  DialogResponseStyle.OK,
  'Test Title',
  null,
  null,
  null,
  true,
);
\`\`\`
`;
