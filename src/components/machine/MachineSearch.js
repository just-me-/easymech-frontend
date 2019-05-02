// @flow

import React, { useState } from 'react'
import { Header, Form, Button, Dimmer, Loader } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications';

import * as api from "../../api/machine";

import MachineList from "./MachineList";
import MachineFields from "./MachineFields";

export type Props = {
  location: {
    state: {
      listRedirect?: string
    }
  }
};

function MachineSearch(props: Props) {
  const initState = (props.location.state && props.location.state.listRedirect) ? "list" : "search";
  const [viewState, setViewState] = useState(initState);

  const [searchData, setSearchData] = useState({});
  const [machineEditData, setMachineEditData] = useState({});
  const [key, setKey] = useState(Math.random());
  const [formIsValid, setFormIsValid] = useState(true); //alrdy saved, unchanged entries are valid

  function saveMachine() {
    if(formIsValid) {
      setViewState("loader");
      api
        .updateMachine(machineEditData)
        .then((result) => {
            result = api.checkResponse(result);
            setViewState("list");
            NotificationManager.success("Die Maschine wurde erfolgreich gespeichert.", machineEditData.seriennummer +" aktualisiert");
        })
        .catch(error => {
          console.log("Ups, ein Fehler ist aufgetreten", error);
          setViewState("edit");
          NotificationManager.error("Beim Speichern ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
        });
    } else {
      NotificationManager.info("Bitte überprüfen Sie Ihre Eingaben!");
    }
  }

  function deleteMachine() {
    setViewState("loader");
    api
      .deleteMachine(machineEditData.id)
      .then((result) => {
          result = api.checkResponse(result);
          setViewState("list");
          NotificationManager.success("Die Maschine wurde erfolgreich gelöscht.", machineEditData.seriennummer+" gelöscht");
      })
      .catch(error => {
        console.log("Ups, ein Fehler ist aufgetreten", error);
        setViewState("edit");
        NotificationManager.error("Beim Löschen ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
      });
  }

  function onEditMachineClick(machineId) {
    setViewState("loader");
    api
      .getMachine(machineId)
      .then((result) => {
        setKey(Math.random()); // be sure that a fresh form is prepered
        result = api.checkResponse(result);
        setMachineEditData(result);
        setTimeout(() => setViewState("edit"), 200);
      })
      .catch(error => {
        console.log("Ups, ein Fehler ist aufgetreten", error);
        setViewState("list");
        NotificationManager.error("Beim Laden der Maschine ist ein Fehler aufgetreten.", "Bitte erneut versuchen!");
      });
  }

  return (
    <div>
        {viewState === 'search' &&
        <div>
          <Header as='h1' textAlign='center'>
            Maschine suchen
          </Header>
          <Form>
            <MachineFields data={searchData} setData={setSearchData} searchView/>
            <Button primary content='Suchen' icon='search' labelPosition='left'
                    onClick={() => setViewState('list')} floated='right'
            />
          </Form>
        </div>
        }

        {viewState === 'list' &&
        <div>
          <MachineList editMachine={onEditMachineClick} filterData={searchData}/>
          <Button content='Zurück' icon='arrow left' labelPosition='left'
                  onClick={() => setViewState('search')}
          />
        </div>
        }

        {viewState === 'edit' &&
        <div>
          <Header as='h1' textAlign='center'>
            Maschine bearbeiten
          </Header>
          <Form>
            <MachineFields data={machineEditData} setData={setMachineEditData}
                            setValidState={setFormIsValid} key={key}
            />
            <Button content='Abbrechen' icon='arrow left' labelPosition='left'
                    onClick={() => setViewState('list')}
            />
            <Button content='Löschen' icon='trash' labelPosition='left'
                    onClick={() => deleteMachine()}
            />
            <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                    onClick={() => saveMachine()}
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

export default MachineSearch;
