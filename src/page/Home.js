import React, {Component} from 'react';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';

import App from '../App';
import Login from './Login';

export default class Home extends Component
{

    isLogged() {
        const token = localStorage.getItem('token');

        if (token == null) {
            return false;
        }

        return true;
    }

    render() {
        return (
        <HashRouter>
            <div>
                <Switch>
                    <PrivateRoute exactly path='/dashboard' component={App} />
                    <Route path="/login" component={Login} />
                    <Redirect from="*" to="/dashboard"/>
                </Switch>
            </div>
        </HashRouter>);
    }
}

export const isAuthenticated = () => {
  let token = localStorage.getItem('token');
  if (token === 'undefined') {
    return false;
  }

  return true;
}

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={ {
        pathname: '/login',
        state: { from: props.location }
      } } />
    )
  )}/>
);