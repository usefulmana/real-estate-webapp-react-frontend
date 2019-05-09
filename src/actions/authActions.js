import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_SUCCESS,
  UPDATE_FAIL
} from './types';
import { registerAPI, loginAPI, updateUserInfoAPI,getUserByIdAPI, getUserInfoByTokenAPI } from '../data/apiroutes';

// Check token & load user

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get(getUserInfoByTokenAPI, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};
// Register
export const register = ({
  name,
  email,
  phone,
  password,
  avatar
}) => dispatch => {
  // headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, phone, password, avatar });

  axios
    .post(registerAPI, body, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const updateInfo = ({
  name,
  email,
  phone,
  avatar,
  token,
  id
}) => dispatch => {
  // headers
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, phone, avatar});

  axios
    .put(`${updateUserInfoAPI}/${id}`, body, config)
    .then(res =>
      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'UPDATE_FAIL')
      );
      dispatch({
        type: UPDATE_FAIL
      });
    });
};
// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // Request body
  const body = JSON.stringify({ email, password });
  axios
    .post(loginAPI, body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  const token = getState().auth.token;

  const config = {
    headers: {
      'content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
