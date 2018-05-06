import {ActionReducer, ActionReducerMap} from '@ngrx/store';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import {combineReducers} from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromCredential from './credential/credential.reducer';
import * as fromCurrent from './current/current.reducer';
import * as fromResendCode from './resend-code/resend-code.reducer';
import * as fromSignUp from './sign-up/sign-up.reducer';
import * as fromConfirmRegistration from './confirm-registration/confirm-registration.reducer';
import * as fromLogin from './login/login.reducer';
import * as fromConfirmNewPassword from './confirm-new-password/confirm-new-password.reducer';
import * as fromForgotPassword from './forgot-password/forgot-password.reducer';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export type AuthStateT = {
  credential: fromCredential.CredentialStateT,
  current: fromCurrent.CurrentStateT,
  resendCode: fromResendCode.ResendCodeStateT,
  signUp: fromSignUp.SignUpStateT,
  confirmRegistration: fromConfirmRegistration.ConfirmRegistrationStateT,
  login: fromLogin.LoginStateT,
  forgotPassword: fromForgotPassword.ForgotPasswordStateT,
  confirmNewPassword: fromConfirmNewPassword.ConfirmNewPasswordStateT
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
export const authReducers: ActionReducerMap<AuthStateT> = {
  credential: fromCredential.credentialReducer,
  current: fromCurrent.currentReducer,
  resendCode: fromResendCode.resendCodeReducer,
  signUp: fromSignUp.signUpReducer,
  confirmRegistration: fromConfirmRegistration.confirmRegistrationReducer,
  login: fromLogin.loginReducer,
  forgotPassword: fromForgotPassword.forgotPasswordReducer,
  confirmNewPassword: fromConfirmNewPassword.confirmNewPasswordReducer,
};

const authProReducer: ActionReducer<AuthStateT> = combineReducers(authReducers);

export const initialState: AuthStateT = {
  credential: fromCredential.initialState,
  current: fromCurrent.initialState,
  resendCode: fromResendCode.initialState,
  signUp: fromSignUp.initialState,
  confirmRegistration: fromConfirmRegistration.initialState,
  login: fromLogin.initialState,
  forgotPassword: fromForgotPassword.initialState,
  confirmNewPassword: fromConfirmNewPassword.initialState,
};

export function authReducer(state: AuthStateT = initialState, action: any) {
  return authProReducer(state, action);
}
