function stringPadLeft(str, len, ch) {
  const padCache = [
    '',
    ' ',
    '  ',
    '   ',
    '    ',
    '     ',
    '      ',
    '       ',
    '        ',
    '         ',
  ];

  // convert `str` to `string`
  str += '';
  // `len` is the `pad`'s length now
  len -= str.length;
  // doesn't need to pad
  if (len <= 0) {
    return str;
  }
  // `ch` defaults to `' '`
  if (!ch && ch !== 0) {
    ch = ' ';
  }
  // convert `ch` to `string`
  ch += '';
  // cache common use cases
  if (ch === ' ' && len < 10) {
    return padCache[len] + str;
  }
  // `pad` starts with an empty string
  let pad = '';
  const loop = true;
  // loop
  while (loop) {
    // add `ch` to `pad` if `len` is odd
    // eslint-disable-next-line no-bitwise
    if (len & 1) {
      pad += ch;
    }
    // divide `len` by 2, ditch the remainder
    len >>= 1; // eslint-disable-line no-bitwise
    // "double" the `ch` so this operation count grows logarithmically on `len`
    // each time `ch` is "doubled", the `len` would need to be "doubled" too
    // similar to finding a value in binary search tree, hence O(log(n))
    if (len) {
      ch += ch;
    } else {
      // `len` is 0, exit the loop
      break;
    }
  }
  // pad `str`!
  return pad + str;
}

export function getTimeInfo(duration) {
  const minutes = stringPadLeft(parseInt(duration / 60, 10), 2, '0');
  const seconds = stringPadLeft(parseInt(duration % 60, 10), 2, '0');

  return `${minutes}:${seconds}`;
}

export function hasValue(value) {
  if (value === '' || value === undefined || value === null) {
    return false;
  }
  return true;
}
