// @flow

import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import TransactionFields from './TransactionFields';

import * as api from '../../api/transaction';

function Transaction() {
  const [transactionData, setTransactionData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addTransaction() {
    if (formIsValid) {
      api
        .addTransaction(transactionData)
        .then((result) => {
          result = api.checkResponse(result);
          NotificationManager.success('Die Transaktion wurde erfolgreich erfasst.');
          setKey(Math.random()); // clear data - fresh form for next entry
        })
        .catch((error) => {
          console.log('Ups, ein Fehler ist aufgetreten', error);
          NotificationManager.error(
            'Beim Speichern ist ein Fehler aufgetreten.',
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
        Maschine an - und verkaufen
      </Header>
      <Form>
        <TransactionFields key={key} setData={setTransactionData} setValidState={setFormIsValid} />
        <Button
          primary
          content="Speichern"
          icon="save"
          labelPosition="left"
          floated="right"
          onClick={() => addTransaction()}
        />
      </Form>
    </div>
  );
}

export default Transaction;
