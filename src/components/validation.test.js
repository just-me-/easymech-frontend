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

test('Delete to empty string', () => {
  expect(validation.toNumber("bjnejkr")).toBe("");
})
test('Convert to number', () => {
  expect(validation.toNumber("m!vf3efv12efv3M?l")).toBe("3123");
})
test('Dont change number', () => {
  expect(validation.toNumber("1234")).toBe("1234");
})
test('Dont change empty string', () => {
  expect(validation.toNumber("")).toBe("");
})
