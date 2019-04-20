// @flow

import React, {useState} from 'react'
import {Button, Dimmer, Form, Header, Loader} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";
import Notification from "../Notification";
import MachineTypeFields from "./MachineTypeFields";
import * as api from "../../api/machinetype";
import MachineTypeList from "./MachineTypeList";
function MachineType() {

    const [machineTypeData, setMachineTypeData] = useState({});
    const [searchData, setSearchData] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);
    const [viewState, setViewState] = useState('list');
    const [machineTypeEditData, setMachineTypeEditData] = useState({});


    function addMachineType() {
        if(formIsValid) {
            console.log(machineTypeData);
            api
                .addMachineType(machineTypeData)
                .then((result) => {
                    result = api.checkResponse(result);
                    NotificationManager.success("Der Fahrzeugtyp wurde erfolgreich gespeichert.", machineTypeData.fabrikat +" erfasst");
                })
                .catch(error => {
                    console.log("Ups, ein Fehler ist aufgetreten", error);
                    NotificationManager.error("Beim Speichern ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
                });

        } else {
            if(!formIsValid){
                NotificationManager.info("Bitte füllen Sie alle Pflichtfelder aus!");
            }
        }
    }

    function onEditMachineTypeClick(machineTypeId) {
        setViewState("loader");
        api
            .getMachineType(machineTypeId)
            .then((result) => {
                result = api.checkResponse(result);
                setMachineTypeEditData(result);
                setTimeout(() => setViewState("edit"), 200);
            })
            .catch(error => {
                console.log("Ups, ein Fehler ist aufgetreten", error);
                setViewState("list");
                NotificationManager.error("Beim Laden des Maschinentyps ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
            });
    }

    function deleteMachineType() {
        setViewState("loader");
        api
            .deleteMachineType(machineTypeEditData.id)
            .then((result) => {
                result = api.checkResponse(result);
                setViewState("list");
                NotificationManager.success("Der Fahrzeugtyp wurde erfolgreich gelöscht.", machineTypeEditData.fabrikat +" gelöscht");
            })
            .catch(error => {
                console.log("Ups, ein Fehler ist aufgetreten", error);
                setViewState("edit");
                NotificationManager.error("Beim Löschen ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
            });
    }

    function editMachineType() {
        if(formIsValid) {
            setViewState("loader");
            api
                .updateMachineType(machineTypeEditData)
                .then((result) => {
                    result = api.checkResponse(result);
                    setViewState("list");
                    NotificationManager.success("Der Fahrzeugtyp wurde erfolgreich gespeichert.", machineTypeEditData.fabrikat +" aktualisiert");
                })
                .catch(error => {
                    console.log("Ups, ein Fehler ist aufgetreten", error);
                    setViewState("edit");
                    NotificationManager.error("Beim Speichern ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
                });
        } else {
            if(!formIsValid){
                NotificationManager.info("Bitte füllen Sie alle Pflichtfelder aus!");
            }
        }
    }

    return (
        <div>
            {viewState === 'search' &&
            <div>
                <Header as='h1' textAlign='center'>
                    Maschinentyp suchen
                </Header>
                <Form>
                    <MachineTypeFields data={searchData} setData={setSearchData} searchView/>
                    <Button primary content='Suchen' icon='search' labelPosition='left'
                            onClick={() => setViewState('list')} floated='right'
                    />
                    <Button content='Zurück' icon='arrow left' labelPosition='left'
                            onClick={() => setViewState('list')}
                    />
                </Form>
            </div>
            }

            {viewState === 'list' &&
            <div>
                <Header as='h1' textAlign='center'>
                    Maschinentypen anzeigen
                </Header>
                <MachineTypeList editMachineType={onEditMachineTypeClick} filterData={searchData}/>

                <Button content='Neuen Maschinentyp erfassen' icon='add circle' labelPosition='left'
                        onClick={() => setViewState('add')}
                />
                <Button primary content='Suchen' icon='search' labelPosition='left'
                        onClick={() => setViewState('search')} floated='right'
                />
            </div>
            }


            {viewState === 'add' &&
            <div>
                <Header as='h1' textAlign='center'>
                    Maschinentyp erfassen
                </Header>

                <Form>
                    <MachineTypeFields setData={setMachineTypeData} setValidState={setFormIsValid}/>
                    <Button content='Zurück' icon='arrow left' labelPosition='left'
                            onClick={() => setViewState('list')}
                    />
                    <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                            onClick={() => {
                                addMachineType();
                            }}
                    />
                </Form>
                <Notification/>
            </div>
            }

            {viewState === 'edit' &&
            <div>
                <Header as='h1' textAlign='center'>
                    Maschinentyp bearbeiten
                </Header>
                <Form>
                    <MachineTypeFields data={machineTypeEditData} setData={setMachineTypeEditData}
                                    setValidState={setFormIsValid}
                    />
                    <Button content='Abbrechen' icon='arrow left' labelPosition='left'
                            onClick={() => setViewState('list')}
                    />
                    <Button content='Löschen' icon='trash' labelPosition='left'
                            onClick={() => deleteMachineType()}
                    />
                    <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                            onClick={() => editMachineType()}
                    />
                </Form>
            </div>
            }

            {viewState === 'loader' && // show this view before ajax calls
            <div>
                <Dimmer active inverted>
                    <Loader />
                </Dimmer>
            </div>
            }

        </div>
    )

}

export default MachineType;
