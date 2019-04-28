// @flow

import React, {useState, useEffect} from 'react'
import { Header, Form } from 'semantic-ui-react'

import NumberInput from "../../NumberInput"
import * as validation from "../../validation";

import type { MachineType} from "../../../api/machinetype";

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
          <NumberInput
            id='eigengewicht'
            label='Gewicht' innerLabel='kg'
            value={machineTypeData.eigengewicht} validate='number'
            handleChange={handleChange}
          />
          <NumberInput
            id='nutzlast'
            label='Nutzlast' innerLabel='kg'
            value={machineTypeData.nutzlast} validate='number'
            handleChange={handleChange}
          />
        </Form.Group>
      </div>

      <Header as='h2'>Spezifikationen</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <NumberInput
            id='hubhoehe'
            label='Hubhöhe' innerLabel='cm'
            value={machineTypeData.hubhoehe} validate='number'
            handleChange={handleChange}
          />
          <NumberInput
            id='hubkraft'
            label='Hubkraft' innerLabel='kg'
            value={machineTypeData.hubkraft} validate='number'
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <NumberInput
            id='pneugroesse'
            label='Pneugrösse' innerLabel='cm'
            value={machineTypeData.pneugroesse} validate='number'
            handleChange={handleChange}
          />
          <NumberInput
            id='fahrzeughoehe'
            label='Höhe' innerLabel='cm'
            value={machineTypeData.fahrzeughoehe} validate='number'
            handleChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <NumberInput
            id='fahrzeuglaenge'
            label='Länge' innerLabel='cm'
            value={machineTypeData.fahrzeuglaenge} validate='number'
            handleChange={handleChange}
          />
          <NumberInput
            id='fahrzeugbreite'
            label='Breite' innerLabel='cm'
            value={machineTypeData.fahrzeugbreite} validate='number'
            handleChange={handleChange}
          />
        </Form.Group>
      </div>
    </div>
  )
}

export default MachineTypeFields
