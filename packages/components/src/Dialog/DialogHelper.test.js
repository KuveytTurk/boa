import React from 'react';
import ReactDOM from 'react-dom';
import { assert } from 'chai';
import { DialogType, DialogResponseStyle } from '@kuveytturk/boa-base';
import { spy, useFakeTimers, stub } from 'sinon'; // eslint-disable-line
import DialogHelper from './DialogHelper';
import { context } from '@kuveytturk/boa-test/utils';

describe('DialogHelper', () => {
  describe('show dialog', () => {
    it('should create a DOM element with string', () => {
      const dialog = DialogHelper.show(context, 'test', undefined, undefined, 'test-title');
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      const paper = ref.querySelectorAll('[class*=MuiPaper-root]')[0];
      const dialogContent = paper.querySelectorAll('[class*=MuiDialogContent-root]')[0];
      const content = dialogContent.getElementsByTagName('div')[3];
      assert.strictEqual(content.innerHTML, '<div>test</div>');
      DialogHelper.clearRefs(dialogKey);
    });

    it('should create a DOM element with array', () => {
      const dialog = DialogHelper.show(
        context,
        ['test', 'test2'],
        undefined,
        undefined,
        'test-title',
      );
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      DialogHelper.clearRefs(dialogKey);
    });

    it('should create a DOM element with object', () => {
      const dialog = DialogHelper.show(
        context,
        {
          mainContent: 'test',
          subcontents: [
            {
              header: 'test-header',
              contents: ['test-sub-content', 'test-sub-content-2'],
            },
            {
              header: 'test-header-2',
              contents: ['test-sub-2-content'],
            },
          ],
        },
        undefined,
        undefined,
        'test-title',
      );
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      DialogHelper.clearRefs(dialogKey);
    });

    it('should create a DOM element with element', () => {
      const dialog = DialogHelper.show(
        context,
        <div>test</div>,
        undefined,
        undefined,
        'test-title',
      );
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      DialogHelper.clearRefs(dialogKey);
    });

    it('should create a DOM element with differentDialogTypes', () => {
      const dialogTypes = [
        DialogType.INFO,
        DialogType.WARNING,
        DialogType.ERROR,
        DialogType.QUESTION,
      ];

      dialogTypes.forEach(type => {
        const dialog = DialogHelper.show(context, 'test', type, undefined, 'test-title');
        const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
        const dialogRef = DialogHelper.dialogRefs[dialogKey];
        const ref = ReactDOM.findDOMNode(dialogRef.dialog);
        assert.strictEqual(dialog, dialogRef.dialog);
        assert.isNotNull(ref);
        DialogHelper.clearRefs(dialogKey);
      });
    });

    it('should create a DOM element with differentResponseType', () => {
      const responseTypes = [
        DialogResponseStyle.OK,
        DialogResponseStyle.YESCANCEL,
        DialogResponseStyle.YESNO,
        DialogResponseStyle.YESNOCANCEL,
        DialogResponseStyle.OKCANCEL,
      ];

      responseTypes.forEach(type => {
        const dialog = DialogHelper.show(context, 'test', undefined, type, 'test-title');
        const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
        const dialogRef = DialogHelper.dialogRefs[dialogKey];
        const ref = ReactDOM.findDOMNode(dialogRef.dialog);
        assert.strictEqual(dialog, dialogRef.dialog);
        assert.isNotNull(ref);
        DialogHelper.clearRefs(dialogKey);
      });
    });

    it('should create with header false', () => {
      const dialog = DialogHelper.show(
        context,
        'test',
        undefined,
        undefined,
        'test-title',
        undefined,
        undefined,
        undefined,
        false,
      );
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      const paper = ref.querySelectorAll('[class*=MuiPaper-root]')[0];
      const dialogContent = paper.querySelectorAll('[class*=MuiDialogContent-root]')[0];
      const content = dialogContent.getElementsByTagName('div')[3];
      assert.strictEqual(content.innerHTML, '<div>test</div>');
      DialogHelper.clearRefs(dialogKey);
    });
  });

  describe('show error', () => {
    it('should create a dom element with out results', () => {
      const dialog = DialogHelper.showError(
        context,
        'test-error',
        undefined,
        undefined,
        undefined,
        'test-title',
      );
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      DialogHelper.clearRefs(dialogKey);
    });

    it('should create a dom element with results', () => {
      const dialog = DialogHelper.showError(
        context,
        'test-error',
        [{ code: 'test', errorMessage: 'result-error' }],
        DialogType.WARNING,
        DialogResponseStyle.YESNO,
        'test-title',
        undefined,
        undefined,
      );
      const dialogKey = Object.keys(DialogHelper.dialogRefs)[0];
      const dialogRef = DialogHelper.dialogRefs[dialogKey];
      const ref = ReactDOM.findDOMNode(dialogRef.dialog);
      assert.strictEqual(dialog, dialogRef.dialog);
      assert.isNotNull(ref);
      DialogHelper.clearRefs(dialogKey);
    });
  });

  describe('close dialog', () => {
    it('should close created dialog', done => {
      const onClosing = spy();
      const onClose = spy();

      const dialog = DialogHelper.show(
        context,
        'test',
        undefined,
        undefined,
        'test-title',
        onClose,
        undefined,
        onClosing,
      );
      const idleDialogDiv = DialogHelper.dialogDivs[dialog.props.dialogKey];
      const unmountComponentAtNode = stub(ReactDOM, 'unmountComponentAtNode').callsFake(node => {
        assert.strictEqual(idleDialogDiv, node);
      });

      DialogHelper.close(dialog, DialogResponseStyle.OK, null);
      setTimeout(async () => {
        assert.strictEqual(unmountComponentAtNode.called, true);
        assert.strictEqual(onClosing.callCount, 1);
        assert.strictEqual(onClose.callCount, 1);
        unmountComponentAtNode.restore();
        done();
      }, 200);
    });

    it('should close created dialog defaults', done => {
      const onClosing = spy();
      const onClose = spy();

      const dialog = DialogHelper.show(
        context,
        'test',
        undefined,
        undefined,
        'test-title',
        onClose,
        undefined,
        onClosing,
      );
      const idleDialogDiv = DialogHelper.dialogDivs[dialog.props.dialogKey];
      const unmountComponentAtNode = stub(ReactDOM, 'unmountComponentAtNode').callsFake(node => {
        assert.strictEqual(idleDialogDiv, node);
      });

      DialogHelper.close(dialog);
      setTimeout(async () => {
        assert.strictEqual(unmountComponentAtNode.called, true);
        assert.strictEqual(onClosing.callCount, 1);
        assert.strictEqual(onClose.callCount, 1);
        unmountComponentAtNode.restore();
        done();
      }, 200);
    });
  });
});
