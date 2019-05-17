// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Form, Table, Button, Icon, Input,
} from 'semantic-ui-react';

// import NumberInput from '../shared/NumberInput';
import SmartInput from '../shared/SmartInput';
import DatePicker from '../shared/DatePicker';
import ServiceRow from './ServiceRow';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';

import '../shared/Fields.css';

import type { Service } from '../../api/service';

export type Props = {
  data?: Service,
  setData?: Service => void,
  setValidState?: boolean => void,
};

function ServiceFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    bezeichnung: (props.data && props.data.bezeichnung) || '',
    beginn: (props.data && props.data.beginn) || sharedCalls.getToday(),
    ende: (props.data && props.data.ende) || '',
    status: (props.data && props.data.status) || '',
    maschinenId: (props.data && props.data.maschinenId) || '',
    kundenId: (props.data && props.data.kundenId) || '',
    materialposten: (props.data && props.data.materialposten) || [],
    arbeitsschritte: (props.data && props.data.arbeitsschritte) || [],
  };
  const initialMaterial = {
    preis: '',
    anzahl: '',
    bezeichnung: '',
  };
  const initialWorkstep = {
    bezeichnung: '',
    stundensatz: '',
    dauer: '',
  };

  const [serviceData, setServiceData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();

  const [materialList, setMaterialList] = useState([]);
  const [workstepList, setWorkstepList] = useState([]);

  const [materialAddRow, setMaterialAddRow] = useState(initialMaterial);
  const [workstepAddRow, setWorkstepAddRow] = useState(initialWorkstep);

  const [datesAreValid, setDatesAreValid] = useState({
    beginn: true,
    ende: true,
  });

  function handleMachineSelect(result) {
    setServiceData({ ...serviceData, maschinenId: result.id });
  }

  function handleCustomerSelect(result) {
    setServiceData({ ...serviceData, kundenId: result.id });
  }

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate && validate === 'number') {
      value = validation.toNumber(value);
    }
    if (validate && validate === 'date') {
      value = validation.toDate(value);
      if (props.setValidState) {
        setDatesAreValid({
          ...datesAreValid,
          [element.target.id]: value ? validation.checkDate(value) : true,
        });
      }
    }
    setServiceData({ ...serviceData, [element.target.id]: value });
  }

  function handleMaterial(e, { value }) {
    // 2Do: if valid...
    setMaterialAddRow({ ...materialAddRow, [e.target.id]: value });
  }

  function handleWorkstep(e, { value }) {
    // 2Do: if valid...
    setWorkstepAddRow({ ...workstepAddRow, [e.target.id]: value });
  }

  function addWorkstep() {
    // 2Do: if valid...
    setWorkstepList(_.concat(workstepList, workstepAddRow));
    setWorkstepAddRow(initialWorkstep);
  }

  function addMaterial() {
    // 2Do: if valid...
    setMaterialList(_.concat(materialList, materialAddRow));
    setMaterialAddRow(initialMaterial);
  }

  function removeWorkstep(index) {
    // setWorkstepList(_.pullAt(workstepList, index));
    setWorkstepList(
      _.remove(workstepList, (arr, i) => i === index),
    );
  }

  function removeMaterial(index) {
    setMaterialList(_.pullAt(materialList, index));
  }

  function datePicked(value, id) {
    setDatesAreValid({
      ...datesAreValid,
      id: validation.checkDate(value),
    });
    setServiceData({ ...serviceData, [id]: value });
  }

  useEffect(() => {
    const requiredIsValid = Object.values(datesAreValid).every(val => val === true)
      && parseInt(serviceData.maschinenId, 10) > 0
      && parseInt(serviceData.kundenId, 10) > 0;
    if (props.setValidState) {
      props.setValidState(requiredIsValid);
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

  useEffect(
    () => {
      console.log('List changed', workstepList);
    },
    [workstepList],
  );

  return (
    <div>
      <div className="Form-section">
        <Form.Group widths="equal">
          <DatePicker
            id="startdatum"
            label="Startdatum"
            value={serviceData.beginn}
            handleChange={handleChange}
            error={!datesAreValid.beginn}
            callbackSetter={datePicked}
          />
          <DatePicker
            id="enddatum"
            label="Enddatum"
            value={serviceData.ende}
            handleChange={handleChange}
            error={!datesAreValid.ende}
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
            {_.map(materialList, (row, index) => (
              <ServiceRow
                index={index}
                key={index}
                data={row}
                rmCall={removeMaterial}
                type="material"
              />
            ))}

            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Form.Input
                  id="bezeichnung"
                  value={materialAddRow.bezeichnung}
                  onChange={handleMaterial}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input id="preis" value={materialAddRow.preis} onChange={handleMaterial} />
              </Table.Cell>
              <Table.Cell>
                <Form.Input id="anzahl" value={materialAddRow.anzahl} onChange={handleMaterial} />
              </Table.Cell>
              <Table.Cell>100.00 CHF</Table.Cell>
              <Table.Cell>
                <Button icon onClick={addMaterial}>
                  <Icon name="add" />
                </Button>
              </Table.Cell>
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
            {_.map(workstepList, (row, index) => (
              <ServiceRow
                index={index}
                key={index}
                data={row}
                rmCall={removeWorkstep}
                type="workstep"
              />
            ))}

            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Form.Input
                  id="bezeichnung"
                  value={workstepAddRow.bezeichnung}
                  onChange={handleWorkstep}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="stundensatz"
                  value={workstepAddRow.stundensatz}
                  onChange={handleWorkstep}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input id="dauer" value={workstepAddRow.dauer} onChange={handleWorkstep} />
              </Table.Cell>
              <Table.Cell>100.00 CHF</Table.Cell>
              <Table.Cell>
                <Button icon onClick={addWorkstep}>
                  <Icon name="add" />
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default ServiceFields;
