import API from '@hellosirandy/rest-api-wrapper';

const api = new API(process.env.REACT_APP_URL);

export const createExpenseAPI = (token, body) => {
  return api.post('/couple/expense', token, body);
};

export const updateExpenseAPI = (token, body) => {
  return api.put('/couple/expense', token, body);
};

export const deleteExpenseAPI = (token, expenseId) => {
  const options = {
    endpoint: '/couple/expense',
    token,
    params: {
      expenseId,
    },
  };
  console.log(options);
  return api.delete(options);
};

export const getExpenseAPI = (token) => {
  const options = {
    endpoint: '/couple/expense',
    token,
  };
  return api.get(options);
};

