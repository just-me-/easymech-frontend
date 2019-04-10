// @flow

import React from "react";
import { Grid } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Customer from "./components/customer/Customer";
import CustomerSearch from "./components/customer/CustomerSearch";
import CustomerList from "./components/customer/CustomerList";
import Machine from "./components/machine/Machine";
import Machinetype from "./components/machine/Machinetype";
import Action from "./components/action/Action";
import ActionSearch from "./components/action/ActionSearch";
import Rental from "./components/transaction/Rental";
import Sell from "./components/transaction/Sell";
import Buy from "./components/transaction/Buy";
import MachinetypeSearch from "./components/machine/MachinetypeSearch";
import MachineSearch from "./components/machine/MachineSearch";

import AppMenu from "./components/AppMenu";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css"

type Props = {};
type State = {
  isAuthenticated: boolean,
  token: ?string
};

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    const token = sessionStorage.getItem("token");

    if (token) {
      this.state = {
        isAuthenticated: true,
        token
      };
    } else {
      this.state = {
        isAuthenticated: false,
        token: undefined
      };
    }
  }

  authenticate = (
    login: string,
    password: string,
    callback: (error: ?Error) => void
  ) => {
    this.setState({ isAuthenticated: true, token: "myToken" });
    sessionStorage.setItem("token", "myToken");
    callback(null);
    /*
    api
      .login(login, password)
      .then(({ token }) => {
        this.setState({ isAuthenticated: true, token });
        sessionStorage.setItem("token", token);
        callback(null);
      })
      .catch(error => callback(error));
    */
  };

  signout = (callback: () => void) => {
    this.setState({
      isAuthenticated: false,
      token: undefined
    });
    sessionStorage.removeItem("token");
    callback();
  };

  render() {
    const { isAuthenticated, token } = this.state;

    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      if (isAuthenticated) {
        return (
          <AppMenu history={history} signout={this.signout} />
        );
      } else {
        return null;
      }
    });

    return (
      <Router>
        <Route
          exact
          path="/"
          render={props => (
            <Login {...props} authenticate={this.authenticate} isAuthenticated={isAuthenticated} />
          )}
        />
        <Grid id="App-grid" stackable>
          <Grid.Column id="Menu-grid" width={4}>
            <MenuBar />
          </Grid.Column>
          {/*
            The following are protected routes that are only available for logged-in users. We also pass the user and token so
            these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
          */}

          <Grid.Column id="Content-grid" width={12}>
            <PrivateRoute
              path="/dashboard"
              isAuthenticated={isAuthenticated}
              token={token}
              component={Dashboard}
            />
            <PrivateRoute
              path="/customer"
              isAuthenticated={isAuthenticated}
              token={token}
              component={Customer}
            />
            <PrivateRoute
              path="/customer_search"
              isAuthenticated={isAuthenticated}
              token={token}
              component={CustomerSearch}
            />
            <PrivateRoute
              path="/customer_list"
              isAuthenticated={isAuthenticated}
              token={token}
              component={CustomerList}
            />
              <PrivateRoute
                  path="/machine"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Machine}
              />
              <PrivateRoute
                  path="/machine_search"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={MachineSearch}
              />
              <PrivateRoute
                  path="/machinetyp"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Machinetype}
              />
              <PrivateRoute
                  path="/machinetyp_search"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={MachinetypeSearch}
              />
              <PrivateRoute
                  path="/action"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Action}
              />
              <PrivateRoute
                  path="/action_search"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={ActionSearch}
              />
              <PrivateRoute
                  path="/rental"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Rental}
              />
              <PrivateRoute
                  path="/machine_buy"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Buy}
              />
              <PrivateRoute
                  path="/machine_sell"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Sell}
              />

          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default App;
