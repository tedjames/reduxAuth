import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types'

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER }); // Update authentication status
        localStorage.setItem('token', response.data.token) // Save the JWT token
        browserHistory.push("./feature"); // Redirect the user to the feature route
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER }); // Update authentication status
        localStorage.setItem('token', response.data.token) // Save the JWT token
        browserHistory.push("./feature"); // Redirect the user to the feature route
      })
      .catch(() => {
        dispatch(authError('Error occured! Could not make account...'));
      });
  }
}

export const signoutUser = () => {
  localStorage.removeItem('token'); // Delete JWT token
  return {
    type: UNAUTH_USER
  };
};

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
