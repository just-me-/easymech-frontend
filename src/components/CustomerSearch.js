// @flow

import React from 'react'
import { Header, Form, Button } from 'semantic-ui-react'

import CustomerFields from "./CustomerFields";

import {
  Link
} from "react-router-dom";

function CustomerSearch() {

  return (
    <div>
      <Header as='h1' textAlign='center'>
        Kunden suchen
      </Header>
      <Form>
        <CustomerFields/>

        <Link to="/customer_list">
          <Button primary content='Suchen' icon='search' labelPosition='left'/>
        </Link>
      </Form>
    </div>
  )
}

export default CustomerSearch
