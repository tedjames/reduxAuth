import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'

import App from './components/app'
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import Feature from './components/feature'
import Welcome from './components/welcome'
import RequireAuth from './components/auth/requireAuth'
import reducers from './reducers'
import { AUTH_USER } from './actions/types'

// Create Redux Store with Middleware and JWT
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore); // Apply middleware
const store = createStoreWithMiddleware(reducers); // Creates redux store
const token = localStorage.getItem('token'); // Get JWT token

if (token) { // If a token is available, set authenticated to true
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin}></Route>
        <Route path="signout" component={Signout}></Route>
        <Route path="signup" component={Signup}></Route>
        <Route path="feature" component={RequireAuth(Feature)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
