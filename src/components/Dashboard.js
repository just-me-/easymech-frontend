// @flow

import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Header, Message } from 'semantic-ui-react'

import Login from "./Login";

export type Props = {
  isAuthenticated: boolean,
}

// acts as the home for the logged in user
const Dashboard = ({isAuthenticated}: Props) => (
  <div>
    { isAuthenticated
      ? <div>
          <Header as='h1' color='teal' textAlign='center'>
           Dashboard
          </Header>
        </div>
      : <div>
          <Header as='h1' color='teal' textAlign='center'>
           EasyMech
          </Header>
          <div style={{ textAlign: 'center' }}>
            <Button color='teal'  size='large'
                    content='Zum Login'
                    as={Link}
                    to="/login"
            />
          </div>
        </div>
    }
  </div>
);

export default Dashboard
