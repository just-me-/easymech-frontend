// @flow

import _ from 'lodash'
import React from 'react';
import { Menu } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Login from "./components/Login";
import Customer from "./components/Customer";
import PrivateRoute from "./components/PrivateRoute";

class App extends React.Component {
  handleMenuClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      const { activeItem } = this.state
      return (
        <Menu pointing secondary color="teal" inverted>
          <Menu.Item
            name='customer'
            active={activeItem === 'customer'}
            onClick={this.handleMenuClick}
            /* Links inside the App are created using the react-router's Link component */
            as={Link}
            to="/"
            />
        </Menu>
      );
    });

    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Router>
          <div>
            <MenuBar />
            <Route
              exact
              path="/"
              render={props => (
                <Customer {...props} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <Login {...props} />
              )}
            />
            {/*
              The following are protected routes that are only available for logged-in users. We also pass the user and token so
              these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
            */}
            <PrivateRoute
              path="/dashboard"
              component={Customer}
            />
          </div>
        </Router>

      </div>
    );
  }
}
export default App;
