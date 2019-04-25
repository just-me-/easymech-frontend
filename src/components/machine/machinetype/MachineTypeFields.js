// @flow

import React, {useState, useEffect} from 'react'
import { Header, Form } from 'semantic-ui-react'

import type { MachineType} from "../../../api/machinetype";
import * as validation from "../../validation";

export type Props = {
  data?: MachineType,
  setData?: (MachineType) => void,
  setValidState?: (boolean) => void,
  searchView?: boolean
};

function MachineTypeFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    fabrikat: (props.data && props.data.fabrikat) || "",
    motortyp: (props.data && props.data.motortyp) || "",
    nutzlast: (props.data && props.data.nutzlast) || 0,
    hubkraft: (props.data && props.data.hubkraft) || 0,
    hubhoehe: (props.data && props.data.hubhoehe) || 0,
    eigengewicht: (props.data && props.data.eigengewicht) || 0,
    fahrzeughoehe: (props.data && props.data.fahrzeughoehe) || 0,
    fahrzeuglaenge: (props.data && props.data.fahrzeuglaenge) || 0,
    fahrzeugbreite: (props.data && props.data.fahrzeugbreite) || 0,
    pneugroesse: (props.data && props.data.pneugroesse) || 0
  };

  const [machineTypeData, setMachineTypeData] = useState(initialData);

  function handleChange(element) {
    setMachineTypeData({...machineTypeData, [element.target.id]: element.target.value});
  }

  useEffect(() => {
      const requiredIsValide = validation.checkRequired(machineTypeData.fabrikat);
      if(props.setValidState) {
        props.setValidState(requiredIsValide);
      }

      if(props.setData) {
        props.setData(machineTypeData);
      }
  });

  return (
    <div>
      <Header as='h2'>Maschine</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='fabrikat'
            label='Fabrikat'
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
            value={machineTypeData.fabrikat}
            onChange={handleChange}
          />
          <Form.Input
            id='motortyp'
            label='Motortyp'
            value={machineTypeData.motortyp}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='eigengewicht'
            label='Eigengewicht'
            value={machineTypeData.eigengewicht}
            onChange={handleChange}
          />
          <Form.Input
            id='nutzlast'
            label='Nutzlast'
            value={machineTypeData.nutzlast}
            onChange={handleChange}
          />
        </Form.Group>
      </div>

      <Header as='h2'>Spezifikationen Maschine</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='hubhoehe'
            label='Hubhöhe'
            value={machineTypeData.hubhoehe}
            onChange={handleChange}
          />
          <Form.Input
            id='hubkraft'
            label='Hubkraft'
            value={machineTypeData.hubkraft}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='pneugroesse'
            label='Pneugrösse'
            value={machineTypeData.pneugroesse}
            onChange={handleChange}
          />
          <Form.Input
            id='fahrzeughoehe'
            label='Fahrzeughöhe'
            value={machineTypeData.fahrzeughoehe}
            onChange={handleChange}
          />

        </Form.Group>

          <Form.Group widths='equal'>
              <Form.Input
                id='fahrzeuglaenge'
                label='Fahrzeuglänge'
                value={machineTypeData.fahrzeuglaenge}
                onChange={handleChange}
              />
              <Form.Input
                id='fahrzeugbreite'
                label='Breite'
                value={machineTypeData.fahrzeugbreite}
                onChange={handleChange}
              />
          </Form.Group>
      </div>
    </div>
  )
}

export default MachineTypeFields
