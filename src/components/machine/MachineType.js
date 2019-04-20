// @flow

import React, {useState} from 'react'
import {Button, Dimmer, Form, Header, Loader} from 'semantic-ui-react'
import {NotificationManager} from "react-notifications";
import Notification from "../Notification";
import MachineTypeFields from "./MachineTypeFields";

function MachineType() {

    const [machineTypeData, setMachineTypeData] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);
    const [viewState, setViewState] = useState('list');

    function addMachineType() {
        if(formIsValid) {
            console.log(machineTypeData)
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
                    <Button primary content='Suchen' icon='search' labelPosition='left'
                            onClick={() => setViewState('search')} floated='right'
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
                <p>Liste mit Maschinentypen....</p>
                <p>Liste mit Maschinentypen....</p>
                <p>Liste mit Maschinentypen....</p>
                <Button content='Neuen Maschninentyp erfassen' icon='add circle' labelPosition='left'
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
                                setViewState('list')
                            }}
                    />
                </Form>
                <Notification/>
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
