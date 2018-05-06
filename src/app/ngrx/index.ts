import {ActionReducer, ActionReducerMap} from '@ngrx/store';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromAuth from './auth';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface AppStateT {
  auth: fromAuth.AuthStateT;
}

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const appReducers: ActionReducerMap<AppStateT> = {
  auth: fromAuth.authReducer,
};

const productionReducer: ActionReducer<AppStateT> = combineReducers(appReducers);

export const initialState: AppStateT = {
  auth: fromAuth.initialState
};

export function appReducer(state: AppStateT = initialState, action: any) {
  return productionReducer(state, action);
}
