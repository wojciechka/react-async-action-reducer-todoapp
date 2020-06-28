import { combineReducers } from "redux";

import { actions } from '../actions';

export const reducers = combineReducers({
  ...actions.todoItems.reducers,
});
