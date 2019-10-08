/* eslint-disable react/prop-types, react/no-danger, react/no-array-index-key */
import React from 'react';
import { DialogType, DeviceSize } from '@kuveytturk/boa-base';
import { Icon } from '../Icon';
import MuiDialogContent from '@material-ui/core/DialogContent';

export function prepareLineStyle(context) {
  const objLine = {
    height: 1,
    borderBottomColor: context.theme.boaPalette.base200,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    marginBottom: -1,
  };

  Object.assign(
    objLine,
    context.localization.isRightToLeft
      ? { marginLeft: 24, marginRight: 96 }
      : { marginLeft: 96, marginRight: 24 },
  );

  Object.assign(
    objLine,
    context.deviceSize <= DeviceSize.SMALL ? { marginRight: 24, marginLeft: 24 } : {},
  );

  return objLine;
}

export function prepareCloseButtonStyle(context) {
  const closeButtonStyle = { top: 0, right: 0 };
  Object.assign(
    closeButtonStyle,
    context.localization.isRightToLeft ? { paddingLeft: 12 } : { paddingRight: 12 },
  );

  if (context.deviceSize <= DeviceSize.SMALL) {
    Object.assign(
      closeButtonStyle,
      context.localization.isRightToLeft ? { paddingLeft: 4 } : { paddingRight: 4 },
    );
  }
  return closeButtonStyle;
}

export function prepareTitleStyle(context, leftTitleButton) {
  const titleStyle = { flex: 1, paddingTop: 9 };

  if (context.deviceSize <= DeviceSize.SMALL) {
    Object.assign(
      titleStyle,
      context.localization.isRightToLeft
        ? !leftTitleButton && { paddingRight: 44 }
        : !leftTitleButton && { paddingLeft: 44 },
    );
  } else {
    Object.assign(
      titleStyle,
      context.localization.isRightToLeft ? { paddingRight: 60 } : { paddingLeft: 60 },
    );
  }

  return titleStyle;
}

export function prepareDialogFormStyle(context, titleBackgroundColor) {
  return {
    boxSizing: 'border-box',
    width: '100%',
    fontSize: 16,
    textAlign: 'center',
    color: context.theme.boaPalette.comp500,
    background: titleBackgroundColor,
    padding: 0,
    display: 'flex',
    direction: context.localization.isRightToLeft ? 'rtl' : 'ltr',
  };
}

export function prepareArrayContent(content) {
  let dialogContent = '';
  content.forEach(item => {
    dialogContent += `${item}<br />`;
  });
  dialogContent = dialogContent.replace('\n', '<br />');
  return dialogContent;
}

export function divScroll(event, context) {
  const scrollDivStyle = document.getElementById('scrollDiv').style;
  const headerDivStyle = document.getElementById('dialogHeader').style;
  if (event.target.scrollTop > 0) {
    scrollDivStyle.borderTopColor = context.theme.boaPalette.base200;
    scrollDivStyle.borderTopStyle = 'solid';
    scrollDivStyle.borderTopWidth = 1;
    headerDivStyle.borderBottomWidth = 1;
    headerDivStyle.borderBottomStyle = 'solid';
    headerDivStyle.borderBottomColor = 'transparent';
  } else {
    scrollDivStyle.borderTopColor = 'transparent';
  }
}

