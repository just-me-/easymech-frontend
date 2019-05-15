// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Form, Search } from 'semantic-ui-react';

export type Props = {
  id: string,
  label: string,
  matchingKey: string,
  noResultsMessage: string,
  setElementId: ?number,
  isRequired?: boolean,
  elements: ?[],
  onResultSelect: (result: { id: string }) => void,
};

function SmartInput(props: Props) {
  const [matchedResults, setMatchedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [isValide, setIsValide] = useState(true);

  function resetSearch() {
    setIsLoading(false);
    setIsValide(true);
    setMatchedResults([]);
    setValue('');
  }

  function handleSelect(e, { result }) {
    props.onResultSelect(result);
    setIsValide(true);
    setValue(result.title);
  }

  function handleChange(e, { value }) {
    props.onResultSelect({ id: "0" });
    setIsValide(false);
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
    if (props.elements && props.elements.length > 0 && props.setElementId) {
      const match = props.elements.find(x => x.id === props.setElementId);
      setValue(match ? match[props.matchingKey] : '');
    }
  }, [props.elements]);

  return (
    <Form.Field
      id={props.id}
      control={Search}
      label={props.label}
      onResultSelect={handleSelect}
      onSearchChange={_.debounce(handleChange, 500, {
        leading: true,
      })}
      results={matchedResults.map((result, index) => ({
        key: index,
        id: result.id,
        title: result[props.matchingKey],
      }))}
      value={value}
      loading={isLoading}
      noResultsMessage={props.noResultsMessage}
      placeholder={props.isRequired ? 'Pflichtfeld' : ''}
      error={!isValide}
    />
  );
}

export default SmartInput;
