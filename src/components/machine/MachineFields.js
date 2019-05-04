// @flow

import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';
import { NotificationManager } from 'react-notifications';

import NumberInput from '../NumberInput';
import SmartInput from '../SmartInput';

import * as validation from '../validation';
import * as apiTypes from '../../api/machinetype';
import * as apiCustomer from '../../api/customer';

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

  function handleMachineTypeSelect(result) {
    setMachineData({ ...machineData, maschinentypId: result.id });
  }

  function handleCustomerSelect(result) {
    setMachineData({ ...machineData, besitzerId: result.id });
  }

  function getCustomersList() {
    apiCustomer
      .getCustomers()
      .then((result) => {
        result = apiCustomer.checkResponse(result);
        setCustomerData(result);
      })
      .catch((error) => {
        console.log('Ups, ein Fehler ist aufgetreten', error);
        NotificationManager.error(
          'Kunden konnten nicht geladen werden',
          'Bitte überprüfen Sie Ihre Verbindung!',
        );
      });
  }

  function getMachineTypesName() {
    apiTypes
      .getMachineTypes()
      .then((result) => {
        result = apiTypes.checkResponse(result);
        setMachinetypeData(result);
      })
      .catch((error) => {
        console.log('Ups, ein Fehler ist aufgetreten', error);
        NotificationManager.error(
          'Maschinentypen konnten nicht geladen werden',
          'Bitte überprüfen Sie Ihre Verbindung!',
        );
      });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate) {
      if (validate === 'number') {
        value = validation.toNumber(value);
      }
      if (validate === 'date') {
        // 2Do - Hmm also muss einfach im Format YYYY sein, sonst "werde rot" + "hinweis"
        console.log('2Do DATE VALIDATION');
      }
    }
    setMachineData({ ...machineData, [element.target.id]: value });
  }

  useEffect(() => {
    const requiredIsValide = validation.checkRequired(machineData.seriennummer)
      && parseInt(machineData.maschinentypId, 10) > 0
      && parseInt(machineData.besitzerId, 10) > 0;
    if (props.setValidState) {
      props.setValidState(requiredIsValide);
    }
    if (props.setData) {
      props.setData(machineData);
    }
  });

  useEffect(() => {
    setCustomerData(getCustomersList());
    setMachinetypeData(getMachineTypesName());
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
            label="Maschinentyp"
            matchingKey="fabrikat"
            onResultSelect={handleMachineTypeSelect}
            elements={machinetypeData}
            setElementId={props.data ? props.data.maschinentypId : 0}
            noResultsMessage="Keine Maschinentypen gefunden"
            isRequired={!props.searchView}
          />

          <SmartInput
            label="Besitzer"
            matchingKey="firma"
            onResultSelect={handleCustomerSelect}
            elements={customerData}
            setElementId={props.data ? props.data.besitzerId : 0}
            noResultsMessage="Keine Maschinentypen gefunden"
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
            validate="number"
            realValidation="date"
            handleChange={handleChange}
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