export function prepareObjectContent(content, context) {
  const dialogContent = [];
  const dialogSubContent = [];
  const headerStyle = {
    boxSizing: 'border-box',
    width: '100%',
    fontSize: 16,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    color: context.theme.boaPalette.base450,
  };

  if (context.localization.isRightToLeft) {
    headerStyle.marginLeft = 24;
    headerStyle.marginRight = undefined;
  } else {
    headerStyle.marginRight = 24;
    headerStyle.marginLeft = undefined;
  }

  dialogContent.push(
    <div key="dialogContent" id="dialogHeader" style={headerStyle}>
      {content.mainContent}
    </div>,
  );

  const subObj = [];
  const subObjStyle = {
    overflow: 'auto',
    height: '60vh',
    paddingLeft: 98,
    paddingBottom: 24,
  };

  Object.assign(
    subObjStyle,
    context.localization.isRightToLeft
      ? { paddingLeft: 24, paddingRight: 98, direction: 'rtl' }
      : { direction: 'ltr' },
  );

  Object.assign(
    subObjStyle,
    context.deviceSize <= DeviceSize.SMALL ? { paddingLeft: 24, paddingRight: 24 } : {},
  );

  if (!content.subcontents) {
    content.subcontents = [];
  }

  content.subcontents.forEach((item, index) => {
    subObj.push(
      <div
        key={index} // eslint-disable-line
        style={{
          marginTop: 24,
          fontSize: 11,
          color: context.theme.boaPalette.base400,
        }}
      >
        {item.header}
      </div>,
    );

    if (item.contents && item.contents.length > 0) {
      item.contents.forEach((i, j) => {
        subObj.push(
          <div
            key={`${index.toString() + j.toString()}`} // eslint-disable-line
            style={{
              fontSize: 13,
              color: context.theme.boaPalette.base450,
            }}
          >
            {i}
          </div>,
        );
      });
    }
  });

  dialogSubContent.push(
    <div
      key="scrollDiv"
      id="scrollDiv"
      onScroll={event => divScroll(event, context)}
      style={subObjStyle}
    >
      {subObj}
    </div>,
  );

  return { dialogContent, dialogSubContent };
}

export function prepareStringContent(content) {
  let dialogContent = '';
  const text = content.replace(/\n/gi, '#00100#');
  const textArray = text.split('#00100#');

  textArray.forEach(item => {
    dialogContent += `${item}<br />`;
  });
  dialogContent = dialogContent.replace('\n', '<br />');
  return dialogContent;
}

export function prepareComponentContent(content, dialogRefs, dialogKey, style) {
  let dialogContent = '';

  /* istanbul ignore next */
  if (content.type.prototype && content.type.prototype.isReactComponent) {
    const contentProps = {
      inDialog: true,
      dialogKey,
      ref: r => {
        if (dialogRefs[dialogKey]) {
          dialogRefs[dialogKey].contentRef = r;
        }
      },
    };
    dialogContent = React.cloneElement(content, contentProps);
  } else {
    dialogContent = content;
  }

  if (style && style.height && typeof style.height === 'string' && style.height.includes('%')) {
    style.height = style.height.replace('%', 'vh');
  }

  if (style && style.width && typeof style.width === 'string' && style.width.includes('%')) {
    style.width = style.width && style.width.replace('%', 'vw');
  }

  return dialogContent;
}

export function prepareContentStyle(contentStyle, buttonEnabled, context, style) {
  let fullScreen = false;
  if (buttonEnabled) {
    if (contentStyle.width > window.innerWidth) {
      contentStyle.width = '100vw';
    }
    if (contentStyle.height > window.innerHeight) {
      contentStyle.height = '100vh';
    }

    // if mobile it should be full screen
    if (context.deviceSize <= DeviceSize.SMALL) {
      contentStyle = Object.assign(contentStyle, { height: '100vh', width: '100vw' });
      fullScreen = true;
    }
  } else {
    contentStyle = Object.assign(contentStyle, { margin: 8 }, style);
  }

  return { customContentStyle: contentStyle, fullScreen };
}

export function getIcon(context, type) {
  const iconStyle = { width: 48, height: 48 };
  switch (type) {
    case DialogType.INFO: {
      const icon = {
        dynamicIcon: 'Info',
        iconProperties: {
          style: { ...iconStyle, color: context.theme.boaPalette.warning500 },
        },
      };
      return Icon.getIcon(icon);
    }
    case DialogType.QUESTION: {
      const icon = {
        dynamicIcon: 'Help',
        iconProperties: {
          style: { ...iconStyle, color: context.theme.boaPalette.info500 },
        },
      };
      return Icon.getIcon(icon);
    }
    case DialogType.WARNING: {
      const icon = {
        dynamicIcon: 'Error',
        iconProperties: {
          style: { ...iconStyle, color: context.theme.boaPalette.warning500 },
        },
      };
      return Icon.getIcon(icon);
    }
    case DialogType.ERROR: {
      const icon = {
        dynamicIcon: 'Error',
        iconProperties: {
          style: { ...iconStyle, color: context.theme.boaPalette.warning500 },
        },
      };
      return Icon.getIcon(icon);
    }
    case DialogType.SUCCESS: {
      const icon = {
        dynamicIcon: 'CheckCircle',
        iconProperties: {
          style: { ...iconStyle, color: context.theme.boaPalette.success500 },
        },
      };
      return Icon.getIcon(icon);
    }
    default:
      return null;
  }
}

