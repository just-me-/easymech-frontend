// @flow

import React, {useState} from 'react'
import {Button, Form, Header} from 'semantic-ui-react'
import * as api from "../../api/customer";
import {NotificationManager} from "react-notifications";
import Notification from "../Notification";
import MachineTypeFields from "./MachineTypeFields";

function MachineType() {

    const [machineTypeData, setMachineTypeData] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);

    function addMachineType() {
        if(formIsValid) {
            /*api
                .addCustomer(machineTypeData)
                .then((result) => {
                    result = api.checkResponse(result);
                    NotificationManager.success("Der Kunde wurde erfolgreich gespeichert.", result.firma+" erfasst");
                })
                .catch(error => {
                    console.log("Ups, ein Fehler ist aufgetreten", error);
                    NotificationManager.error("Beim Speichern ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
                });*/
            console.log(machineTypeData)
        } else {
            if(!formIsValid){
                NotificationManager.info("Bitte füllen Sie alle Pflichtfelder aus!");
            }
        }
    }

    return (
        <div>
            <Header as='h1' textAlign='center'>
                Maschinentyp erfassen
            </Header>
            <Form>
                <MachineTypeFields setData={setMachineTypeData} setValidState={setFormIsValid} />
                <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                        onClick={() => addMachineType()}
                />
            </Form>
            <Notification/>
        </div>
    )

}

export default MachineType;
