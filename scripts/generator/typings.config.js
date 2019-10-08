const defaultComponentOptions = {
  isBaseClass: false,
  extends: {
    includePropsAsGeneric: true,
    import: {
      named: 'ComponentBase',
      from: '@kuveytturk/boa-base',
    },
  },
  propTypesComposition: [
    {
      named: 'ComponentBaseProps',
      from: '@kuveytturk/boa-base',
    },
  ],
};

export default [
  {
    alias: 'ComponentBase',
    input: 'packages/base/src/ComponentBase/index.js',
    typingOptions: {
      isBaseClass: true,
      imports: [
        {
          named: 'ComponentSize',
          from: '@kuveytturk/boa-base',
        },
      ],
    },
  },
  {
    alias: 'EditorBase',
    input: 'packages/base/src/EditorBase/index.js',
    typingOptions: {
      isBaseClass: true,
      extends: {
        includePropsAsGeneric: true,
        import: {
          named: 'ComponentBase',
          from: '@kuveytturk/boa-base',
        },
      },
      propTypesComposition: [
        {
          named: 'ComponentBaseProps',
          from: '@kuveytturk/boa-base',
        },
      ],
    },
  },
  {
    alias: 'Button',
    input: 'packages/components/src/Button/Button.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'CheckBox',
    input: 'packages/components/src/CheckBox/CheckBox.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'DateTimePicker',
    input: 'packages/components/src/DateTimePicker/DateTimePicker.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'DocCode',
    input: 'packages/components/src/DocCode/DocCode.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'DocNotice',
    input: 'packages/components/src/DocNotice/DocNotice.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'DocToc',
    input: 'packages/components/src/DocToc/DocToc.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Dividier',
    input: 'packages/components/src/Divider/Divider.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'DocViewer',
    input: 'packages/components/src/DocViewer/DocViewer.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'IconButton',
    input: 'packages/components/src/IconButton/IconButton.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Input',
    input: 'packages/components/src/Input/Input.js',
    typingOptions: {
      isBaseClass: false,
      extends: {
        includePropsAsGeneric: true,
        import: {
          named: 'EditorBase',
          from: '@kuveytturk/boa-base',
        },
      },
      propTypesComposition: [
        {
          named: 'ComponentBaseProps',
          from: '@kuveytturk/boa-base',
        },
      ],
    },
  },
  {
    alias: 'InputAction',
    input: 'packages/components/src/InputAction/InputAction.js',
    typingOptions: {
      isBaseClass: false,
      extends: {
        includePropsAsGeneric: true,
        import: {
          named: 'ComponentBase',
          from: '@kuveytturk/boa-base',
        },
      },
      propTypesComposition: [
        {
          named: 'InputProps',
          from: '../Input/Input',
        },
      ],
    },
  },
  {
    alias: 'InputMask',
    input: 'packages/components/src/InputMask/InputMask.js',
    typingOptions: {
      isBaseClass: false,
      extends: {
        includePropsAsGeneric: true,
        import: {
          named: 'EditorBase',
          from: '@kuveytturk/boa-base',
        },
      },
      propTypesComposition: [
        {
          named: 'InputProps',
          from: '../Input/Input',
        },
      ],
    },
  },
  {
    alias: 'InputNumeric',
    input: 'packages/components/src/InputNumeric/InputNumeric.js',
    typingOptions: {
      isBaseClass: false,
      extends: {
        includePropsAsGeneric: true,
        import: {
          named: 'EditorBase',
          from: '@kuveytturk/boa-base',
        },
      },
      propTypesComposition: [
        {
          named: 'InputProps',
          from: '../Input/Input',
        },
      ],
    },
  },
  {
    alias: 'TabBar',
    input: 'packages/components/src/TabBar/TabBar.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'TreeView',
    input: 'packages/components/src/TreeView/TreeView.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Label',
    input: 'packages/components/src/Label/Label.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'IconMenu',
    input: 'packages/components/src/IconMenu/IconMenu.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Menu',
    input: 'packages/components/src/Menu/Menu.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Toggle',
    input: 'packages/components/src/Toggle/Toggle.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Dialog',
    input: 'packages/components/src/Dialog/Dialog.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'MenuItem',
    input: 'packages/components/src/MenuItem/MenuItem.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'ListItem',
    input: 'packages/components/src/ListItem/ListItem.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Popover',
    input: 'packages/components/src/Popover/Popover.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'Scroll',
    input: 'packages/components/src/Scroll/Scroll.js',
    typingOptions: defaultComponentOptions,
  },
  {
    alias: 'ToolTip',
    input: 'packages/components/src/ToolTip/ToolTip.js',
    typingOptions: defaultComponentOptions,
  },
];
