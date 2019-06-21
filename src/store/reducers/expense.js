import { EXPENSE_SET_EXPENSE, EXPENSE_APPEND_EXPENSE } from '../actionTypes';

const initialState = {
  expenseIds: [],
  expenseTable: {},
  total: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPENSE_SET_EXPENSE:
      return {
        ...state,
        expenseIds: action.expenseIds,
        expenseTable: action.expenseTable,
        total: action.total,
      };
    case EXPENSE_APPEND_EXPENSE:
      return {
        ...state,
        expenseIds: [action.expense.id, ...state.expenseIds],
        expenseTable: { ...state.expenseTable, [action.expense.id]: action.expense },
        total: state.total + (action.expense.paid - action.expense.shouldPay),
      };
    default:
      return state;
  }
};
export default reducer;
