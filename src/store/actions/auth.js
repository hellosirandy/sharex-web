import { signInAPI, signOutAPI, checkAuthenticatedAPI, signUpAPI } from '../../apis/auth';
import { AUTH_SET_AUTHENTICATED } from '../actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';
import { AUTH_SIGNIN } from '../loadingTypes';

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading(AUTH_SIGNIN));
      const token = await signInAPI(email, password);
      console.log(token);
      dispatch(uiStopLoading(AUTH_SIGNIN));
      dispatch(setAuthenticated(token));
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

export const signUp = (email: string, password: string) => {
  return async () => {
    try {
      await signUpAPI(email, password);
    } catch (e) {
      if (e.code === 'UsernameExistsException') {
        throw String('User already exists');
      } else {
        throw String('Invalid email/password');
      }
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    await signOutAPI();
    dispatch(setAuthenticated(null));
  };
};

export const checkAuthenticated = () => {
  return async (dispatch, getState) => {
    try {
      const { token, email } = await checkAuthenticatedAPI();
      const { auth: { token: oldToken } } = getState();
      if (token !== oldToken) {
        dispatch(setAuthenticated(token, email));
      }
      return token;
    } catch (e) {
      dispatch(setAuthenticated(null));
    }
  };
};

const setAuthenticated = (token, email) => {
  return {
    type: AUTH_SET_AUTHENTICATED,
    token,
    email,
  };
};

