import { EXPENSE_SET_EXPENSE } from '../actionTypes';

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
    default:
      return state;
  }
};
export default reducer;
