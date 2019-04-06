// @flow

import React from 'react'
import { Header, Form } from 'semantic-ui-react'

function CustomerFields() {
  return (
    <div>
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
    </div>
  )
}

export default CustomerFields
