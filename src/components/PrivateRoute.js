import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({
  component, isAuthenticated, user, token, ...rest
}) {
  if (isAuthenticated) {
    return (
      <Route
        {...rest}
        render={props => React.createElement(component, { ...props, user, token })}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={props => <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  );
}

export default PrivateRoute;
