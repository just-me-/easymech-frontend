// @flow

import React, {useState, useEffect} from 'react'
import { Header, Form } from 'semantic-ui-react'

import type { Machine} from "../../api/machine";
import * as validation from "../validation"

export type Props = {
  data?: Machine,
  setData?: (Machine) => void,
  setValidState?: (boolean) => void,
  searchView?: boolean
};

function MachineFields(props: Props) {
  const initialData = {
    id: (props.data && props.data.id) || undefined,
    seriennummer: (props.data && props.data.seriennummer) || "",
    mastnummer: (props.data && props.data.mastnummer) || "",
    motorennummer: (props.data && props.data.motorennummer) || "",
    betriebsdauer: (props.data && props.data.betriebsdauer) || "",
    jahrgang: (props.data && props.data.jahrgang) || "",
    notiz: (props.data && props.data.notiz) || "",
    isActive: (props.data && props.data.isActive) || ""
  };

  const [machineData, setMachineData] = useState(initialData);

  function handleChange(element) {
    setMachineData({...machineData, [element.target.id]: element.target.value});
  }

  useEffect(() => {
    const requiredIsValide = validation.checkRequired(machineData.seriennummer);
    if(props.setValidState) {
      props.setValidState(requiredIsValide);
    }

    if(props.setData) {
      props.setData(machineData);
    }
  });

  return (
    <div>
      <Header as='h2'>Seriennummer</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='seriennummer'
            label='Seriennummer'
            placeholder={props.searchView ? '' : 'Pflichtfeld'}
            value={machineData.seriennummer || ""}
            onChange={handleChange}
          />
          <Form.Input
            id='maschinentyp'
            label='Maschinentyp'
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='mastnummer'
            label='Mastnummer'
            value={machineData.mastnummer || ""}
            onChange={handleChange}
          />
          <Form.Input
            id='motorennummer'
            label='Motorennummer'
            value={machineData.motorennummer || ""}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths='equal'>
           <Form.Input
               id='betriebsdauer'
               label='Betriebsdauer'
               value={machineData.betriebsdauer || ""}
               onChange={handleChange}
           />
           <Form.Input
               id='jahrgang'
               label='Jahrgang'
               value={machineData.jahrgang || ""}
               onChange={handleChange}
           />
        </Form.Group>
        <Form.Group widths='equal' className="OneField">
           <Form.Input
               id='notiz'
               label='Notizen'
               value={machineData.notiz || ""}
               onChange={handleChange}
           />
          </Form.Group>
      </div>

    </div>
  )
}

export default MachineFields
