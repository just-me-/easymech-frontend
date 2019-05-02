// @flow

import React from 'react';
import { Form, Search } from 'semantic-ui-react';

export type Props = {
  elements: {},

  id: string,
  label: string,
  innerLabel: string,
  value: ?string,
  validate?: string,
  handleChange?: ({ target: { value: string, id: string } }, { validate: string }) => void,
};

function SmartInput(props: Props) {
  //const [elements, setElements] = useState([]);
  const [matchedResults, setMatchedResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState([]);

  function resetSearch() {
    setIsLoading(false);
    setMatchedResults([]);
    setValue('');
  }

  function handleSelect(e, { result }) {
    setMachineData({ ...machineData, besitzerId: result.id });
    // setMachineData({ ...machineData, maschinentypId: result.id });

    // call parent
    setValue(result.title);
  }

  function handleChange(e, { value }) {
    setIsLoading(true);
    setValue(e.target.value);
    setTimeout(() => {
      if (value.length < 1) return resetSearch();

      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = match => re.test(match.fabrikat);

      setIsLoading(false);
      setMatchedResults(_.filter(props.elements, isMatch));
    }, 300);
  }

  return (
    <Form.Field
      control={Search}
      label="Maschinentyp"
      loading={isLoading}
      onResultSelect={handleSelect}
      onSearchChange={_.debounce(handleChange, 500, {
        leading: true,
      })}
      results={matchedResults.map((result, index) => {
        return { key: index, id: result.id, title: result.fabrikat };
      })}
      value={value}
      noResultsMessage="Keine Maschinentypen gefunden"
      placeholder={props.searchView ? '' : 'Pflichtfeld'}
    />
  );
}

export default SmartInput;
