// @flow

import React, {useState, useEffect} from 'react'
import { Header, Form } from 'semantic-ui-react'

function CustomerFields(props) {
  const [customerData, setCustomerData] = useState(props.data ? props.data : {});

  function handleChange(ele) {
    setCustomerData({...customerData, [ele.target.id]: ele.target.value});
  }

  useEffect(() => {
    console.log(customerData);
  });

  return (
    <div>
      <Header as='h2'>Firma</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='firma'
            label='Name'
            value={customerData.firma}
            onChange={handleChange}
          />
          <Form.Input
            id='adresse'
            label='Adresse'
            value={customerData.adresse}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='plz'
            label='PLZ'
            value={customerData.plz}
            onChange={handleChange}
          />
          <Form.Input
            id='ort'
            label='Ort'
            value={customerData.ort}
            onChange={handleChange}
          />
        </Form.Group>
      </div>

      <Header as='h2'>Kontakt</Header>
      <div className="Form-section">
        <Form.Group widths='equal'>
          <Form.Input
            id='vorname'
            label='Vorname'
            value={customerData.vorname}
            onChange={handleChange}
          />
          <Form.Input
            id='nachname'
            label='Nachname'
            value={customerData.nachname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='email'
            label='E-Mail'
            value={customerData.email}
            onChange={handleChange}
          />
          <Form.Input
            id='telefon'
            label='Tel.'
            value={customerData.telefon}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            id='notiz'
            label='Notizen'
            value={customerData.notiz}
            onChange={handleChange}
          />
        </Form.Group>
      </div>
    </div>
  )
}

export default CustomerFields
