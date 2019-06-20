import Amplify, { Auth } from 'aws-amplify';

const poolDatas = {
  dev: {
    userPoolId: 'us-east-1_rnZDON91V',
    userPoolWebClientId: '5ak23h84ni4l3eh26627e7fhkq',
  },
};

Amplify.configure({
  Auth: {
    region: 'us-east-1',
    ...poolDatas[process.env.REACT_APP_ENV],
  },
});

export const checkAuthenticatedAPI = async () => {
  const user = await Auth.currentAuthenticatedUser();
  // const session = await Auth.currentSession();
  if (user.signInUserSession.isValid()) {
    return {
      token: user.signInUserSession.getIdToken().getJwtToken(),
      email: user.attributes.email,
    };
  }
  throw String('Token is invalud');
};

export const signOutAPI = () => {
  return Auth.signOut();
};

export const signUpAPI = (email: string, password: string) => {
  return Auth.signUp({
    username: email,
    password,
    attributes: { email },
  });
};

export const signInAPI = async (email: string, password: string) => {
  const user = await Auth.signIn(email, password);
  return user.signInUserSession.getIdToken().getJwtToken();
};

