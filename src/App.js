// @flow

import React from "react";
import { Grid } from 'semantic-ui-react'
import Keycloak from 'keycloak-js';

import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";

import Login from "./components/Login";
import AppMenu from "./components/AppMenu";
import AppPrivateRoutes from "./components/AppPrivateRoutes";
import Notification from "./components/Notification";

import "./App.css"

type Props = {};
type State = {
  isAuthenticated: boolean,
  token: ?string,
  name: string,
  email: string,
  id:string
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

        this.state = {
            keycloak: null,
            authenticated: false,
            name: "",
            email: "",
            id: ""
        };
    }

    authenticate = (
        login: string,
        password: string,
        callback: (error: ?Error) => void
    ) => {
        this.setState({isAuthenticated: true, token: "myToken"});
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
        const {isAuthenticated, token} = this.state;

        const MenuBar = withRouter(({history, location: {pathname}}) => {
            if (isAuthenticated) {
                return (
                    <AppMenu history={history} signout={this.signout}/>
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
                        <Login {...props} authenticate={this.authenticate} isAuthenticated={isAuthenticated}/>
                    )}
                />
                <Grid id="App-grid" stackable>
                    <Grid.Column id="Menu-grid" width={4}>
                        <MenuBar/>
                    </Grid.Column>
                    {/*
            The following are protected routes that are only available for logged-in users. We also pass the user and token so
            these components can do API calls. PrivateRoute is not part of react-router but our own implementation.
          */}

                    <Grid.Column id="Content-grid" width={12}>
                        <AppPrivateRoutes isAuthenticated={isAuthenticated} token={token}/>
                    </Grid.Column>
                </Grid>
                <Notification/>
            </Router>
        );
    }

    componentDidMount() {
      console.log("Env vari:", process.env.NODE_ENV); 

      if (!process.env.NODE_ENV && process.env.NODE_ENV !== 'development') { // production mode
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required', promiseType: 'native'}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        });
        if(this.state.keycloak) {
            if(this.state.authenticated){
                this.props.keycloak.loadUserInfo().then(userInfo => {
                    this.setState({name: userInfo.name, email: userInfo.email, id: userInfo.sub});
                    console.log(userInfo.name + userInfo.email + userInfo.sub);
                });

            }
        }
      }
    }

}
export default App;
