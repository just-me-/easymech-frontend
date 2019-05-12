// @flow

import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import * as api from '../../api/rental';
import RentalFields from './RentalFields';

function Rental() {
  const [rentalData, setRentalData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addRental() {
    if (formIsValid) {
      api
        .addRental(rentalData)
        .then((result) => {
          result = api.checkResponse(result);
          NotificationManager.success(
            'Die Vermietung wurde erfolgreich gespeichert.',
            `Erfasst`,
          );
          setKey(Math.random()); // clear data - fresh form for next entry
        })
        .catch((error) => {
          console.log('Ups, ein Fehler ist aufgetreten', error);
          if (error.code && error.code > 0) {
            NotificationManager.error(error.msg, error.codeMsg);
          } else {
            NotificationManager.error(
              'Beim Speichern der Vermietung ist ein Fehler aufgetreten.',
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
        Maschinenvermietung erfassen
      </Header>
      <Form>
        <RentalFields key={key} setData={setRentalData} setValidState={setFormIsValid} />
        <Button
          primary
          content="Speichern"
          icon="save"
          labelPosition="left"
          floated="right"
          onClick={() => addRental()}
        />
      </Form>
    </div>
  );
}

export default Rental;
