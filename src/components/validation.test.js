import * as validation from "./validation"

test('Valid Mail', () => {
  expect(validation.checkMail("aa@bluewin.ch")).toBe(true);
})
test('Mail missing @', () => {
  expect(validation.checkMail("abluewin.ch")).toBe(false);
})
test('Mail missing .', () => {
  expect(validation.checkMail("ab@luewinch")).toBe(false);
})
test('Mail missing . and @', () => {
  expect(validation.checkMail("abluewinch")).toBe(false);
})
test('Mail missing text between . and @', () => {
  expect(validation.checkMail("abluewin@.ch")).toBe(false);
})

test('Required string undef', () => {
  expect(validation.checkRequired(undefined)).toBe(false);
})
test('Required string empty', () => {
  expect(validation.checkRequired("")).toBe(false);
})
test('Required string exists', () => {
  expect(validation.checkRequired("b")).toBe(true);
})
