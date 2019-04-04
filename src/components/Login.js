// @flow

import React from "react";
import { Redirect, Link } from "react-router-dom";

import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export type Props = {
  /* Callback to submit an authentication request to the server */
  authenticate: (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => void,
  /* We need to know what page the user tried to access so we can
     redirect after logging in */
  location: {
    state?: {
      from: string
    }
  }
};

class Login extends React.Component<Props, *> {
  state = {
    login: "",
    password: "",
    redirectToReferrer: false
  };

  handleSubmit = (event: Event) => {
    event.preventDefault();
    const { login, password } = this.state;

    this.props.authenticate(login, password, error => {
      if (error) {
        this.setState({ error });
      } else {
        this.setState({ redirectToReferrer: true, error: null });
      }
    });
  };

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" }
    };
    const { redirectToReferrer, error } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (this.props.isAuthenticated) ? <Redirect to={from} /> : (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>

         <Header as='h1' color='red' textAlign='center' style={{marginTop: '2rem'}}>
          Login EasyMech
         </Header>

          <Form size='large'>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Login'
                onChange={this.handleLoginChanged}
                value={this.state.login}
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={this.handlePasswordChanged}
                value={this.state.password}
              />

              <Button color='red' fluid size='large' onClick={this.handleSubmit}>
                Login
              </Button>

              {error && <Message negative>
                          <Message.Header>Es ist ein Fehler aufgetreten!</Message.Header>
                          <p>Bitte überprüfen Sie Ihre Eingaben.</p>
                        </Message>
              }

            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
