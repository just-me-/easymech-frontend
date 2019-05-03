// @flow

import React, { useState } from 'react';
import { Button, Header, Form } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import * as api from '../../api/customer';

import CustomerFields from './CustomerFields';

function Customer() {
  const [customerData, setCustomerData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addCustomer() {
    if (formIsValid) {
      api
        .addCustomer(customerData)
        .then((result) => {
          result = api.checkResponse(result);
          NotificationManager.success(
            'Der Kunde wurde erfolgreich gespeichert.',
            `${result.firma} erfasst`,
          );
          setKey(Math.random()); // clear data - fresh form for next entry
        })
        .catch((error) => {
          console.log('Ups, ein Fehler ist aufgetreten', error);
          NotificationManager.error(
            'Beim Speichern des Kundens ist ein Fehler aufgetreten.',
            'Bitte erneut versuchen!',
          );
        });
    } else {
      NotificationManager.info('Bitte überprüfen Sie Ihre Eingaben!');
    }
  }

  return (
    <div>
      <Header as="h1" textAlign="center">
        Kunde erfassen
      </Header>
      <Form>
        <CustomerFields key={key} setData={setCustomerData} setValidState={setFormIsValid} />
        <Button
          primary
          content="Speichern"
          icon="save"
          labelPosition="left"
          floated="right"
          onClick={() => addCustomer()}
        />
      </Form>
    </div>
  );
}

export default Customer;
