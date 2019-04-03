// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Message } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Customer = ({isAuthenticated}: Props) => (
  <div>
    <Header as='h1' color='teal' textAlign='center'>
      Kunde
    </Header>
  </div>
);

export default Customer
