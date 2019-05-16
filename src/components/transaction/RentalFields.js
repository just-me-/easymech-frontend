// @flow

import React, { useState, useEffect } from 'react';
import {
  Header, Form, Transition, Message,
} from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

import DatePicker from '../shared/DatePicker';
import SmartInput from '../shared/SmartInput';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';

import '../shared/Fields.css';

import type { Rental } from '../../api/rental';

export type Props = {
  data?: Rental,
  setData?: Rental => void,
  setValidState?: boolean => void,
};

function RentalFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    standort: (props.data && props.data.standort) || '',
    startdatum: (props.data && props.data.startdatum) || sharedCalls.getToday(),
    enddatum: (props.data && props.data.enddatum) || '',
    maschinenId: (props.data && props.data.maschinenId) || '',
    kundenId: (props.data && props.data.kundenId) || '',
    uebergabe: {
      datum: (props.data && props.data.uebergabe && props.data.uebergabe.datum) || '',
      notiz: (props.data && props.data.uebergabe && props.data.uebergabe.notiz) || '',
    },
    ruecknahme: {
      datum: (props.data && props.data.ruecknahme && props.data.ruecknahme.datum) || '',
      notiz: (props.data && props.data.ruecknahme && props.data.ruecknahme.notiz) || '',
    },
  };

  const [rentalData, setRentalData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();

  const [datesAreValid, setDatesAreValid] = useState({
    startdatum: true,
    enddatum: true,
    uebergabe__datum: true,
    ruecknahme__datum: true,
  });

  const [visibility, setVisibility] = useState({
    uebergabe_notiz: initialData.uebergabe.datum !== '',
    ruecknahme: initialData.uebergabe.datum !== '',
    ruecknahme_notiz: initialData.ruecknahme.datum !== '',
  });

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
      if (validate === 'date') {
        value = validation.toDate(value);
        if (props.setValidState) {
          setDatesAreValid({
            ...datesAreValid,
            [element.target.id]: value ? validation.checkDate(value) : true,
          });
        }
      }
    }
    // handle nested object fields
    const id_arr = element.target.id.split('__');
    if (id_arr && id_arr[1]) {
      setRentalData({
        ...rentalData,
        [id_arr[0]]: { ...rentalData[id_arr[0]], [id_arr[1]]: value },
      });
    } else {
      setRentalData({ ...rentalData, [element.target.id]: value });
    }
  }

  function datePicked(value, id) {
    setDatesAreValid({
      ...datesAreValid,
      id: validation.checkDate(value),
    });
    const id_arr = id.split('__');
    if (id_arr && id_arr[1]) {
      setRentalData({
        ...rentalData,
        [id_arr[0]]: { ...rentalData[id_arr[0]], [id_arr[1]]: value },
      });
    } else {
      setRentalData({ ...rentalData, [id]: value });
    }
  }

  useEffect(() => {
    const requiredIsValid = Object.values(datesAreValid).every(val => val === true)
      && parseInt(rentalData.maschinenId, 10) > 0
      && parseInt(rentalData.kundenId, 10) > 0;
    if (props.setValidState) {
      props.setValidState(requiredIsValid);
    }
    if (props.setData) {
      props.setData(rentalData);
    }
  });

  useEffect(
    () => {
      setVisibility({
        uebergabe_notiz: datesAreValid.uebergabe__datum && rentalData.uebergabe.datum.length > 0,
        ruecknahme: datesAreValid.uebergabe__datum && rentalData.uebergabe.datum.length > 0,
        ruecknahme_notiz: datesAreValid.ruecknahme__datum && rentalData.ruecknahme.datum.length > 0,
      });
    },
    [rentalData, datesAreValid],
  );

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
          <DatePicker
            id="startdatum"
            label="Startdatum"
            value={rentalData.startdatum}
            handleChange={handleChange}
            error={!datesAreValid.startdatum}
            callbackSetter={datePicked}
          />
          <DatePicker
            id="enddatum"
            label="Enddatum"
            value={rentalData.enddatum}
            handleChange={handleChange}
            error={!datesAreValid.enddatum}
            callbackSetter={datePicked}
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
            isRequired
          />
          <SmartInput
            id="kunde"
            label="Kunde"
            matchingKey="firma"
            onResultSelect={handleCustomerSelect}
            elements={customerData}
            setElementId={props.data ? props.data.kundenId : 0}
            noResultsMessage="Kein Kunden gefunden"
            isRequired
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

      <Header as="h2">Ausgabe der Maschinen</Header>
      <div className="Form-section">
        <Form.Group widths="equal">
          <DatePicker
            id="uebergabe__datum"
            label="Datum"
            value={rentalData.uebergabe.datum}
            handleChange={handleChange}
            error={!datesAreValid.uebergabe__datum}
            callbackSetter={datePicked}
          />
          <div className="field">
            <Message warning visible={!rentalData.uebergabe.datum} size="mini">
              Dieses Übergabedatum ausfüllen, sobald die Maschine dem Kunden abgegeben wurde.
            </Message>
          </div>
        </Form.Group>
        <Transition visible={visibility.uebergabe_notiz} animation="scale" duration={500}>
          <Form.Group widths="equal" className="OneField">
            <Form.Field
              control={TextareaAutosize}
              id="uebergabe__notiz"
              label="Notizen"
              onChange={handleChange}
              value={rentalData.uebergabe.notiz}
            />
          </Form.Group>
        </Transition>
      </div>

      <Transition visible={visibility.ruecknahme} animation="scale" duration={500}>
        <div>
          <Header as="h2">Rücknahme der Maschine</Header>
          <div className="Form-section">
            <Form.Group widths="equal">
              <DatePicker
                id="ruecknahme__datum"
                label="Datum"
                value={rentalData.ruecknahme.datum}
                handleChange={handleChange}
                error={!datesAreValid.ruecknahme__datum}
                callbackSetter={datePicked}
              />
              <div className="field">
                <Message warning visible={!rentalData.ruecknahme.datum} size="mini">
                  Dieses Rückgabedatum ausfüllen, sobald die Maschine zurückgegeben wurde.
                </Message>
              </div>
            </Form.Group>
            <Transition visible={visibility.ruecknahme_notiz} animation="scale" duration={500}>
              <Form.Group widths="equal" className="OneField">
                <Form.Field
                  control={TextareaAutosize}
                  id="ruecknahme__notiz"
                  label="Notizen"
                  onChange={handleChange}
                  value={rentalData.ruecknahme.notiz}
                />
              </Form.Group>
            </Transition>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default RentalFields;