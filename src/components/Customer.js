// @flow

import React, { useState } from 'react'
import { Button, Grid, Header } from 'semantic-ui-react'

function Customer() {
  const [msg, setMsg] = useState("");

  return (
    <Header as='h1' color='red' textAlign='center'>
      Kunde
    </Header>
  )
}

export default Customer
