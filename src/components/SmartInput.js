// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Form, Search } from 'semantic-ui-react';

export type Props = {
  elements: {},
  label: string,

  id: string,
  innerLabel: string,
  value: ?string,
  validate?: string,
  handleChange?: ({ target: { value: string, id: string } }, { validate: string }) => void,
};

function SmartInput(props: Props) {
  const [matchedResults, setMatchedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");

  function resetSearch() {
    setIsLoading(false);
    setMatchedResults([]);
    setValue('');
  }

  function handleSelect(e, { result }) {
    props.onResultSelect(result);
    setValue(result.title);
  }

  function handleChange(e, { value }) {
    setIsLoading(true);
    setValue(e.target.value);
    setTimeout(() => {
      if (value.length < 1) return resetSearch();

      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = match => re.test(match[props.matchingKey]);

      setIsLoading(false);
      setMatchedResults(_.filter(props.elements, isMatch));
    }, 300);
  }

  useEffect(() => {
    if (props.elements && props.elements > 0 && props.setElementId) {
      const owner = props.elements.find(x => x.id === props.setElementId);
      setValue(owner ? owner[props.matchingKey] : '');
    }
  });

  return (
    <Form.Field
      control={Search}
      label={props.label}
      onResultSelect={handleSelect}
      onSearchChange={_.debounce(handleChange, 500, {
        leading: true,
      })}
      results={matchedResults.map((result, index) => {
        return { key: index, id: result.id, title: result[props.matchingKey] };
      })}
      value={value}
      loading={isLoading}
      noResultsMessage={props.noResultsMessage}
      placeholder={props.isRequired ? 'Pflichtfeld' : ''}
    />
  );
}

export default SmartInput;
