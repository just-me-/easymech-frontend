// @flow

import React, {  } from 'react'
import { Button, Header, Form } from 'semantic-ui-react'

import CustomerFields from "./CustomerFields";

function Customer() {
  //const [msg, setMsg] = useState("");
  return (
    <div>
      <Header as='h1' textAlign='center'>
        Kunde (erstellen)
      </Header>
      <Form>
        <CustomerFields/>
        <Button primary content='Speichern' icon='save' labelPosition='left' />
      </Form>
    </div>
  )
}

export default Customer
