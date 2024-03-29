// @flow

import React, { useState, useEffect } from 'react';
import { Header, Form } from 'semantic-ui-react';

import NumberInput from '../../shared/NumberInput';
import * as validation from '../../shared/validation';

import '../../shared/Fields.css';

import type { MachineType } from '../../../api/machinetype';

export type Props = {
  data?: MachineType,
  setData?: MachineType => void,
  setValidState?: boolean => void,
  searchView?: boolean,
};

function MachineTypeFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    fabrikat: (props.data && props.data.fabrikat) || '',
    motortyp: (props.data && props.data.motortyp) || '',
    nutzlast: (props.data && props.data.nutzlast) || '',
    hubkraft: (props.data && props.data.hubkraft) || '',
    hubhoehe: (props.data && props.data.hubhoehe) || '',
    eigengewicht: (props.data && props.data.eigengewicht) || '',
    maschinenhoehe: (props.data && props.data.maschinenhoehe) || '',
    maschinenlaenge: (props.data && props.data.maschinenlaenge) || '',
    maschinenbreite: (props.data && props.data.maschinenbreite) || '',
    pneugroesse: (props.data && props.data.pneugroesse) || '',
  };

  const [machineTypeData, setMachineTypeData] = useState(initialData);

  function handleChange(element, { validate }) {
    let value = element.target.value;
    if (validate && validate === 'number') {
      value = validation.toNumber(value);
    }
    setMachineTypeData({ ...machineTypeData, [element.target.id]: value });
  }

  useEffect(() => {
    const requiredIsValide = validation.checkRequired(machineTypeData.fabrikat);
    if (props.setValidState) {
      props.setValidState(requiredIsValide);
    }

    if (props.setData) {
      props.setData(machineTypeData);
    }
  });

  return (
    <div>
      <div className="Form-section">
        <Form.Group widths="equal">
          <Form.Input
            id="fabrikat"
            label="Fabrikat"
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
            value={machineTypeData.fabrikat}
            onChange={handleChange}
          />
          <Form.Input
            id="motortyp"
            label="Motortyp"
            value={machineTypeData.motortyp}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <NumberInput
            id="eigengewicht"
            label="Gewicht"
            innerLabel="kg"
            value={machineTypeData.eigengewicht}
            validate="number"
            handleChange={handleChange}
          />
          <NumberInput
            id="nutzlast"
            label="Nutzlast"
            innerLabel="kg"
            value={machineTypeData.nutzlast}
            validate="number"
            handleChange={handleChange}
          />
        </Form.Group>
      </div>

      <Header as="h2">Spezifikationen</Header>
      <div className="Form-section">
        <Form.Group widths="equal">
          <NumberInput
            id="hubhoehe"
            label="Hubhöhe"
            innerLabel="cm"
            value={machineTypeData.hubhoehe}
            validate="number"
            handleChange={handleChange}
          />
          <NumberInput
            id="hubkraft"
            label="Hubkraft"
            innerLabel="kg"
            value={machineTypeData.hubkraft}
            validate="number"
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <NumberInput
            id="pneugroesse"
            label="Pneugrösse"
            innerLabel="cm"
            value={machineTypeData.pneugroesse}
            validate="number"
            handleChange={handleChange}
          />
          <NumberInput
            id="maschinenhoehe"
            label="Höhe"
            innerLabel="cm"
            value={machineTypeData.maschinenhoehe}
            validate="number"
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths="equal">
          <NumberInput
            id="maschinenlaenge"
            label="Länge"
            innerLabel="cm"
            value={machineTypeData.maschinenlaenge}
            validate="number"
            handleChange={handleChange}
          />
          <NumberInput
            id="maschinenbreite"
            label="Breite"
            innerLabel="cm"
            value={machineTypeData.maschinenbreite}
            validate="number"
            handleChange={handleChange}
          />
        </Form.Group>
      </div>
    </div>
  );
}

export default MachineTypeFields;
