// @flow

import React, { useState } from 'react'
import { Button, Grid, Header, Form, Input } from 'semantic-ui-react'

function Customer() {
  //const [msg, setMsg] = useState("");
  return (
    <div>
      <Header as='h1' textAlign='center'>
        Kunde (erstellen)
      </Header>
      <Form>
        <Header as='h2'>Firma</Header>
        <div className="Form-section">
          <Form.Group widths='equal'>
            <Form.Input
              id='company_name'
              label='Name'
            />
            <Form.Input
              id='company_address'
              label='Adresse'
            />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input
              id='company_zip'
              label='PLZ'
            />
            <Form.Input
              id='company_location'
              label='Ort'
            />
          </Form.Group>
        </div>

        <Header as='h2'>Kontakt</Header>
        <div className="Form-section">
          <Form.Group widths='equal'>
            <Form.Input
              id='contact_firstname'
              label='Vorname'
            />
            <Form.Input
              id='contact_lastname'
              label='Nachname'
            />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input
              id='contact_mail'
              label='E-Mail'
            />
            <Form.Input
              id='contact_phone'
              label='Tel.'
            />
          </Form.Group>

          <Form.Group widths='equal'>
            <Form.Input
              id='contact_notes'
              label='Notizen'
            />
          </Form.Group>
        </div>
        <Button primary content='Speichern' icon='save' labelPosition='left' />
      </Form>
    </div>
  )
}

export default Customer
