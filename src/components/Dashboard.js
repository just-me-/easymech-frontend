// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Message } from 'semantic-ui-react'

export type Props = {
  isAuthenticated: boolean,
}

const Dashboard = ({isAuthenticated}: Props) => (
  <div>
    <Header as='h1' color='red' textAlign='center'>
      Dashboard
    </Header>
  </div>
);

export default Dashboard
