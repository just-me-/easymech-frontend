// @flow

import React, { useState, useEffect } from 'react';
import {
  Header, Form, Table, Button, Icon, Input,
} from 'semantic-ui-react';

import NumberInput from '../shared/NumberInput';
import SmartInput from '../shared/SmartInput';
import DatePicker from '../shared/DatePicker';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';

import '../shared/Fields.css';

// import type { Service } from '../../api/service';

export type Props = {
  data?: any, // 2do
  setData?: any => void, // 2do
  setValidState?: boolean => void,
};

function ServiceFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    startdatum: (props.data && props.data.startdatum) || sharedCalls.getToday(),
    enddatum: (props.data && props.data.enddatum) || '',
    maschinenId: (props.data && props.data.maschinenId) || '',
    kundenId: (props.data && props.data.kundenId) || '',
  };

  const [serviceData, setServiceData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();

  const [datesAreValid, setDatesAreValid] = useState({
    startdatum: true,
    enddatum: true,
  });

  function handleMachineSelect(result) {
    setServiceData({ ...serviceData, maschinenId: result.id });
  }

  function handleCustomerSelect(result) {
    setServiceData({ ...serviceData, kundenId: result.id });
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
    setServiceData({ ...serviceData, [element.target.id]: value });
  }

  useEffect(() => {
    const requiredIsValide = Object.values(datesAreValid).every(val => val === true)
      && parseInt(serviceData.maschinenId, 10) > 0
      && parseInt(serviceData.kundenId, 10) > 0;
    if (props.setValidState) {
      props.setValidState(requiredIsValide);
    }
    if (props.setData) {
      props.setData(serviceData);
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
          
          <DatePicker
            id="startdatum"
            label="Startdatum"
            innerLabel="DD.MM.YYYY"
            value={serviceData.startdatum}
            validate="date"
            handleChange={handleChange}
            error={!datesAreValid.startdatum}
          />

          <NumberInput
            id="enddatum"
            label="Enddatum"
            innerLabel="DD.MM.YYYY"
            value={serviceData.enddatum}
            validate="date"
            handleChange={handleChange}
            error={!datesAreValid.enddatum}
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
      </div>

      <Header as="h2">Material</Header>
      <div className="Form-section">
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Pos</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              <Table.HeaderCell>Stückpreis</Table.HeaderCell>
              <Table.HeaderCell>Anzahl</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Löschen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell width="1">1</Table.Cell>
              <Table.Cell width="7">
                <Input value="Motoröl" />
              </Table.Cell>
              <Table.Cell width="3">
                <Input value="10.00" />
              </Table.Cell>
              <Table.Cell width="2">
                <Input value="10" />
              </Table.Cell>
              <Table.Cell width="3">100.00 CHF</Table.Cell>
              <Table.Cell>
                <Button icon>
                  <Icon name="trash alternate" />
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Input />
              </Table.Cell>
              <Table.Cell>
                <Input />
              </Table.Cell>
              <Table.Cell>
                <Input />
              </Table.Cell>
              <Table.Cell>100.00 CHF</Table.Cell>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <Header as="h2">Arbeit</Header>
      <div className="Form-section">
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Pos</Table.HeaderCell>
              <Table.HeaderCell>Beschreibung</Table.HeaderCell>
              <Table.HeaderCell>Stundensatz</Table.HeaderCell>
              <Table.HeaderCell>Stunden</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell>Löschen</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell width="1">1</Table.Cell>
              <Table.Cell width="7">
                <Input value="Motoröl eingefüllt" />
              </Table.Cell>
              <Table.Cell width="3">
                <Input value="10.00" />
              </Table.Cell>
              <Table.Cell width="2">
                <Input value="10" />
              </Table.Cell>
              <Table.Cell width="3">100.00 CHF</Table.Cell>
              <Table.Cell>
                <Button icon>
                  <Icon name="trash alternate" />
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Input />
              </Table.Cell>
              <Table.Cell>
                <Input />
              </Table.Cell>
              <Table.Cell>
                <Input />
              </Table.Cell>
              <Table.Cell>100.00 CHF</Table.Cell>
              <Table.Cell />
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default ServiceFields;
