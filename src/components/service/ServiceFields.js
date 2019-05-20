// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Header, Form, Table, Button, Icon, Radio,
} from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import SmartInput from '../shared/SmartInput';
import DatePicker from '../shared/DatePicker';
import ServiceRow from './ServiceRow';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';

import '../shared/Fields.css';
import './ServiceFields.css';

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
    beginn: (props.data && sharedCalls.parseIsoDate(props.data.beginn)) || sharedCalls.getToday(),
    ende: (props.data && sharedCalls.parseIsoDate(props.data.ende)) || '',
    status: (props.data && props.data.status) || 1, // geplant=1,  running=2, finished=3
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
  const initialWorkStep = {
    bezeichnung: '',
    stundensatz: '',
    dauer: '',
  };

  const [serviceData, setServiceData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();

  const [materialList, setMaterialList] = useState((props.data && props.data.materialposten) || []);
  const [workStepList, setWorkStepList] = useState(
    (props.data && props.data.arbeitsschritte) || [],
  );

  const [materialAddRow, setMaterialAddRow] = useState(initialMaterial);
  const [workStepAddRow, setWorkStepAddRow] = useState(initialWorkStep);

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

  function handleRadio(element, { value }) {
    setServiceData({ ...serviceData, status: parseInt(value) });
  }

  function handleMaterial(e, { value, validate }) {
    if (validate) {
      value = rowValidation(value, validate);
    }
    setMaterialAddRow({ ...materialAddRow, [e.target.id]: value });
  }

  function handleWorkStep(e, { value, validate }) {
    if (validate) {
      value = rowValidation(value, validate);
    }
    setWorkStepAddRow({ ...workStepAddRow, [e.target.id]: value });
  }

  function rowValidation(value, validate) {
    if (validate === 'number') {
      value = validation.toNumber(value);
    }
    if (validate === 'float') {
      value = validation.toFloat(value);
    }
    if (validate === 'currency') {
      value = validation.toCurrency(value);
    }
    return value;
  }

  function addWorkStep() {
    if (
      workStepAddRow.bezeichnung.length > 0
      && workStepAddRow.stundensatz.length > 0
      && workStepAddRow.dauer.length > 0
    ) {
      setWorkStepList(_.concat(workStepList, workStepAddRow));
      setWorkStepAddRow(initialWorkStep);
      NotificationManager.success('Arbeitsposition erfasst', 'Hinzugefügt');
    } else {
      NotificationManager.error(
        'Es müssen alle Arbeitspositionsfelder ausgefüllt werden.',
        'Fehlende Angaben',
      );
    }
  }

  function editWorkStep(index, data) {
    const arr = [...workStepList];
    arr[index] = data;
    setWorkStepList(arr);
  }

  function removeWorkStep(index: number) {
    const arr = [...workStepList];
    arr.splice(index, 1);
    setWorkStepList(arr);
  }

  function addMaterial() {
    if (
      materialAddRow.bezeichnung.length > 0
      && materialAddRow.preis.length > 0
      && materialAddRow.anzahl.length > 0
    ) {
      setMaterialList(_.concat(materialList, materialAddRow));
      setMaterialAddRow(initialMaterial);
      NotificationManager.success('Materialposition erfasst', 'Hinzugefügt');
    } else {
      NotificationManager.error(
        'Es müssen alle Materialpositionsfelder ausgefüllt werden.',
        'Fehlende Angaben',
      );
    }
  }

  function editMaterial(index, data) {
    const arr = [...materialList];
    arr[index] = data;
    setMaterialList(arr);
  }

  function removeMaterial(index: number) {
    const arr = [...materialList];
    arr.splice(index, 1);
    setMaterialList(arr);
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
      && validation.checkRequired(serviceData.beginn)
      && validation.checkRequired(serviceData.ende)
      && parseInt(serviceData.maschinenId, 10) > 0
      && parseInt(serviceData.kundenId, 10) > 0;
    if (props.setValidState) {
      props.setValidState(requiredIsValid);
    }
    if (props.setData) {
      props.setData({
        ...serviceData,
        materialposten: materialList,
        arbeitsschritte: workStepList,
      });
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

  useEffect(() => {
    console.log("Debug", materialList, workStepList);
  }, [materialList, workStepList]);

  return (
    <div>
      <div className="Form-section">
        <Form.Group widths="equal">
          <DatePicker
            id="beginn"
            label="Startdatum"
            value={serviceData.beginn}
            handleChange={handleChange}
            error={!datesAreValid.beginn}
            callbackSetter={datePicked}
            isRequired
          />
          <DatePicker
            id="ende"
            label="Enddatum"
            value={serviceData.ende}
            handleChange={handleChange}
            error={!datesAreValid.ende}
            callbackSetter={datePicked}
            isRequired
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
          <Form.Field>
            <Radio
              label="Geplant"
              value="1"
              checked={serviceData.status === 1}
              onChange={handleRadio}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="In Bearbeitung"
              value="2"
              checked={serviceData.status === 2}
              onChange={handleRadio}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Abgeschlossen"
              value="3"
              checked={serviceData.status === 3}
              onChange={handleRadio}
            />
          </Form.Field>
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
                setData={editMaterial}
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
                <Form.Input
                  id="preis"
                  value={materialAddRow.preis}
                  onChange={handleMaterial}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="anzahl"
                  value={materialAddRow.anzahl}
                  onChange={handleMaterial}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell />
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
            {_.map(workStepList, (row, index) => (
              <ServiceRow
                index={index}
                key={index}
                data={row}
                rmCall={removeWorkStep}
                setData={editWorkStep}
                type="workstep"
              />
            ))}

            <Table.Row>
              <Table.Cell />
              <Table.Cell>
                <Form.Input
                  id="bezeichnung"
                  value={workStepAddRow.bezeichnung}
                  onChange={handleWorkStep}
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="stundensatz"
                  value={workStepAddRow.stundensatz}
                  onChange={handleWorkStep}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell>
                <Form.Input
                  id="dauer"
                  value={workStepAddRow.dauer}
                  onChange={handleWorkStep}
                  validate="number"
                />
              </Table.Cell>
              <Table.Cell />
              <Table.Cell>
                <Button icon onClick={addWorkStep}>
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
