import { signInAPI, refreshTokenAPI } from '../../apis/auth';
import { AUTH_SET_TOKEN } from '../actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { AUTH_SIGNIN } from '../loadingTypes';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading(AUTH_SIGNIN));
      const parsedRes = await signInAPI({ email, password });
      dispatch(storeToken(parsedRes.token, parsedRes.expiration, parsedRes.refreshToken));
      dispatch(uiStopLoading(AUTH_SIGNIN));
    } catch (e) {
      dispatch(uiStopLoading(AUTH_SIGNIN));
      if (e.code === 'UserNotConfirmedException') {
        throw Object({ needConfirmation: true });
      } else {
        console.log(e);
        throw String('Incorrect email/password');
      }
    }
  };
};

const storeToken = (token, expiration, refreshToken) => {
  return (dispatch) => {
    dispatch(setToken(token));
    localStorage.setItem('sharex:auth:token', token);
    localStorage.setItem('sharex:auth:expiration', expiration.toString());
    localStorage.setItem('sharex:auth:refreshToken', refreshToken);
  };
};

const setToken = (token) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
  };
};

const validateToken = () => {
  return async (dispatch, getState) => {
    const { token, expiration } = getState().auth;
    if (!token || new Date(expiration) <= new Date()) {
      const tokenFromStorage = localStorage.getItem('sharex:auth:token');
      if (!tokenFromStorage) {
        throw new Error();
      }
      const expirationFromStorage = localStorage.getItem('sharex:auth:expiration');
      const parsedExpiration = new Date(parseInt(expirationFromStorage, 10));
      const now = new Date();
      if (parsedExpiration > now) {
        dispatch(setToken(tokenFromStorage));
        return tokenFromStorage;
      }
      throw new Error();
    } else {
      return token;
    }
  };
};

export const getToken = () => {
  return async (dispatch) => {
    let token;
    try {
      token = await dispatch(validateToken());
    } catch (e) {
      token = localStorage.getItem('sharex:auth:token');
      const refreshToken = localStorage.getItem('sharex:auth:refreshToken');
      if (!refreshToken) {
        clearStorage();
        return null;
      }
      const parsedRes = await refreshTokenAPI(token, refreshToken);
      if (!parsedRes.token) {
        clearStorage();
        return null;
      }
      dispatch(storeToken(parsedRes.token, parsedRes.expiration, parsedRes.refreshToken));
      return parsedRes.token;
    }
    if (!token) {
      return null;
    }
    return token;
  };
};

const clearStorage = () => {
  localStorage.removeItem('sharex:auth:token');
  localStorage.removeItem('sharex:auth:expiration');
  localStorage.removeItem('sharex:auth:refreshToken');
};

export const signOut = () => {
  return (dispatch) => {
    clearStorage();
    dispatch({
      type: AUTH_SET_TOKEN,
      token: '',
    });
  };
};

