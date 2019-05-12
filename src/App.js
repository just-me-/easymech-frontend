// @flow

import React from 'react';
import { Grid } from 'semantic-ui-react';
import Keycloak from 'keycloak-js';

import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import Login from './components/Login';
import AppMenu from './components/AppMenu';
import AppPrivateRoutes from './components/AppPrivateRoutes';

import 'react-notifications/lib/notifications.css';
import './App.css';

type Props = {};
type State = {
  isAuthenticated: boolean,
  token: ?string,
  name: string,
  email: string,
  id: string,
  keycloak?: {
    loadUserInfo: () => () => void,
  },
};

class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    const token = sessionStorage.getItem('token');

    this.state = {
      keycloak: undefined,
      authenticated: false,
      name: '',
      email: '',
      id: '',
      isAuthenticated: !!token,
      token: token || undefined,
    };
  }

  authenticate = (login: string, password: string, callback: (error: ?Error) => void) => {
    this.setState({ isAuthenticated: true, token: 'myToken' });
    sessionStorage.setItem('token', 'myToken');
    callback(null);
  };

  signout = (callback: () => void) => {
    this.setState({
      isAuthenticated: false,
      token: undefined,
    });
    sessionStorage.removeItem('token');
    callback();
  };

  componentDidMount() {
    if (process.env.REACT_APP_USE_KEYCLOAK || !(process.env.NODE_ENV && process.env.NODE_ENV === 'development')) {
      const keycloak = Keycloak('/keycloak.json');
      keycloak.init({ onLoad: 'login-required', promiseType: 'native' }).then((isAuthenticated) => {
        this.setState({ keycloak, isAuthenticated });
      });
      if (this.state.keycloak) {
        if (this.state.isAuthenticated) {
          this.state.keycloak.loadUserInfo().then((userInfo) => {
            this.setState({
              name: userInfo.name,
              email: userInfo.email,
              id: userInfo.sub,
            });
            console.log(userInfo.name + userInfo.email + userInfo.sub);
          });
        }
      }
    }
  }

  render() {
    const { isAuthenticated, token } = this.state;

    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      if (isAuthenticated) {
        return <AppMenu history={history} signout={this.signout} />;
      }
      return null;
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
          <Grid.Column id="Content-grid" width={12}>
            <AppPrivateRoutes isAuthenticated={isAuthenticated} token={token} />
          </Grid.Column>
        </Grid>
        <NotificationContainer />
      </Router>
    );
  }
}
export default App;
