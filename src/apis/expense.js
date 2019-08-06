import API from '@hellosirandy/rest-api-wrapper';

const api = new API(process.env.REACT_APP_URL);

export const createExpenseAPI = (token, body) => {
  const options = {
    endpoint: '/expense',
    token,
    body,
  };
  return api.post(options);
};

export const updateExpenseAPI = (token, expenseId, body) => {
  const options = {
    endpoint: `/expense/${expenseId}`,
    token,
    body,
  };
  return api.put(options);
};

export const deleteExpenseAPI = (token, expenseId) => {
  const options = {
    endpoint: `/expense/${expenseId}`,
    token,
  };
  return api.delete(options);
};

export const getExpenseAPI = (token) => {
  const options = {
    endpoint: '/expense',
    token,
  };
  return api.get(options);
};

