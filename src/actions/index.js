import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, AUTH_ERROR } from './types'

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

export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};
