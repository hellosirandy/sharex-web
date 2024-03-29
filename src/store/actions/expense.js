import { getExpenseAPI, createExpenseAPI, deleteExpenseAPI, updateExpenseAPI } from '../../apis/expense';
import { getToken } from './auth';
import { uiStartLoading, uiStopLoading } from './ui';
import { EXPENSE_GETTING, EXPENSE_CREATING, EXPENSE_DELETING } from '../loadingTypes';
import { EXPENSE_SET_EXPENSE, EXPENSE_APPEND_EXPENSE, EXPENSE_DELETE_EXPENSE, EXPENSE_SET_UPDATE, EXPENSE_UPDATE_EXPENSE } from '../actionTypes';

export const createExpense = (options) => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading(EXPENSE_CREATING));
    let token;
    let body;
    try {
      token = await dispatch(getToken());
      const { couple } = getState().couple;
      body = makeExpense({
        ...options,
        couple,
      });
    } catch (e) {
      console.log(e);
    }

    try {
      const newExpense = await createExpenseAPI(token, body);
      dispatch(appendExpense(newExpense));
      dispatch(uiStopLoading(EXPENSE_CREATING));
    } catch (e) {
      console.log(e);
      dispatch(uiStopLoading(EXPENSE_CREATING));
    }
  };
};

export const getExpense = () => {
  return async (dispatch) => {
    dispatch(uiStartLoading(EXPENSE_GETTING));
    const token = await dispatch(getToken());
    try {
      const { expenses, balance } = await getExpenseAPI(token);
      const expenseTable = {};
      expenses.forEach((expense) => {
        expenseTable[expense.id] = expense;
      });
      const expenseIds = expenses.map(expense => expense.id);
      dispatch(setExpense(expenseIds, expenseTable, parseFloat(balance.toFixed(3))));
      dispatch(uiStopLoading(EXPENSE_GETTING));
    } catch (e) {
      dispatch(uiStopLoading(EXPENSE_GETTING));
    }
    dispatch(uiStopLoading(EXPENSE_GETTING));
  };
};

export const deleteExpense = (expenseId) => {
  return async (dispatch, getState) => {
    const token = await dispatch(getToken());
    dispatch(uiStartLoading(EXPENSE_DELETING));
    try {
      await deleteExpenseAPI(token, expenseId);
      dispatch(uiStopLoading(EXPENSE_DELETING));
      const { expenseIds, expenseTable } = getState().expense;
      const deletedExpense = expenseTable[expenseId];
      delete expenseTable[expenseId];
      dispatch({
        type: EXPENSE_DELETE_EXPENSE,
        expenseIds,
        deletedExpense,
      });
    } catch (e) {
      console.log(e);
      dispatch(uiStopLoading(EXPENSE_DELETING));
    }
  };
};

export const setUpdating = (expenseId) => {
  return (dispatch) => {
    dispatch({
      type: EXPENSE_SET_UPDATE,
      expenseId,
    });
  };
};

export const updateExpense = (options) => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading(EXPENSE_CREATING));
    const token = await dispatch(getToken());
    const { couple } = getState().couple;
    const body = makeExpense({
      ...options,
      couple,
    });
    try {
      const updatedExpense = await updateExpenseAPI(token, options.expenseId, body);
      dispatch({
        type: EXPENSE_UPDATE_EXPENSE,
        updatedExpense,
      });
      dispatch(uiStopLoading(EXPENSE_CREATING));
    } catch (e) {
      console.log(e);
      dispatch(uiStopLoading(EXPENSE_CREATING));
    }
  };
};

const setExpense = (expenseIds, expenseTable, balance) => {
  return {
    type: EXPENSE_SET_EXPENSE,
    expenseIds,
    expenseTable,
    balance,
  };
};

const makeExpense = (options) => {
  const {
    couple, paid, shouldPay, total, title, date, category,
  } = options;
  const data = {
    [couple.you.email]: {
      paid,
      shouldPay,
    },
    [couple.partner.email]: {
      paid: total - paid,
      shouldPay: total - shouldPay,
    },
  };
  return {
    title,
    coupleId: couple.id,
    date,
    data,
    category,
  };
};

const appendExpense = (expense) => {
  return {
    type: EXPENSE_APPEND_EXPENSE,
    expense,
  };
};
