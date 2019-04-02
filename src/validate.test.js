import * as validate from "./validate";

test('Hello is >= 3', () => {
  expect(validate.checkInput("Hello")).toBe(true);
})
test('M is not >= 3', () => {
  expect(validate.checkInput("M")).toBe(false);
})
test('Empty is not >= 3', () => {
  expect(validate.checkInput("")).toBe(false);
})
