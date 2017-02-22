import axios from 'axios'
import { browserHistory } from 'react-router'

const ROOT_URL = 'http://localhost:3090';

export const signinUser = ({ email, password }) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER }); // Update authentication status
        browserHistory.push("./feature"); // Redirect the user to the feature route
      })
      .catch(() => {
        console.log("Error!");
      });
  }
}
