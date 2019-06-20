import { getExpenseAPI } from '../../apis/expense';
import { checkAuthenticated } from './auth';
import { uiStartLoading, uiStopLoading } from './ui';
import { EXPENSE_GETTING } from '../loadingTypes';
import { EXPENSE_SET_EXPENSE } from '../actionTypes';

export const getExpense = () => {
  return async (dispatch) => {
    dispatch(uiStartLoading(EXPENSE_GETTING));
    const token = await dispatch(checkAuthenticated());
    try {
      const expenses = await getExpenseAPI(token);
      let total = 0;
      const expenseTable = {};
      expenses.forEach((expense) => {
        total += expense.paid - expense.shouldPay;
        expenseTable[expense.id] = expense;
      });
      const expenseIds = expenses.map(expense => expense.id);
      dispatch(setExpense(expenseIds.reverse(), expenseTable, parseFloat(total.toFixed(3))));
      dispatch(uiStopLoading(EXPENSE_GETTING));
    } catch (e) {
      dispatch(uiStopLoading(EXPENSE_GETTING));
    }
    dispatch(uiStopLoading(EXPENSE_GETTING));
  };
};

const setExpense = (expenseIds, expenseTable, total) => {
  return {
    type: EXPENSE_SET_EXPENSE,
    expenseIds,
    expenseTable,
    total,
  };
};

