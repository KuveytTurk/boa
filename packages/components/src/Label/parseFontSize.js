export default function parseFontSize(fontSize) {
  if (typeof fontSize === 'number') {
    return fontSize;
  }
  if (typeof fontSize === 'string' && fontSize.length > 0) {
    return parseFloat(fontSize.replace(/[a-zA-Z\s]/gi, ''));
  }
  return undefined;
}
