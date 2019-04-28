// @flow

import React from 'react'
import { Form, Label, Input } from 'semantic-ui-react'

export type Props = {
  id: string,
  label: string,
  innerLabel: string,
  value: ?string,
  validate?: string,
  handleChange?: (?object, ?object) => void // phuuu... was will der von mir... 2Do
};

function NumberInput(props: Props) {
  return (
    <Form.Field>
      <label for={props.id}>{props.label}</label>
      <Input
        id={props.id}
        label={{ basic: true, content: props.innerLabel }}
        labelPosition='right'
        value={props.value} validate={props.validate}
        onChange={props.handleChange}
      />
    </Form.Field>
  )
}

export default NumberInput
