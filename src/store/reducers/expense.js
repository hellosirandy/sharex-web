import { EXPENSE_SET_EXPENSE, EXPENSE_APPEND_EXPENSE, EXPENSE_DELETE_EXPENSE, EXPENSE_SET_UPDATE, EXPENSE_UPDATE_EXPENSE } from '../actionTypes';

const initialState = {
  expenseIds: [],
  expenseTable: {},
  balance: 0,
  updating: 0,
};

const reducer = (state = initialState, action) => {
  let balance;
  switch (action.type) {
    case EXPENSE_SET_EXPENSE:
      return {
        ...state,
        expenseIds: action.expenseIds,
        expenseTable: action.expenseTable,
        balance: action.balance,
      };
    case EXPENSE_APPEND_EXPENSE:
      return {
        ...state,
        expenseIds: [action.expense.id, ...state.expenseIds],
        expenseTable: { ...state.expenseTable, [action.expense.id]: action.expense },
        balance: state.balance + (action.expense.paid - action.expense.shouldPay),
      };
    case EXPENSE_UPDATE_EXPENSE:
      const prevExpense = state.expenseTable[action.updatedExpense.id];
      const prevDiff = prevExpense.paid - prevExpense.shouldPay;
      const updatedDiff = action.updatedExpense.paid - action.updatedExpense.shouldPay;
      balance = state.balance - prevDiff + updatedDiff;
      return {
        ...state,
        expenseTable: {
          ...state.expenseTable,
          [action.updatedExpense.id]: action.updatedExpense,
        },
        balance: parseFloat(balance.toFixed(3)),
      };
    case EXPENSE_DELETE_EXPENSE:
      const expenseIds =
        state.expenseIds.filter(expenseId => expenseId !== action.deletedExpense.id);
      balance = state.balance - (action.deletedExpense.paid - action.deletedExpense.shouldPay);
      return {
        ...state,
        expenseIds,
        balance: parseFloat(balance.toFixed(3)),
      };
    case EXPENSE_SET_UPDATE:
      return {
        ...state,
        updating: action.expenseId,
      };
    default:
      return state;
  }
};
export default reducer;
