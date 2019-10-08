import React from 'react';
import { assert } from 'chai';
import { stub } from 'sinon';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { DialogType, DeviceSize } from '@kuveytturk/boa-base';
import { Icon } from '../Icon';
import * as Helper from './helpers';
import { context } from '@kuveytturk/boa-test/utils';

describe('Dialog helper methods', () => {
  describe('prepareLineStyle', () => {
    it('should has borderBottomColor from context', () => {
      const style = Helper.prepareLineStyle(context);
      assert.strictEqual(style.borderBottomColor, context.theme.boaPalette.base200);
    });

    it('should change margin with localization', () => {
      const style = Helper.prepareLineStyle(context);
      assert.strictEqual(style.marginRight, 24);
      assert.strictEqual(style.marginLeft, 96);
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      const styleRTL = Helper.prepareLineStyle(newContext);
      assert.strictEqual(styleRTL.marginLeft, 24);
      assert.strictEqual(styleRTL.marginRight, 96);
    });

    it('should handle device size', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const style = Helper.prepareLineStyle(newContext);
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(style.marginRight, 24);
          assert.strictEqual(style.marginLeft, 24);
        }
      });
    });
  });

  describe('prepareCloseButtonStyle', () => {
    it('should has top:0 and right:0', () => {
      const style = Helper.prepareCloseButtonStyle(context);
      assert.strictEqual(style.top, 0);
      assert.strictEqual(style.right, 0);
    });

    it('should change padding with localization', () => {
      const style = Helper.prepareCloseButtonStyle(context);
      assert.strictEqual(style.paddingRight, 12);
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      const styleRTL = Helper.prepareCloseButtonStyle(newContext);
      assert.strictEqual(styleRTL.paddingLeft, 12);
    });

    it('should handle device size', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const style = Helper.prepareCloseButtonStyle(newContext);
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(style.paddingRight, 4);
        }
      });
    });

    it('should handle device size with localization', () => {
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const style = Helper.prepareCloseButtonStyle(newContext);
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(style.paddingLeft, 4);
        }
      });
    });
  });

  describe('prepareTitleStyle', () => {
    it('should has flex:1, paddingTop:9', () => {
      const style = Helper.prepareTitleStyle(context);
      assert.strictEqual(style.flex, 1);
      assert.strictEqual(style.paddingTop, 9);
    });

    it('should change padding with localization', () => {
      const style = Helper.prepareTitleStyle(context);
      assert.strictEqual(style.paddingLeft, 60);
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      const styleRTL = Helper.prepareTitleStyle(newContext);
      assert.strictEqual(styleRTL.paddingRight, 60);
    });

    it('should handle device size', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const style = Helper.prepareTitleStyle(newContext);
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(style.paddingLeft, 44);
        }
      });
    });

    it('should handle device size with localization', () => {
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const style = Helper.prepareTitleStyle(newContext);
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(style.paddingRight, 44);
        }
      });
    });
  });

  describe('prepareDialogFormStyle', () => {
    it('should have right properties', () => {
      const style = Helper.prepareDialogFormStyle(context, '#ffffff');
      assert.strictEqual(style.boxSizing, 'border-box');
      assert.strictEqual(style.width, '100%');
      assert.strictEqual(style.fontSize, 16);
      assert.strictEqual(style.textAlign, 'center');
      assert.strictEqual(style.color, context.theme.boaPalette.comp500);
      assert.strictEqual(style.background, '#ffffff');
      assert.strictEqual(style.padding, 0);
      assert.strictEqual(style.display, 'flex');
      assert.strictEqual(style.direction, 'ltr');
    });

    it('should change padding with localization', () => {
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      const style = Helper.prepareDialogFormStyle(newContext, '#ffffff');
      assert.strictEqual(style.boxSizing, 'border-box');
      assert.strictEqual(style.width, '100%');
      assert.strictEqual(style.fontSize, 16);
      assert.strictEqual(style.textAlign, 'center');
      assert.strictEqual(style.color, context.theme.boaPalette.comp500);
      assert.strictEqual(style.background, '#ffffff');
      assert.strictEqual(style.padding, 0);
      assert.strictEqual(style.display, 'flex');
      assert.strictEqual(style.direction, 'rtl');
    });

    it('should handle device size', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const style = Helper.prepareTitleStyle(newContext);
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(style.paddingLeft, 44);
        }
      });
    });
  });

  describe('prepareArrayContent', () => {
    it('should create rows with <br />', () => {
      const content = Helper.prepareArrayContent(['a', 'b', 'c']);
      const items = content.split('<br />');
      assert.strictEqual(items[0], 'a');
      assert.strictEqual(items[1], 'b');
      assert.strictEqual(items[2], 'c');
    });

    it('should create rows with <br />', () => {
      const content = Helper.prepareArrayContent(['a \n', 'b', 'c']);
      const items = content.split('<br />');
      assert.strictEqual(items[0], 'a ');
      assert.strictEqual(items[1], '');
    });
  });

  describe('prepareObjectContent', () => {
    it('should create main content', () => {
      const content = {
        mainContent: <div>test</div>,
      };
      const objectContent = Helper.prepareObjectContent(content, context);
      assert.strictEqual(objectContent.dialogContent[0].type, 'div');
      assert.strictEqual(objectContent.dialogContent[0].key, 'dialogContent');
      assert.strictEqual(objectContent.dialogContent[0].props.style.fontSize, 16);
      assert.strictEqual(objectContent.dialogContent[0].props.style.marginRight, 24);
    });

    it('should create main content with localization', () => {
      const content = {
        mainContent: <div>test</div>,
      };
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      const objectContent = Helper.prepareObjectContent(content, newContext);
      assert.strictEqual(objectContent.dialogContent[0].type, 'div');
      assert.strictEqual(objectContent.dialogContent[0].key, 'dialogContent');
      assert.strictEqual(objectContent.dialogContent[0].props.style.fontSize, 16);
      assert.strictEqual(objectContent.dialogContent[0].props.style.marginLeft, 24);
    });

    it('should create subcontents', () => {
      const content = {
        mainContent: <div>test</div>,
        subcontents: [{ header: 'subcontent', contents: [] }],
      };
      const objectContent = Helper.prepareObjectContent(content, context);
      assert.strictEqual(objectContent.dialogSubContent[0].type, 'div');
      assert.strictEqual(objectContent.dialogSubContent[0].key, 'scrollDiv');
      assert.strictEqual(objectContent.dialogSubContent[0].props.style.overflow, 'auto');
      assert.strictEqual(objectContent.dialogSubContent[0].props.style.height, '60vh');
      assert.strictEqual(objectContent.dialogSubContent[0].props.style.paddingLeft, 98);
      assert.strictEqual(objectContent.dialogSubContent[0].props.style.paddingBottom, 24);
      assert.strictEqual(objectContent.dialogSubContent[0].props.style.direction, 'ltr');

      objectContent.dialogSubContent[0].props.children.forEach((sub, i) => {
        assert.strictEqual(sub.key, i.toString());
        assert.strictEqual(sub.props.style.color, context.theme.boaPalette.base400);
        assert.strictEqual(sub.props.style.fontSize, 11);
        assert.strictEqual(sub.props.style.marginTop, 24);
        assert.strictEqual(sub.props.children, 'subcontent');
      });
    });

    describe('divScroll', () => {
      it('should scroll top', () => {
        const scrollDivStyle = {};
        const headerDivStyle = {};
        const documentStub = stub(document, 'getElementById').callsFake(id => {
          if (id === 'scrollDiv') {
            return { style: scrollDivStyle };
          }
          return { style: headerDivStyle };
        });

        const content = {
          mainContent: <div>test</div>,
          subcontents: [<div>sub1</div>, <div>sub2</div>],
        };
        const objectContent = Helper.prepareObjectContent(content, context);

        objectContent.dialogSubContent[0].props.onScroll({ target: { scrollTop: 10 } }, context);
        documentStub.restore();
        assert.strictEqual(scrollDivStyle.borderTopColor, context.theme.boaPalette.base200);
        assert.strictEqual(scrollDivStyle.borderTopStyle, 'solid');
        assert.strictEqual(scrollDivStyle.borderTopWidth, 1);
        assert.strictEqual(headerDivStyle.borderBottomWidth, 1);
        assert.strictEqual(headerDivStyle.borderBottomStyle, 'solid');
        assert.strictEqual(headerDivStyle.borderBottomColor, 'transparent');
      });

      it('should not scroll top', () => {
        const scrollDivStyle = {};
        const headerDivStyle = {};
        const documentStub = stub(document, 'getElementById').callsFake(id => {
          if (id === 'scrollDiv') {
            return { style: scrollDivStyle };
          }
          return { style: headerDivStyle };
        });

        const content = {
          mainContent: <div>test</div>,
          subcontents: [<div>sub1</div>, <div>sub2</div>],
        };
        const objectContent = Helper.prepareObjectContent(content, context);

        objectContent.dialogSubContent[0].props.onScroll({ target: {} }, context);
        documentStub.restore();
        assert.strictEqual(scrollDivStyle.borderTopColor, 'transparent');
      });
    });

    it('should handle device size', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const content = {
          mainContent: <div>test</div>,
          subcontents: [<div>sub1</div>, <div>sub2</div>],
        };
        const objectContent = Helper.prepareObjectContent(content, newContext);

        assert.strictEqual(objectContent.dialogSubContent[0].type, 'div');
        assert.strictEqual(objectContent.dialogSubContent[0].key, 'scrollDiv');
        assert.strictEqual(objectContent.dialogSubContent[0].props.style.overflow, 'auto');
        assert.strictEqual(objectContent.dialogSubContent[0].props.style.height, '60vh');
        assert.strictEqual(objectContent.dialogSubContent[0].props.style.direction, 'ltr');

        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(objectContent.dialogSubContent[0].props.style.paddingLeft, 24);
          assert.strictEqual(objectContent.dialogSubContent[0].props.style.paddingBottom, 24);
        } else {
          assert.strictEqual(objectContent.dialogSubContent[0].props.style.paddingLeft, 98);
          assert.strictEqual(objectContent.dialogSubContent[0].props.style.paddingBottom, 24);
        }
      });
    });

    it('should create contents of subcontents', () => {
      const content = {
        mainContent: <div>test</div>,
        subcontents: [{ header: 'subcontent', contents: ['subcontentchild'] }],
      };
      const objectContent = Helper.prepareObjectContent(content, context);
      const subContent = objectContent.dialogSubContent[0];
      const children = subContent.props.children;

      assert.strictEqual(children[0].props.style.color, context.theme.boaPalette.base400);
      assert.strictEqual(children[0].props.style.fontSize, 11);
      assert.strictEqual(children[0].props.style.marginTop, 24);

      assert.strictEqual(children[1].props.style.color, context.theme.boaPalette.base450);
      assert.strictEqual(children[1].props.style.fontSize, 13);
    });
  });

  describe('prepareStringContent', () => {
    it('should add line break end of content', () => {
      const stringContent = Helper.prepareStringContent('test');
      assert.strictEqual(stringContent, 'test<br />');
    });
  });

  describe('prepareComponentContent', () => {
    it('should create html element', () => {
      const element = <div>test</div>;
      const refs = {};
      const key = 'test';
      const style = { margin: 10 };
      const componentContent = Helper.prepareComponentContent(element, refs, key, style);
      assert.strictEqual(componentContent, element);
      assert.strictEqual(style, style);
    });

    it('should change styles to vh', () => {
      const element = <div>test</div>;
      const refs = {};
      const key = 'test';
      const style = { height: '100%', width: '100%' };
      const componentContent = Helper.prepareComponentContent(element, refs, key, style);
      assert.strictEqual(componentContent, element);
      assert.strictEqual(style.height, '100vh');
      assert.strictEqual(style.width, '100vw');
    });
  });

  describe('prepareContentStyle', () => {
    it('should resize width to 100vw', () => {
      const contentStyle = { width: 11 };
      const innerWidth = window.innerWidth;
      window.innerWidth = 10;
      const result = Helper.prepareContentStyle(contentStyle, true, context, {});
      window.innerWidth = innerWidth;
      assert.strictEqual(result.customContentStyle.width, '100vw');
    });

    it('should resize height to 100vh', () => {
      const contentStyle = { height: 11 };
      const innerHeight = window.innerHeight;
      window.innerHeight = 10;
      const result = Helper.prepareContentStyle(contentStyle, true, context, {});
      window.innerHeight = innerHeight;
      assert.strictEqual(result.customContentStyle.height, '100vh');
    });

    it('should handle device sizes', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const contentStyle = {};
        const result = Helper.prepareContentStyle(contentStyle, true, newContext, {});
        if (size <= DeviceSize.SMALL) {
          assert.strictEqual(result.customContentStyle.height, '100vh');
          assert.strictEqual(result.customContentStyle.height, '100vh');
          assert.strictEqual(result.fullScreen, true);
        }
      });
    });

    it('should handle disabled', () => {
      const contentStyle = {};
      const result = Helper.prepareContentStyle(contentStyle, false, context, {});
      assert.strictEqual(result.fullScreen, false);
      assert.strictEqual(result.customContentStyle.margin, 8);
      assert.strictEqual(Object.keys(result.customContentStyle).length, 1);
    });
  });

  describe('getIcon', () => {
    it('should get icon by dialog types', () => {
      [
        {
          type: DialogType.INFO,
          icon: 'Info',
          color: context.theme.boaPalette.warning500,
        },
        {
          type: DialogType.QUESTION,
          icon: 'Help',
          color: context.theme.boaPalette.info500,
        },
        {
          type: DialogType.WARNING,
          icon: 'Error',
          color: context.theme.boaPalette.warning500,
        },
        {
          type: DialogType.ERROR,
          icon: 'Error',
          color: context.theme.boaPalette.warning500,
        },
        {
          type: DialogType.SUCCESS,
          icon: 'CheckCircle',
          color: context.theme.boaPalette.success500,
        },
      ].forEach(item => {
        const iconStub = stub(Icon, 'getIcon');
        Helper.getIcon(context, item.type);
        iconStub.restore();
        const icon = iconStub.args[0][0];
        assert.strictEqual(icon.dynamicIcon, item.icon);
        assert.strictEqual(icon.iconProperties.style.color, item.color);
        assert.strictEqual(icon.iconProperties.style.width, 48);
        assert.strictEqual(icon.iconProperties.style.height, 48);
      });

      const result = Helper.getIcon(context, {});
      assert.strictEqual(result, null);
    });
  });

  describe('prepareDialog', () => {
    it('should return children', () => {
      const props = {
        context,
        children: 'test',
      };
      const result = Helper.prepareDialog(props);
      assert.strictEqual(result.dialogContent, 'test');
    });

    describe('no children', () => {
      it('should return empty content', () => {
        const props = {
          context,
        };
        const result = Helper.prepareDialog(props);
        assert.strictEqual(result.dialogContent, '');
      });

      it('should call prepareArrayContent', () => {
        const props = {
          context,
          content: ['test'],
        };
        const result = Helper.prepareDialog(props);
        assert.strictEqual(result.dialogContent, Helper.prepareArrayContent(props.content));
      });

      it('should call prepareObjectContent', () => {
        const props = {
          context,
          content: {
            mainContent: <div>test</div>,
            subcontents: [{ header: 'subcontent', contents: [] }],
          },
        };
        const result = Helper.prepareDialog(props);
        assert.strictEqual(result.dialogContent[0].type, 'div');
        assert.strictEqual(result.dialogContent[0].key, 'dialogContent');
        assert.strictEqual(result.dialogContent[0].props.style.fontSize, 16);
        assert.strictEqual(result.dialogContent[0].props.style.marginRight, 24);
        assert.strictEqual(result.subContent[0].type, 'div');
        assert.strictEqual(result.subContent[0].key, 'scrollDiv');
        assert.strictEqual(result.subContent[0].props.style.overflow, 'auto');
        assert.strictEqual(result.subContent[0].props.style.height, '60vh');
        assert.strictEqual(result.subContent[0].props.style.paddingLeft, 98);
        assert.strictEqual(result.subContent[0].props.style.paddingBottom, 24);
        assert.strictEqual(result.subContent[0].props.style.direction, 'ltr');
      });

      it('should call prepareStringContent', () => {
        const props = {
          context,
          content: 'hello \n world',
        };
        const result = Helper.prepareDialog(props);
        assert.strictEqual(result.dialogContent, 'hello <br /> world<br />');
      });

      it('should call getShowStatusMessageReplacedText', () => {
        const props = {
          context,
          content: 'hello world',
        };
        const result = Helper.prepareDialog(props);
        assert.strictEqual(result.dialogContent.length, 1);
      });

      it('should call prepareComponentContent', () => {
        const element = <div>test</div>;
        const props = {
          context,
          content: element,
        };
        const result = Helper.prepareDialog(props);
        assert.strictEqual(result.dialogContent, element);
      });

      it('should return icon', () => {
        const props = {
          context,
          dialogType: DialogType.WARNING,
        };
        const iconStub = stub(Icon, 'getIcon').returns('icon');
        const result = Helper.prepareDialog(props);
        iconStub.restore();
        assert.strictEqual(result.icon, 'icon');
      });
    });
  });

  describe('createDialogContent', () => {
    it('should return MuiDialogContent', () => {
      const result = Helper.createDialogContent(
        {
          context,
        },
        {},
      );
      assert.strictEqual(result.type, MuiDialogContent);
    });

    it('should return MuiDialogContent', () => {
      const result = Helper.createDialogContent(
        {
          context,
        },
        {},
      );
      assert.strictEqual(result.type, MuiDialogContent);
      assert.strictEqual(result.props.style.padding, 0);
      assert.strictEqual(result.props.style.overflow, 'hidden');
    });

    it('should handle RTL', () => {
      const newContext = Object.assign({}, context, { localization: { isRightToLeft: true } });
      const result = Helper.createDialogContent(
        {
          context: newContext,
        },
        {},
      );
      const div = result.props.children;
      assert.strictEqual(div.props.children[0].props.style.direction, 'rtl');
    });

    it('should handle device size', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        const result = Helper.createDialogContent(
          {
            context: newContext,
          },
          {},
        );
        const div = result.props.children.props.children[0];
        const firstChild = div.props.children[0];
        if (size > DeviceSize.SMALL) {
          assert.strictEqual(firstChild.props.style.paddingTop, 24);
          assert.strictEqual(firstChild.props.style.paddingLeft, 24);
        }
      });
    });

    it('should handle device size RTL', () => {
      const newContext = Object.assign({}, context);
      [DeviceSize.XSMALL, DeviceSize.SMALL, DeviceSize.MEDIUM, DeviceSize.LARGE].forEach(size => {
        newContext.deviceSize = size;
        newContext.localization = { isRightToLeft: true };
        const result = Helper.createDialogContent(
          {
            context: newContext,
          },
          {},
        );
        const div = result.props.children.props.children[0];
        const firstChild = div.props.children[0];
        if (size > DeviceSize.SMALL) {
          assert.strictEqual(firstChild.props.style.paddingTop, 24);
          assert.strictEqual(firstChild.props.style.paddingRight, 24);
        }
      });
    });

    describe('line breaks', () => {
      it('should handle array content', () => {
        const result = Helper.createDialogContent(
          {
            context,
            content: ['test'],
          },
          { dialogContent: 'test <br />' },
        );
        const span = result.props.children.props.children[0].props.children[1].props.children;
        assert.strictEqual(span.props.dangerouslySetInnerHTML.__html, 'test <br />'); // eslint-disable-line
      });
    });
  });

  describe('getTitleBackground', () => {
    it('should return base300 when dialogs exists', () => {
      const result = Helper.getTitleBackground({ ref: 'dialog1' }, context);
      assert.strictEqual(result, context.theme.boaPalette.base300);
    });

    it('should return pri500 when dialogs not exists', () => {
      const result = Helper.getTitleBackground({}, context);
      assert.strictEqual(result, context.theme.boaPalette.pri500);
    });
  });
});
