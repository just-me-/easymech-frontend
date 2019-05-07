// @flow

import React, { useState } from 'react';
import { Button, Header, Form } from 'semantic-ui-react';

import * as customerCalls from '../shared/functions';

import CustomerFields from './CustomerFields';

function Customer() {
  const [customerData, setCustomerData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addCustomer() {
    customerCalls.saveCustomer({
      customerData,
      formIsValid,
      setKey,
      exists: false,
    });
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
