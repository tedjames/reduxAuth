import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types'

const INITIAL_STATE = {
  errorMessage: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Successful authentication
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};