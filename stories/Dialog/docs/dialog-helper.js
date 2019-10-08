/* eslint-disable max-len */
export default `
# DialogHelper
DialogHelper is a static class that creates a Dialog window from outside. So it eliminates the need of putting a \`<Dialog />\` component inside the render method.
It provides some static methods.

## Usage

\`\`\`js
import { DialogHelper } from '@kuveytturk/boa-components/Dialog';
\`\`\`

## Methods
- **DialogHelper.show**: Creates a dialog window. Returns ref of the \`<Dialog />\`.
  - **context**: The context parameter. Please refer to \`@kuveytturk/boa-base\` documentation for detailed documentation.
  - **content**: The content parameter. It supports, string, object, array or any React element.
  - **dialogType**: \`DialogType\` enum from the \`@kuveytturk/boa-base\` package.
  - **dialogResponseStyle**: \`DialogResponseStyle\` enum from the \`@kuveytturk/boa-base\` package.
  - **title**: Title of the dialog window.
  - **onClose**: Callback function that fires when the dialog window is closed.
  - **style**: Override the style of \`<Dialog />\` element.
  - **onClosing**: Callback function that fires when the dialog window is being closed.
  - **showHeader**: Flag for the visibility of the title.
`;