/* istanbul ignore next */
export function getShowStatusMessageReplacedText(value) {
  const text = value.replace(/\n/gi, '#00100#');
  const textArray = text.split('#00100#');
  const messages = [];
  if (textArray && textArray.length > 0) {
    if (textArray.length === 1) {
      messages.push(<div key={0}>{textArray[0]}</div>);
    } else {
      textArray.forEach((item, index) => {
        messages.push(
          <div key={index}>
            {item}
            {index !== textArray.length ? <br /> : ''}
          </div>,
        );
      }, this);
    }
  }
  return messages;
}

export function prepareDialog(props) {
  const {
    context,
    content,
    children,
    dialogType,
    dialogKey,
    style,
    dialogRefs,
    showHeader,
  } = props;

  let titleWithCloseButtonEnabled = props.titleWithCloseButtonEnabled;
  let customContentStyle = {};
  let dialogContent;
  let dialog = {};
  let dialogSubContent = [];

  if (!children) {
    if (content) {
      if (content instanceof Array) {
        dialogContent = prepareArrayContent(content);
      } else if (content instanceof Object && content.mainContent !== undefined) {
        const prepared = prepareObjectContent(content, context);
        dialogContent = prepared.dialogContent;
        dialogSubContent = prepared.dialogSubContent;
      } else if (typeof content === 'string' && content.includes('\n')) {
        dialogContent = prepareStringContent(content);
      } else if (typeof content === 'string') {
        dialogContent = getShowStatusMessageReplacedText(content);
      } else {
        dialogContent = prepareComponentContent(content, dialogRefs, dialogKey, style);
        titleWithCloseButtonEnabled = showHeader;
        customContentStyle = Object.assign(
          {},
          {
            maxWidth: 'none',
            height: '90vh',
            width: '90vw',
            overflow: 'hidden',
          },
          style,
        );
      }
    } else {
      dialogContent = '';
    }
  } else {
    dialogContent = children;
  }

  const dIcon = getIcon(context, dialogType);
  const buttonEnabled = titleWithCloseButtonEnabled;
  const contentStyle = prepareContentStyle(customContentStyle, buttonEnabled, context, style);

  dialog = {
    dialogContent,
    children,
    icon: dIcon,
    subContent: dialogSubContent,
    titleWithCloseButtonEnabled,
    customContentStyle: contentStyle.customContentStyle,
    fullScreen: contentStyle.fullScreen,
  };
  return dialog;
}

export function createDialogContent(props, dialog) {
  const context = props.context;
  const objLine = prepareLineStyle(context);
  const linebreakExists =
    typeof dialog.dialogContent === 'string' && dialog.dialogContent.includes('<br />');
  return (
    <MuiDialogContent style={{ padding: 0, overflow: 'hidden' }}>
      <div>
        <div
          style={{
            display: 'flex',
            padding: 0,
            minHeight: 96,
            fontSize: 16,
            direction: context.localization.isRightToLeft ? 'rtl' : 'ltr',
          }}
        >
          {context.deviceSize > DeviceSize.SMALL && (
            <div
              style={
                context.localization.isRightToLeft
                  ? { paddingTop: 24, paddingRight: 24 }
                  : { paddingTop: 24, paddingLeft: 24 }
              }
            >
              {dialog.icon}
            </div>
          )}
          <div
            style={{
              padding: props.dialogBoxContentPadding,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {linebreakExists ? (
              <span dangerouslySetInnerHTML={{ __html: dialog.dialogContent }} />
            ) : (
              dialog.dialogContent
            )}
          </div>
        </div>
        <div style={objLine} />
        {dialog.subContent}
      </div>
    </MuiDialogContent>
  );
}

export function getTitleBackground(dialogRefs, context) {
  if (Object.keys(dialogRefs).length >= 1) {
    return context.theme.boaPalette.base300;
  }
  return context.theme.boaPalette.pri500;
}
