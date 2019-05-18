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
// year range ist limited from 1900 to 2099
test('Lowest valide year', () => {
  expect(validation.checkYear('1900')).toBe(true);
});
test('To low is invalid', () => {
  expect(validation.checkYear('1899')).toBe(false);
});
test('Biggest valide year', () => {
  expect(validation.checkYear('2099')).toBe(true);
});
test('To big is invalid', () => {
  expect(validation.checkYear('2100')).toBe(false);
});

test('Allow none leading zeros', () => {
  expect(validation.checkDate('1.1.2019')).toBe(true);
});
test('Formal valid date but it does not realy exist', () => {
  expect(validation.checkDate('30.02.2019')).toBe(false);
});
// year range ist limited from 1900 to 2099
test('Lowest valide year', () => {
  expect(validation.checkDate('01.01.1900')).toBe(true);
});
test('To low is invalid', () => {
  expect(validation.checkDate('31.12.1899')).toBe(false);
});
test('Biggest valide year', () => {
  expect(validation.checkDate('31.12.2099')).toBe(true);
});
test('To big is invalid', () => {
  expect(validation.checkDate('01.01.2100')).toBe(false);
});

// check float
test('Valid Float - 1', () => {
    expect(validation.checkFloat('1.50')).toBe(true);
});
test('Valid Float - 2', () => {
    expect(validation.checkFloat('1.9')).toBe(true);
});
test('Valid Float - 3', () => {
    expect(validation.checkFloat('1.99')).toBe(true);
});
test('Invalid Float - 1', () =>{
    expect(validation.checkFloat('1ead123')).toBe(false);
});
test('Invalid Float - 2', () =>{
    expect(validation.checkFloat('eawdA')).toBe(false);
});
test('Invalid Float - 3', () =>{
    expect(validation.checkFloat('1.999')).toBe(false);
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

test('Delete to empty string', () => {
  expect(validation.toDate('bjnejkr')).toBe('');
});
test('Convert to date', () => {
  expect(validation.toDate('2wv0.0!r jv3.2mk01rv9')).toBe('20.03.2019');
});
