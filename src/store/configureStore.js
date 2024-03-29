import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ui from './reducers/ui';
import auth from './reducers/auth';
import expense from './reducers/expense';
import couple from './reducers/couple';

const rootReducer = combineReducers({
  ui,
  auth,
  expense,
  couple,
});

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;
