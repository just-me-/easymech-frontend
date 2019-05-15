// @flow

import React, { useState, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';

import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
import 'moment/locale/de';

import NumberInput from '../shared/NumberInput';

import './DatePicker.css';

export type Props = {
  value: ?string,
  callbackSetter?: ({ target: { value: string, id: string } }, { validate: string }) => void,
};

function DatePicker(props: Props) {
  const [value, setValue] = useState('');

  function handleChange(e, { value }) {
    setValue(value);
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
        closable={true}
        hideMobileKeyboard={true}
        iconPosition="left"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

export default DatePicker;
