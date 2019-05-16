// @flow

import React, { useState } from 'react';

import { DateInput } from 'semantic-ui-calendar-react';
import 'moment/locale/de';

import * as validation from './validation';
import NumberInput from './NumberInput';

import './DatePicker.css';

export type Props = {
  value: ?string,
  callbackSetter?: (value: string, id: string) => void,
  id: string,
  label: string,
  error?: boolean,
  handleChange?: ({ target: { value: string, id: string } }, { validate: string }) => void,
};

function DatePicker(props: Props) {
  const [value, setValue] = useState('');

  function handleChange(e, { value }) {
    setValue(value);
    if (props.callbackSetter && validation.checkDate(value)) {
      props.callbackSetter(value, props.id);
    }
  }

  return (
    <div className="field hasButton">
      <NumberInput
        id={props.id}
        label={props.label}
        innerLabel="DD.MM.YYYY"
        validate="date"
        value={props.value}
        handleChange={props.handleChange}
        error={props.error}
      />
      <DateInput
        className="DatePicker Button"
        localization="de"
        dateFormat="DD.MM.YYYY"
        minDate="01.01.1900"
        maxDate="31.12.2099"
        closable
        hideMobileKeyboard
        iconPosition="left"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default DatePicker;
