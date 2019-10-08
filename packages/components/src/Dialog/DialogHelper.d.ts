export default interface DialogHelper {
  show: (
    context: any,
    content: any,
    dialogType?: number,
    dialogResponseStyle?: number,
    title?: string,
    onClose?: any,
    style?: any,
  ) => void;
  showError: (
    context: any,
    message: string,
    results: any,
    dialogType?: number,
    dialogResponseStyle?: number,
    title?: string,
    onClose?: any,
    style?: any,
  ) => void;
  close: (component: any, dialogResponse?: number, returnValue?: any) => void;
}
