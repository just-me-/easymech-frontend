// @flow

import React, { useState, useEffect } from 'react';
import {
  Dropdown, Form, Icon, Modal, Button,
} from 'semantic-ui-react';

import Machine from '../machine/Machine';
import SmartInput from '../shared/SmartInput';
import DatePicker from '../shared/DatePicker';
import NumberInput from '../shared/NumberInput';
import * as sharedCalls from '../shared/functions';
import * as validation from '../shared/validation';

import type { Transaction } from '../../api/transaction';
import type { TypeMachine } from '../../api/machine';

import '../shared/Fields.css';
import './TransactionFields.css';

export type Props = {
  data?: Transaction,
  setData?: Transaction => void,
  setValidState?: boolean => void,
  searchView?: boolean,
  machine?: TypeMachine,
};

function TransactionFields(props: Props) {
  const options = [
    { key: 'Verkauf', text: 'Verkauf einer Maschine erfassen', value: '0' },
    { key: 'Ankauf', text: 'Ankauf einer Maschine erfassen', value: '1' },
  ];

  const initialData = {
    id: (props.data && props.data.id) || undefined,
    preis: (props.data && props.data.preis) || '',
    typ: (props.data && props.data.typ) || 0,
    datum: (props.data && props.data.datum) || sharedCalls.getToday(),
    maschinenid: (props.data && props.data.maschinenid) || '',
    kundenid: (props.data && props.data.kundenid) || '',
  };
  const [transactionData, setTransactionData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();
  const [dateIsValid, setDateIsValid] = useState(true);
  const [machineModalIsOpen, setMachineModalIsOpen] = useState(false);

  function handleMachineSelect(result) {
    setTransactionData({ ...transactionData, maschinenid: result.id });
  }

  function handleCustomerSelect(result) {
    setTransactionData({ ...transactionData, kundenid: result.id });
  }

  function showMachineModal() {
    setMachineModalIsOpen(true);
  }

  function closeMachineModal() {
    setMachineModalIsOpen(false);
    sharedCalls.getMachines({
      deletedToo: true,
      dataSetter: setMachineData,
    });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate && (validate === 'number')) {
      value = validation.toNumber(value);
    }
    if (validate && (validate === 'date')) {
      value = validation.toDate(value);
      if (props.setValidState) {
        setDateIsValid(value ? validation.checkDate(value) : true);
      }
    }
    setTransactionData({ ...transactionData, [element.target.id]: value });
  }

  function datePicked(value, id) {
    setDateIsValid(validation.checkDate(value));
    setTransactionData({ ...transactionData, [id]: value });
  }

  function handleDropDown(element) {
    const value = element.target.innerHTML;
    if (value.includes('Ankauf')) {
      setTransactionData({ ...transactionData, typ: 1 });
    }
  }

  useEffect(() => {
    const requiredIsValid = validation.checkRequired(transactionData.preis)
      && validation.checkDate(transactionData.datum);

    if (props.setValidState) {
      props.setValidState(requiredIsValid);
    }
    if (props.setData) {
      props.setData(transactionData);
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
      <div className="Form-section">
        <Form.Group widths="equal">
          <div className="field hasButton">
            <SmartInput
              id="maschine"
              label="Maschinen"
              matchingKey="seriennummer"
              onResultSelect={handleMachineSelect}
              elements={machineData}
              setElementId={props.data ? props.data.maschinenid : 0}
              noResultsMessage="Keine Maschinen gefunden"
              isRequired={!props.searchView}
            />
            <Button icon positive disabled={machineModalIsOpen} onClick={showMachineModal}>
              <Icon name="add" />
            </Button>
          </div>

          <SmartInput
            id="kunde"
            label="Kunde"
            matchingKey="firma"
            onResultSelect={handleCustomerSelect}
            elements={customerData}
            setElementId={props.data ? props.data.kundenid : 0}
            noResultsMessage="Keine Kunden gefunden"
            isRequired={!props.searchView}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <NumberInput
            id="preis"
            label="Preis"
            innerLabel="CHF"
            value={transactionData.preis}
            validate="number"
            handleChange={handleChange}
          />
          <DatePicker
            id="datum"
            label="Datum"
            value={transactionData.datum}
            handleChange={handleChange}
            error={!dateIsValid}
            callbackSetter={datePicked}
          />
        </Form.Group>
        <Form.Group>
          <Dropdown
            id="typ"
            placeholder="Auswahl Transaktion"
            fluid
            selection
            options={options}
            onChange={handleDropDown}
          />
        </Form.Group>

        <Modal open={machineModalIsOpen}>
          <Modal.Content as={Machine} isIncluded includerCallback={closeMachineModal} />
        </Modal>
      </div>
    </div>
  );
}

export default TransactionFields;