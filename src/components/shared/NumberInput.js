// @flow

import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export type Props = {
  id: string,
  label: string,
  innerLabel: string,
  value: ?string,
  error?: boolean,
  validate?: string,
  isRequired?: boolean,
  handleChange?: ({ target: { value: string, id: string } }, { validate: string }) => void,
};

function NumberInput(props: Props) {
  return (
    <Form.Field error={props.error}>
      <label htmlFor={props.id}>{props.label}</label>
      <Input
        id={props.id}
        label={{ basic: true, content: props.innerLabel }}
        labelPosition="right"
        value={props.value}
        validate={props.validate}
        onChange={props.handleChange}
        placeholder={props.isRequired ? 'Pflichtfeld' : ''}
      />
    </Form.Field>
  );
}

export default NumberInput;
