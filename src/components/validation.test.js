import * as validation from './validation';

test('Valid Mail', () => {
  expect(validation.checkMail('aa@bluewin.ch')).toBe(true);
});
test('Mail missing @', () => {
  expect(validation.checkMail('abluewin.ch')).toBe(false);
});
test('Mail missing .', () => {
  expect(validation.checkMail('ab@luewinch')).toBe(false);
});
test('Mail missing . and @', () => {
  expect(validation.checkMail('abluewinch')).toBe(false);
});
test('Mail missing text between . and @', () => {
  expect(validation.checkMail('abluewin@.ch')).toBe(false);
});
test('Mail empty', () => {
  expect(validation.checkMail('')).toBe(false);
});
test('Mail undef', () => {
  expect(validation.checkMail(undefined)).toBe(false);
});

test('Required string undef', () => {
  expect(validation.checkRequired(undefined)).toBe(false);
});
test('Required string empty', () => {
  expect(validation.checkRequired('')).toBe(false);
});
test('Required string exists', () => {
  expect(validation.checkRequired('b')).toBe(true);
});

test('Check year undef', () => {
  expect(validation.checkYear(undefined)).toBe(false);
});
test('Check year empty', () => {
  expect(validation.checkYear('')).toBe(false);
});
test('Check year valid string', () => {
  expect(validation.checkYear('2000')).toBe(true);
});
test('Check year valid number', () => {
  expect(validation.checkYear(2000)).toBe(true);
});
test('Check year invalid - to small', () => {
  expect(validation.checkYear('999')).toBe(false);
});
test('Check year invalid - to big', () => {
  expect(validation.checkYear('11111')).toBe(false);
});

test('Delete to empty string', () => {
  expect(validation.toNumber('bjnejkr')).toBe('');
});
test('Convert to number', () => {
  expect(validation.toNumber('m!vf3efv12efv3M?l')).toBe('3123');
});
test('Dont change number', () => {
  expect(validation.toNumber('1234')).toBe('1234');
});
test('Dont change empty string', () => {
  expect(validation.toNumber('')).toBe('');
});
test('Can handle numbers', () => {
  expect(validation.toNumber(123)).toBe('123');
});
test('Can handle 0 (as number)', () => {
  expect(validation.toNumber(0)).toBe('0');
});
