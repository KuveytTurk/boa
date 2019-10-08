/* eslint-disable react/jsx-no-bind, react/no-this-in-sfc */
import React from 'react';
import ReactDOM from 'react-dom';
import { getMessage } from '@kuveytturk/boa-utils';
import { AppProvider, DialogType, DialogResponse, DialogResponseStyle } from '@kuveytturk/boa-base';
import { Button } from '../Button';
import Dialog from './Dialog';
import { getTitleBackground } from './helpers';

export default class DialogHelper {
  static dialogCounter = 0;

  static dialogDivs = {};

  static dialogRefs = {};

  /* istanbul ignore next */
  static getContentRef(key) {
    /* istanbul ignore if */
    if (this.dialogRefs[key]) {
      return this.dialogRefs[key].contentRef;
    }
    return null;
  }

  /** internal methods * */
  static clearRefs(key) {
    /* istanbul ignore else */
    if (this.dialogDivs[key]) {
      const idleDialogDiv = this.dialogDivs[key];
      delete this.dialogRefs[key];
      delete this.dialogDivs[key];
      ReactDOM.unmountComponentAtNode(idleDialogDiv);
      document.body.removeChild(idleDialogDiv);
    }
  }

  static staticConstructor() {
    this.onClose = this.onClose.bind(this);
  }

  static show(
    context,
    content,
    dialogType = DialogType.INFO,
    dialogResponseStyle = DialogResponseStyle.OK,
    title,
    onClose,
    style,
    onClosing,
    showHeader = true,
  ) {
    let thisRef;
    let dialogContentRef;
    const actions = [];
    const dialogKey = `dialogKey_${this.dialogCounter++}`;

    // eslint-disable-next-line
    const createAction = (context, text, type, focus) => {
      return (
        <Button
          key={type}
          context={context}
          style={{
            color: context.theme.boaPalette.pri500,
            fontWeight: 'bold',
            fontSize: '13px',
          }}
          type="text"
          text={getMessage('BOA', text, context.language).Description}
          keyboardFocused={focus}
          tag={type}
          onClick={this.onClose.bind(this, type)}
        />
      );
    };

    /* istanbul ignore else */
    if (content) {
      /* istanbul ignore else */
      if (
        typeof content === 'string' ||
        content instanceof Array ||
        (content instanceof Object && content.mainContent !== undefined) ||
        dialogResponseStyle != null
      ) {
        if (dialogResponseStyle === DialogResponseStyle.OK) {
          actions.push(createAction(context, 'Ok', DialogResponse.OK, true));
        } else if (dialogResponseStyle === DialogResponseStyle.YESCANCEL) {
          actions.push(createAction(context, 'Yes', DialogResponse.YES, true));
          actions.push(createAction(context, 'Cancel', DialogResponse.CANCEL, false));
        } else if (dialogResponseStyle === DialogResponseStyle.YESNO) {
          actions.push(createAction(context, 'Yes', DialogResponse.YES, true));
          actions.push(createAction(context, 'No', DialogResponse.NO, false));
        } else if (dialogResponseStyle === DialogResponseStyle.YESNOCANCEL) {
          actions.push(createAction(context, 'Yes', DialogResponse.YES, true));
          actions.push(createAction(context, 'No', DialogResponse.NO, false));
          actions.push(createAction(context, 'Cancel', DialogResponse.CANCEL, false));
        } else {
          actions.push(createAction(context, 'Ok', DialogResponse.OK, true));
        }
      }
    }

    const titleBackgroundColor = getTitleBackground(DialogHelper.dialogRefs, context);

    const dialogElement = (
      <AppProvider theme={context.theme}>
        <Dialog
          context={context}
          content={content}
          dialogType={dialogType}
          dialogResponseStyle={dialogResponseStyle}
          style={style}
          dialogKey={dialogKey}
          dialogRefs={this.dialogRefs}
          onRequestClose={this.onClose}
          onClosing={onClosing}
          ref={r => {
            thisRef = r;
          }}
          open
          title={title}
          titleBackgroundColor={titleBackgroundColor}
          actions={actions}
          showHeader={showHeader}
        />
      </AppProvider>
    );

    const dialogDiv = document.createElement('div');
    document.body.appendChild(dialogDiv);
    this.dialogDivs[dialogKey] = dialogDiv;

    ReactDOM.render(dialogElement, dialogDiv, () => {
      this.dialogRefs[dialogKey] = { dialog: thisRef, onClose, contentRef: dialogContentRef };
    });

    return thisRef;
  }

  static showError(
    context,
    message,
    results,
    dialogType = DialogType.INFO, // eslint-disable-line no-unused-vars
    dialogResponseStyle = DialogResponseStyle.OK, // eslint-disable-line no-unused-vars, max-len
    title,
    onClose,
    style,
  ) {
    const errorMessage = [];

    /* istanbul ignore else */
    if (message) {
      errorMessage.push(message);
    }

    /* istanbul ignore else */
    if (results && results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        errorMessage.push(results[i].errorMessage);
      }
    }

    return this.show(
      context,
      errorMessage,
      (dialogType = DialogType.INFO),
      (dialogResponseStyle = DialogResponseStyle.OK),
      title,
      onClose,
      style,
    );
  }

  static close(component, dialogResponse = DialogResponse.NONE, returnValue) {
    let dialogKey;

    /* istanbul ignore else */
    if (component && component.props && component.props.dialogKey) {
      dialogKey = component.props.dialogKey;
    } else {
      dialogKey = Object.keys(this.dialogRefs).slice(-1)[0];
    }
    const idleDialog = this.dialogRefs[dialogKey];
    const idleDialogDiv = this.dialogDivs[dialogKey];

    delete this.dialogRefs[dialogKey];
    delete this.dialogDivs[dialogKey];

    idleDialog.dialog.getInstance().setState({ open: false }, () => {
      setTimeout(() => {
        /* istanbul ignore else */
        if (idleDialog && idleDialog.onClose) {
          idleDialog.onClose(dialogResponse, returnValue);
        }
        // if (idleDialog && idleDialog.contentRef && idleDialog.contentRef.onClose) {
        //   idleDialog.contentRef.onClose(dialogResponse, returnValue);
        // }
        ReactDOM.unmountComponentAtNode(idleDialogDiv);
        document.body.removeChild(idleDialogDiv);
      }, 200);
    });
    return true;
  }

  /* istanbul ignore next */
  static onClose(dialogResponse) {
    /* istanbul ignore next */
    this.close(undefined, dialogResponse, undefined);
  }
}

DialogHelper.staticConstructor();
