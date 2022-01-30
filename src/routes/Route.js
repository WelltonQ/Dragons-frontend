import React from 'react';
import { Route as ReactDOMRoute, Navigate } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Dragons } from '../pages/Dragons';


export const Route = ({ element: Component, isPrivate = false, ...rest }) => {

    const user = false;

    const Layout = user ? Login : Dragons;

    return (
        <ReactDOMRoute
          {...rest}
          render={({ location }) => {
            return isPrivate === !!user ? (
              <Layout>
                <Component />
              </Layout>
            ) : (
              <Navigate
                to={{
                  pathname: isPrivate ? '/' : '/dragons',
                  state: { from: location },
                }}
              />
            );
          }}
        />
    );
};