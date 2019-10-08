const PredefinedMask = {
  Type: {
    CreditCard: 'nnnn nnnn nnnn nnnn',
    IBAN: 'TRnn nnnn nnnn nnnn nnnn nnnn nn',
    MobilePhoneNumber: '(5nn) nnn nn nn',
    PhoneNumber: '(nnn) nnn nn nn',
  },
  Regex: {
    n: /^\d+$/,
    l: /^[a-zA-ZğĞüÜİıçÇöÖşŞ]+$/,
    a: /^.+$/,
  },
  MaskCharacter: ['n', 'l', 'a'],
  AllowSpecialKeys: [' ', '(', ')', '-'],
  AllowKeys: [8, 9, 13, 16, 17, 18, 32, 33, 34, 35, 36, 37, 38, 39, 40, 46],
  // 8  => backspace
  // 16 => shift
  // 17 => ctrl
  // 18 => alt
  // 33 => page up
  // 34 => page down
  // 35 => end
  // 36 => home
  // 37 => arrow left
  // 38 => arrow up
  // 39 => arrow right
  // 40 => arrow down
  // 46 => delete
};
export default PredefinedMask;
