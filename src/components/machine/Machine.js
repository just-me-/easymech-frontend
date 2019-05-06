// @flow

import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import * as api from '../../api/machine';
import MachineFields from './MachineFields';

function Machine() {
  const [machineData, setMachineData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addMachine() {
    if (formIsValid) {
      api
        .addMachine(machineData)
        .then((result) => {
          result = api.checkResponse(result);
          NotificationManager.success(
            'Die Maschine wurde erfolgreich gespeichert.',
            `${result.seriennummer} erfasst`,
          );
          setKey(Math.random()); // clear data - fresh form for next entry
        })
        .catch((error) => {
          console.log('Ups, ein Fehler ist aufgetreten', error);
          if (error.code && error.code > 0) {
            NotificationManager.error(error.msg, error.codeMsg);
          } else {
            NotificationManager.error(
              'Beim Speichern der Maschine ist ein Fehler aufgetreten.',
              'Bitte erneut versuchen!',
            );
          }
        });
    } else {
      NotificationManager.info('Bitte prüfen Sie Ihre Eingabe!');
    }
  }

  return (
    <div>
      <Header as="h1" textAlign="center">
        Maschine erfassen
      </Header>
      <Form>
        <MachineFields key={key} setData={setMachineData} setValidState={setFormIsValid} />
        <Button
          primary
          content="Speichern"
          icon="save"
          labelPosition="left"
          floated="right"
          onClick={() => addMachine()}
        />
      </Form>
    </div>
  );
}

export default Machine;
