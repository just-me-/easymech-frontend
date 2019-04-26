// @flow

import React, {useState} from 'react'
import {Button, Form, Header} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";

import * as api from "../../api/machine";
import MachineFields from "../machine/MachineFields";

function Machine() {
  const [machineData, setMachineData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  function addMachine() {
    if(formIsValid) {
      console.log(machineData);
      api
        .addMachine(machineData)
        .then((result) => {
          result = api.checkResponse(result);
          NotificationManager.success("Die Maschine wurde erfolgreich gespeichert.", result.seriennummer +" erfasst");
        })
        .catch(error => {
          console.log("Ups, ein Fehler ist aufgetreten", error);
          NotificationManager.error("Beim Speichern ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
        });
    } else {
        if(!formIsValid){
          NotificationManager.info("Bitte prüfen Sie Ihre Eingabe!");
        }
    }
  }

  return (
    <div>
      <Header as='h1' textAlign='center'>
        Maschine erfassen
      </Header>
      <Form>
        <MachineFields setData={setMachineData} setValidState={setFormIsValid} />
        <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                onClick={() => addMachine()}
        />
      </Form>
    </div>
  )
}

export default Machine;
