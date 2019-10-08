export default function detectCopyPaste(keyCode, event) {
  let result = false;
  const charCode = String.fromCharCode(keyCode).toLowerCase();

  if (event.ctrlKey && charCode === 'c') {
    result = true;
  } else if (event.ctrlKey && charCode === 'v') {
    result = true;
  } else if (event.ctrlKey && charCode === 'a') {
    result = true;
  } else if (event.metaKey && charCode === 'c') {
    result = true;
  } else if (event.metaKey && charCode === 'v') {
    result = true;
  }
  return result;
}
