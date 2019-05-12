// @flow

import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

import NumberInput from '../shared/NumberInput';
import SmartInput from '../shared/SmartInput';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';

import '../shared/Fields.css';

import type { MachineType } from '../../api/machinetype';
import type { Machine } from '../../api/machine';

export type Props = {
  data?: Machine,
  setData?: Machine => void,
  setValidState?: boolean => void,
  searchView?: boolean,
  machineTyp?: MachineType,
};

function MachineFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    seriennummer: (props.data && props.data.seriennummer) || '',
    mastnummer: (props.data && props.data.mastnummer) || '',
    motorennummer: (props.data && props.data.motorennummer) || '',
    betriebsdauer: (props.data && props.data.betriebsdauer) || '',
    jahrgang: (props.data && props.data.jahrgang) || '',
    notiz: (props.data && props.data.notiz) || '',
    maschinentypId: (props.data && props.data.maschinentypId) || '',
    besitzerId: (props.data && props.data.besitzerId) || '',
  };

  const [machineData, setMachineData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machinetypeData, setMachinetypeData] = useState();

  const [yearIsValid, setYearIsValid] = useState(true);

  function handleMachineTypeSelect(result) {
    setMachineData({ ...machineData, maschinentypId: result.id });
  }

  function handleCustomerSelect(result) {
    setMachineData({ ...machineData, besitzerId: result.id });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate) {
      if (validate === 'number') {
        value = validation.toNumber(value);
      }
      if (validate === 'year') {
        value = validation.toNumber(value);
        if (props.setValidState) setYearIsValid(value ? validation.checkYear(value) : true);
      }
    }
    setMachineData({ ...machineData, [element.target.id]: value });
  }

  useEffect(() => {
    const requiredIsValide = validation.checkRequired(machineData.seriennummer)
      && parseInt(machineData.maschinentypId, 10) > 0
      && parseInt(machineData.besitzerId, 10) > 0;
    if (props.setValidState) {
      props.setValidState(requiredIsValide && yearIsValid);
    }
    if (props.setData) {
      props.setData(machineData);
    }
  });

  useEffect(() => {
    sharedCalls.getCustomers({
      deletedToo: true,
      dataSetter: setCustomerData,
    });
    sharedCalls.getMachinetypes({
      dataSetter: setMachinetypeData,
    });
  }, []);

  return (
    <div>
      <div className="Form-section">
        <Form.Group widths="equal">
          <Form.Input
            id="seriennummer"
            label="Seriennr."
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
            value={machineData.seriennummer}
            onChange={handleChange}
          />
          <NumberInput
            id="betriebsdauer"
            label="Betriebsdauer"
            innerLabel="Stunden"
            value={machineData.betriebsdauer}
            validate="number"
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <SmartInput
            id="maschinentyp"
            label="Maschinentyp"
            matchingKey="fabrikat"
            onResultSelect={handleMachineTypeSelect}
            elements={machinetypeData}
            setElementId={props.data ? props.data.maschinentypId : 0}
            noResultsMessage="Keine Maschinentypen gefunden"
            isRequired={!props.searchView}
          />
          <SmartInput
            id="besitzer"
            label="Besitzer"
            matchingKey="firma"
            onResultSelect={handleCustomerSelect}
            elements={customerData}
            setElementId={props.data ? props.data.besitzerId : 0}
            noResultsMessage="Keine Kunden gefunden"
            isRequired={!props.searchView}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            id="mastnummer"
            label="Mastnr."
            value={machineData.mastnummer}
            onChange={handleChange}
          />
          <Form.Input
            id="motorennummer"
            label="Motorenr."
            value={machineData.motorennummer}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <NumberInput
            id="jahrgang"
            label="Jahrgang"
            innerLabel="YYYY"
            value={machineData.jahrgang}
            validate="year"
            handleChange={handleChange}
            error={!yearIsValid}
          />
          <Form.Input
            label="Dummy"
            className="dummyObject"
            placeholder="Dummy Placeholder for equal dividing"
          />
        </Form.Group>

        {props.searchView || (
          <Form.Group widths="equal" className="OneField">
            <Form.Field
              control={TextareaAutosize}
              id="notiz"
              label="Notizen"
              onChange={handleChange}
              value={machineData.notiz}
            />
          </Form.Group>
        )}
      </div>
    </div>
  );
}

export default MachineFields;