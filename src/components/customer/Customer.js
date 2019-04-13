// @flow

import React, {useState} from 'react'
import { Button, Header, Form } from 'semantic-ui-react'

import * as api from "../../api/customer";

import CustomerFields from "./CustomerFields";

function Customer() {
  const [customerData, setCustomerData] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  function addCustomer() {
    if(formIsValid) {
      api
        .addCustomer(customerData)
        .then((result) => {
          result = api.checkResponse(result);
          console.log("Juhuu..", result);
        })
        .catch(error => console.log("Ups, ein Fehler ist aufgetreten", error));
    } else {
      console.log("Pflichtfelder nicht ausgefüllt oder sonst ein Fehler... 2Do")
    }
  }

  return (
    <div>
      <Header as='h1' textAlign='center'>
        Kunde erfassen
      </Header>
      <Form>
        <CustomerFields setData={setCustomerData} setValidState={setFormIsValid}/>
        <Button primary content='Speichern' icon='save' labelPosition='left' floated='right'
                onClick={() => addCustomer()}
        />
      </Form>
    </div>
  )
}

export default Customer
