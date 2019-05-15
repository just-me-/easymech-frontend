// @flow

import React, { useState, useEffect } from 'react';
import { Dropdown, Form, Icon } from 'semantic-ui-react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Portal from 'semantic-ui-react/dist/commonjs/addons/Portal/Portal';

import Machine from '../machine/Machine';
import SmartInput from '../shared/SmartInput';
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
  const [machinportalIsOpen, setOpen] = useState(false);

  function handleMachineSelect(result) {
    setTransactionData({ ...transactionData, maschinenid: result.id });
  }

  function handleCustomerSelect(result) {
    setTransactionData({ ...transactionData, kundenid: result.id });
  }

  function handlePortal() {
    setOpen(!machinportalIsOpen);
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate === 'number') {
      value = validation.toNumber(value);
    }
    if (validate === 'date') {
      value = validation.toDate(value);
      if (props.setValidState) {
        setDateIsValid(value ? validation.checkDate(value) : true);
      }
    }
    setTransactionData({ ...transactionData, [element.target.id]: value });
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
            <Button icon positive disabled={machinportalIsOpen} onClick={handlePortal}>
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
          <NumberInput
            id="datum"
            label="Datum"
            innerLabel="DD.MM.YYYY"
            value={transactionData.datum}
            validate="date"
            handleChange={handleChange}
            error={!dateIsValid}
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
        <Form.Group>
          <Portal open={machinportalIsOpen}>
            <div className="Portal-section">
              <Segment pilled>
                <Machine />

                <Button
                  content="Schliessen"
                  negative
                  onClick={() => {
                    handlePortal();
                    sharedCalls.getMachines({
                      deletedToo: true,
                      dataSetter: setMachineData,
                    });
                  }}
                />
              </Segment>
            </div>
          </Portal>
        </Form.Group>
      </div>
    </div>
  );
}

export default TransactionFields;
