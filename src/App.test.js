import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/* Test Beispiel vom validate.js von der 2 Do application
    => löschen sobald erste Tests geschrieben wurden!!!!
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
*/
