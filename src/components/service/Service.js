// @flow

import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import ServiceFields from './ServiceFields';

function Service() {
  const [serviceData, setServiceData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addService() {
    // tmp - use all varis for no warnings
    console.log('2Do...', serviceData, formIsValid, key);
    setKey(Math.random());
  }

  return (
    <div>
      <Header as="h1" textAlign="center">
        Dienstleistung erfassen
      </Header>
      <Form>
        <ServiceFields key={key} setData={setServiceData} setValidState={setFormIsValid} />
        <Button
          primary
          content="Speichern"
          icon="save"
          labelPosition="left"
          floated="right"
          onClick={() => addService()}
        />
      </Form>
    </div>
  );
}

export default Service;
