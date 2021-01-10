// https://github.com/satansdeer/react-firebase-auth/blob/master/src/PrivateRoute.js

import { AuthContext } from 'lib/auth';
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => (currentUser ? (
        <RouteComponent {...routeProps} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default PrivateRoute;
