// @flow

import React, { useState, useEffect } from 'react';
import { Header, Form } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

import NumberInput from '../shared/NumberInput';
import SmartInput from '../shared/SmartInput';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';

import '../shared/Fields.css';

import type { Rental } from '../../api/transaction';

export type Props = {
  data?: Rental,
  setData?: Rental => void,
  setValidState?: boolean => void,
};

function RentalFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    standort: (props.data && props.data.standort) || '',
    startdatum: (props.data && props.data.startdatum) || '',
    enddatum: (props.data && props.data.enddatum) || '',
    maschinenId: (props.data && props.data.maschinenId) || '',
    kundenId: (props.data && props.data.kundenId) || '',
    uebergabe: {
      datum: (props.data && props.data.uebergabe.datum) || '',
      notiz: (props.data && props.data.uebergabe.notiz) || '',
    },
    ruecknahme: {
      datum: (props.data && props.data.ruecknahme.datum) || '',
      notiz: (props.data && props.data.ruecknahme.notiz) || '',
    },
  };

  const [rentalData, setRentalData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();

  function handleMachineSelect(result) {
    setRentalData({ ...rentalData, maschinenId: result.id });
  }

  function handleCustomerSelect(result) {
    setRentalData({ ...rentalData, kundenId: result.id });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate) {
      if (validate === 'number') {
        value = validation.toNumber(value);
      }
      if (validate === 'year') {
        value = validation.toNumber(value);
        // if (props.setValidState) setYearIsValid(value ? validation.checkYear(value) : true);
      }
      if (validate === 'date') {
        console.log('2doo');
      }
    }
    setRentalData({ ...rentalData, [element.target.id]: value });
  }

  useEffect(() => {
    const requiredIsValide = true; // 2Do...
    if (props.setValidState) {
      props.setValidState(requiredIsValide);
    }
    if (props.setData) {
      props.setData(rentalData);
    }
  });

  useEffect(() => {
    sharedCalls.getCustomers({
      deletedToo: true,
      dataSetter: setCustomerData,
    });
    sharedCalls.getMachines({
      deletedToo: true,
      dataSetter: setMachineData,
    });
  }, []);

  return (
    <div>
      <Header as="h2">Reservation</Header>
      <div className="Form-section">
        <Form.Group widths="equal">
          <NumberInput
            id="startdatum"
            label="Startdatum"
            innerLabel="DD.MM.YYYY"
            value={rentalData.startdatum}
            validate="date"
            handleChange={handleChange}
          />
          <NumberInput
            id="enddatum"
            label="Enddatum"
            innerLabel="DD.MM.YYYY"
            value={rentalData.enddatum}
            validate="date"
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <SmartInput
            id="maschine"
            label="Maschine"
            matchingKey="seriennummer"
            onResultSelect={handleMachineSelect}
            elements={machineData}
            setElementId={props.data ? props.data.maschinenId : 0}
            noResultsMessage="Keine Maschine gefunden"
            isRequired={true}
          />
          <SmartInput
            id="kunde"
            label="Kunde"
            matchingKey="firma"
            onResultSelect={handleCustomerSelect}
            elements={customerData}
            setElementId={props.data ? props.data.kundenId : 0}
            noResultsMessage="Kein Kunden gefunden"
            isRequired={true}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <Form.Input
            id="standort"
            label="Standort"
            value={rentalData.standort}
            onChange={handleChange}
          />
          <Form.Input
            label="Dummy"
            className="dummyObject"
            placeholder="Dummy Placeholder for equal dividing"
          />
        </Form.Group>
      </div>

      <Header as="h2">Übergabe</Header>
      <div className="Form-section">
        <Form.Group widths="equal">
          <NumberInput
            id="uebergabe.datum"
            label="Datum"
            innerLabel="DD.MM.YYYY"
            value={rentalData.uebergabe.datum}
            validate="date"
            handleChange={handleChange}
          />
          <Form.Input
            label="Dummy"
            className="dummyObject"
            placeholder="Dummy Placeholder for equal dividing"
          />
        </Form.Group>
        <Form.Group widths="equal" className="OneField">
          <Form.Field
            control={TextareaAutosize}
            id="uebergabe.notiz"
            label="Notizen"
            onChange={handleChange}
            value={rentalData.uebergabe.notiz}
          />
        </Form.Group>
      </div>

      <Header as="h2">Rückgabe</Header>
      <div className="Form-section">
        <Form.Group widths="equal">
          <NumberInput
            id="ruecknahme.datum"
            label="Datum"
            innerLabel="DD.MM.YYYY"
            value={rentalData.ruecknahme.datum}
            validate="date"
            handleChange={handleChange}
          />
          <Form.Input
            label="Dummy"
            className="dummyObject"
            placeholder="Dummy Placeholder for equal dividing"
          />
        </Form.Group>
        <Form.Group widths="equal" className="OneField">
          <Form.Field
            control={TextareaAutosize}
            id="ruecknahme.notiz"
            label="Notizen"
            onChange={handleChange}
            value={rentalData.ruecknahme.notiz}
          />
        </Form.Group>
      </div>
    </div>
  );
}

export default RentalFields;
