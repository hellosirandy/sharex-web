import API from '@hellosirandy/rest-api-wrapper';

const api = new API(process.env.REACT_APP_URL);

export const getCoupleAPI = (token) => {
  return api.get('/couple', token);
};

