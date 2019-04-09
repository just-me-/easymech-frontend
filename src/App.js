// @flow

import React from "react";
import { Grid, Menu, Icon } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Customer from "./components/customer/Customer";
import CustomerSearch from "./components/customer/CustomerSearch";
import CustomerList from "./components/customer/CustomerList";
import Machine from "./components/machine/Machine";
import Machinetype from "./components/machine/Machinetype";
import PrivateRoute from "./components/PrivateRoute";

import logo from "./resources/Logo.png"
import "./App.css"

//import * as api from "./api/authentication";

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
        token,
        activeItem: 'dashboard'
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

  handleMenuClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { isAuthenticated, token } = this.state;

    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      if (isAuthenticated) {
        const { activeItem } = this.state

        return (
          <Menu vertical color="red" className="Main-navigation">
            <Menu.Item id="Logo">
              <img src={logo} alt="EasyMech Logo"/>
            </Menu.Item>

            <Menu.Item
              name='dashboard'
              active={activeItem === 'dashboard'}
              onClick={this.handleMenuClick}
              as={Link}
              to="/dashboard"
              icon="clipboard list"
            />

            <Menu.Item>
              <Menu.Header>
                <Icon name='address book outline' />
                Kunden
              </Menu.Header>
              <Menu.Menu>
                <Menu.Item
                  content="Erstellen"
                  name='add_customer'
                  active={activeItem === 'add_customer'}
                  onClick={this.handleMenuClick}
                  as={Link}
                  to="/customer"
                />
                <Menu.Item
                  content="Suchen"
                  name='search_customer'
                  active={activeItem === 'search_customer'}
                  onClick={this.handleMenuClick}
                  as={Link}
                  to="/customer_search"
                />
              </Menu.Menu>
            </Menu.Item>

              <Menu.Item>
                  <Menu.Header>
                      <Icon name='truck' />
                      Maschinen
                  </Menu.Header>
                  <Menu.Menu>
                      <Menu.Item
                          content="Erstellen"
                          name='add_machine'
                          active={activeItem === 'add_machine'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/machine"
                      />

                      <Menu.Item
                          content="Suchen"
                          name='search_customer'
                          active={activeItem === 'search_machine'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/machine_search"
                      />

                      <Menu.Item
                          content="Maschinentyp hinzufügen"
                          name='add_machinetyp'
                          active={activeItem === 'add_machinetyp'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/machinetyp"
                      />
                      <Menu.Item
                          content="Maschinentyp suchen"
                          name='search_machinetyp'
                          active={activeItem === 'search_machinetyp'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/machinetyp_search"
                      />
                  </Menu.Menu>
              </Menu.Item>

              <Menu.Item>
                  <Menu.Header>
                      <Icon name='dollar' />
                      Dienstleistungen
                  </Menu.Header>
                  <Menu.Menu>
                      <Menu.Item
                          content="Dienstleistung erfassen"
                          name='add_action'
                          active={activeItem === 'add_action'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/action"
                      />

                      <Menu.Item
                          content="Dienstleistungen suchen"
                          name='search_action'
                          active={activeItem === 'search_action'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/action_search"
                      />

                      <Menu.Item
                          content="Vermietung"
                          name='add_rental'
                          active={activeItem === 'add_rental'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/rental"
                      />
                      <Menu.Item
                          content="Verkauf"
                          name='sell_machine'
                          active={activeItem === 'sell_machine'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/machine_sell"
                      />
                      <Menu.Item
                          content="Ankauf"
                          name='buy_machine'
                          active={activeItem === 'buy_machine'}
                          onClick={this.handleMenuClick}
                          as={Link}
                          to="/machine_buy"
                      />
                  </Menu.Menu>
              </Menu.Item>

              <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              content="Abmelden"
              onClick={event => {
                event.preventDefault();
                this.signout(() => history.push("/"));
              }}
              href="/logout"
              icon="sign-out"
            />
          </Menu>
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
        <Grid id="App-grid">
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
                  path="/machinetyp"
                  isAuthenticated={isAuthenticated}
                  token={token}
                  component={Machinetype}
              />
          </Grid.Column>
        </Grid>
      </Router>
    );
  }
}

export default App;
