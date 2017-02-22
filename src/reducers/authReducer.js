import {
  AUTH_USER,
  UNAUTH_USER
} from '../actions/types'

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Successful authentication
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    default:
      return state;
  }
};
