// @flow

import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export type Props = {
  id: string,
  label: string,
  innerLabel: string,
  value: ?string,
  validate?: string,
  handleChange?: ({ target: { value: string, id: string } }, { validate: string }) => void,
};

function NumberInput(props: Props) {
  return (
    <Form.Field>
      <label htmlFor={props.id}>{props.label}</label>
      <Input
        id={props.id}
        label={{ basic: true, content: props.innerLabel }}
        labelPosition="right"
        value={props.value}
        validate={props.validate}
        onChange={props.handleChange}
      />
    </Form.Field>
  );
}

export default NumberInput;
