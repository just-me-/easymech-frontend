// @flow

import React, { useState, useEffect } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import SmartInput from '../shared/SmartInput';

import DatePicker from '../shared/DatePicker';

import * as helper from '../shared/functions';
import * as validation from '../shared/validation';

import '../shared/Fields.css';

import type { Transaction } from '../../api/transaction';
import type { TypeMachine } from '../../api/machine';

export type Props = {
  data?: Transaction,
  setData?: Transaction => void,
  setValidState?: boolean => void,
  searchView?: boolean,
  machine?: TypeMachine,
};

function SearchFields(props: Props) {
  const initialData = {
    kundenId: (props.data && props.data.kundenId) || '',
    maschinenId: (props.data && props.data.maschinenId) || '',
    maschinentypId: (props.data && props.data.maschinentypId) || '',
    von: (props.data && props.data.von) || '',
    bis: (props.data && props.data.bis) || '',
    searchTransaction: (props.data && props.data.searchTransaction) || true,
    searchRental: (props.data && props.data.searchRental) || true,
    searchService: (props.data && props.data.searchService) || true,
  };

  const [searchData, setSearchData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();
  const [machineTypeData, setMachineTypeData] = useState();

  const [datesAreValid, setDatesAreValid] = useState({
    von: true,
    bis: true,
  });

  function handleMachineSelect(result) {
    setSearchData({ ...searchData, maschinenId: result.id });
  }

  function handleCustomerSelect(result) {
    setSearchData({ ...searchData, kundenId: result.id });
  }

  function handleMachineTypeSelect(result) {
    setSearchData({ ...searchData, maschinentypId: result.id });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate && validate === 'date') {
      value = validation.toDate(value);
      if (props.setValidState) {
        setDatesAreValid({
          ...datesAreValid,
          [element.target.id]: value ? validation.checkDate(value) : true,
        });
      }
    }
    setSearchData({ ...searchData, [element.target.id]: value });
  }

  function datePicked(value, id) {
    setDatesAreValid({
      ...datesAreValid,
      id: validation.checkDate(value),
    });
    setSearchData({ ...searchData, [id]: value });
  }

  function handleCheckbox(element, { checked }) {
    setSearchData({ ...searchData, [element.target.id]: checked });
  }

  useEffect(() => {
    const yearIsValid = Object.values(datesAreValid).every(val => val === true);
    if (props.setValidState) {
      props.setValidState(yearIsValid);
    }
    if (props.setData) {
      props.setData(searchData);
    }
  });

  useEffect(() => {
    helper.getCustomers({
      deletedToo: true,
      dataSetter: setCustomerData,
    });
    helper.getMachines({
      deletedToo: true,
      dataSetter: setMachineData,
    });
    helper.getMachinetypes({
      dataSetter: setMachineTypeData,
    });
  }, []);

  return (
    <div>
      <div className="Form-section">
        <Form.Group widths="equal">
          <SmartInput
            id="maschine"
            label="Maschinen"
            matchingKey="seriennummer"
            onResultSelect={handleMachineSelect}
            elements={machineData}
            setElementId={props.data ? props.data.maschinenid : 0}
            noResultsMessage="Keine Maschinen gefunden"
          />
          <SmartInput
            id="maschinentyp"
            label="Maschinentyp"
            matchingKey="fabrikat"
            onResultSelect={handleMachineTypeSelect}
            elements={machineTypeData}
            setElementId={props.data ? props.data.maschinentypId : 0}
            noResultsMessage="Keine Maschinentypen gefunden"
            isRequired={!props.searchView}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <SmartInput
            id="kunde"
            label="Kunde"
            matchingKey="firma"
            onResultSelect={handleCustomerSelect}
            elements={customerData}
            setElementId={props.data ? props.data.kundenid : 0}
            noResultsMessage="Keine Kunden gefunden"
          />
          <Form.Input
            label="Dummy"
            className="dummyObject"
            placeholder="Dummy Placeholder for equal dividing"
          />
        </Form.Group>

        <Form.Group widths="equal">
          <DatePicker
            id="von"
            label="Von"
            value={searchData.von}
            handleChange={handleChange}
            error={!datesAreValid.von}
            callbackSetter={datePicked}
          />
          <DatePicker
            id="bis"
            label="Bis"
            value={searchData.bis}
            handleChange={handleChange}
            error={!datesAreValid.bis}
            callbackSetter={datePicked}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Checkbox
            id="searchTransaction"
            label="An- und Verkauf durchsuchen"
            onClick={handleCheckbox}
            checked={searchData.searchTransaction}
            className="field"
          />
          <Checkbox
            id="searchRental"
            label="Vermietungen durchsuchen"
            onClick={handleCheckbox}
            checked={searchData.searchRental}
            className="field"
          />
          <Checkbox
            id="searchService"
            label="Dienstleistungen durchsuchen"
            onClick={handleCheckbox}
            checked={searchData.searchService}
            className="field"
          />
        </Form.Group>
      </div>
    </div>
  );
}

export default SearchFields;
