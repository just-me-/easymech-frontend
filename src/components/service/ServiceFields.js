// @flow

import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Form, Radio } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import SmartInput from '../shared/SmartInput';
import DatePicker from '../shared/DatePicker';
import ServiceTableMaterial from './ServiceTableMaterial';
import ServiceTableWork from './ServiceTableWork';

import * as validation from '../shared/validation';
import * as sharedCalls from '../shared/functions';
import type { Service } from '../../api/service';

import '../shared/Fields.css';
import './ServiceFields.css';

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
    stueckpreis: '',
    anzahl: '',
    bezeichnung: '',
  };
  const initialWorkStep = {
    bezeichnung: '',
    stundenansatz: '',
    arbeitsstunden: '',
  };

  const [serviceData, setServiceData] = useState(initialData);
  const [customerData, setCustomerData] = useState();
  const [machineData, setMachineData] = useState();

  const [materialList, setMaterialList] = useState((props.data && props.data.materialposten) || []);
  const [workStepList, setWorkStepList] = useState((props.data && props.data.arbeitsschritte) || []);

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
    return value;
  }

  function addWorkStep() {
    if (
      workStepAddRow.bezeichnung.length > 0
      && workStepAddRow.stundenansatz.length > 0
      && workStepAddRow.arbeitsstunden.length > 0
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
      && materialAddRow.stueckpreis.length > 0
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
      [id]: validation.checkDate(value),
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
      deletedToo: true, dataSetter: setCustomerData,
    });
    sharedCalls.getMachines({
      deletedToo: true, dataSetter: setMachineData,
    });
  }, []);

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
      <ServiceTableMaterial
        materialList={materialList}
        removeMaterial={removeMaterial}
        editMaterial={editMaterial}
        materialAddRow={materialAddRow}
        handleMaterial={handleMaterial}
        addMaterial={addMaterial}
      />
      <ServiceTableWork
        workStepList={workStepList}
        removeWorkStep={removeWorkStep}
        editWorkStep={editWorkStep}
        workStepAddRow={workStepAddRow}
        handleWorkStep={handleWorkStep}
        addWorkStep={addWorkStep}
      />
    </div>
  );
}

export default ServiceFields;
