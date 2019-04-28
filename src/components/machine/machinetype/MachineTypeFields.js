// @flow

import React, {useState, useEffect} from 'react'
import { Header, Form, Label, Input } from 'semantic-ui-react'

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
    nutzlast: (props.data && props.data.nutzlast) || "",
    hubkraft: (props.data && props.data.hubkraft) || "",
    hubhoehe: (props.data && props.data.hubhoehe) || "",
    eigengewicht: (props.data && props.data.eigengewicht) || "",
    fahrzeughoehe: (props.data && props.data.fahrzeughoehe) || "",
    fahrzeuglaenge: (props.data && props.data.fahrzeuglaenge) || "",
    fahrzeugbreite: (props.data && props.data.fahrzeugbreite) || "",
    pneugroesse: (props.data && props.data.pneugroesse) || ""
  };

  const [machineTypeData, setMachineTypeData] = useState(initialData);

  function handleChange(element, { validate }) {
    let value = element.target.value;
    switch(validate) {
      case "number":
        value = validation.toNumber(value);
        break;
      default:
        break;
    }
    setMachineTypeData({...machineTypeData, [element.target.id]: value});
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
            label='Gewicht'
            value={machineTypeData.eigengewicht} validate='number'
            onChange={handleChange}
          />
          <Form.Input
            id='nutzlast'
            label='Nutzlast'
            value={machineTypeData.nutzlast} validate='number'
            onChange={handleChange}
          />
        </Form.Group>
      </div>

      <Header as='h2'>Spezifikationen</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='hubhoehe'
            label='Hubhöhe'
            value={machineTypeData.hubhoehe} validate='number'
            onChange={handleChange}
          />
          <Form.Input
            id='hubkraft'
            label='Hubkraft'
            value={machineTypeData.hubkraft} validate='number'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='pneugroesse'
            label='Pneugrösse'
            value={machineTypeData.pneugroesse} validate='number'
            onChange={handleChange}
          />
          <Form.Input
            id='fahrzeughoehe'
            label='Höhe'
            value={machineTypeData.fahrzeughoehe} validate='number'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Field>
            <label for='fahrzeuglaenge'>Länge</label>
            <Input
              id='fahrzeuglaenge'
              label={{ basic: true, content: 'm' }}
              labelPosition='right'
              value={machineTypeData.fahrzeuglaenge} validate='number'
              onChange={handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label for='fahrzeugbreite'>Breite</label>
            <Input
              id='fahrzeugbreite'
              label={{ basic: true, content: 'm' }}
              labelPosition='right'
              value={machineTypeData.fahrzeugbreite} validate='number'
              onChange={handleChange}
            />
          </Form.Field>

        </Form.Group>
      </div>
    </div>
  )
}

export default MachineTypeFields
