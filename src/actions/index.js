import axios from 'axios';
import { 
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from './types';
const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}, navProtectedCb) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, { email, password })
    .then((response) => {
      dispatch({ 
        type: AUTH_USER,
        payload: response.data.user
       });
      localStorage.setItem('token', response.data.token);
      navProtectedCb();
    })
    .catch((err) => {
      console.log(err);
      dispatch(authError('Bad Login Info'));
    });
  }
}

export function signupUser({email, password, fullName}, navProtectedCb) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password, fullName})
    .then((response) => {
      dispatch({
        type: AUTH_USER,
        payload: response.data.user
      });
      localStorage.setItem('token', response.data.token);
      navProtectedCb();
    })
    .catch((error) => {
      dispatch(authError(error.response.data.error));
    });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then((response) => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data
      });
    })
    .catch((error) => {
      console.log('error:', error);
    }) 
  }
}