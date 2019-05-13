// @flow

import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';

import ServiceFields from './ServiceFields';

function Service() {
  const [serviceData, setServiceData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);
  const [key, setKey] = useState(Math.random());

  function addService() {
    console.log("2Do...");
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
