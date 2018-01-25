import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { AUTH_USER } from './actions/types';

import Home from './components/Home.jsx';
import Header from './components/NavHeader.jsx';
import Signin from './components/auth/Signin.jsx';
import Signout from './components/auth/Signout.jsx';
import Signup from './components/auth/Signup.jsx';
import RequireAuth from './components/auth/require_authentication';
import CreateOrg from './components/create/CreateOrg.jsx';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk, createLogger())(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/create-org" component={RequireAuth(CreateOrg)} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('app'));
