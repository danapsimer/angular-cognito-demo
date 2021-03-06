import {
  Actions,
  ActionTypes,
  ForgotPasswordSuccessAction,
  ForgotPasswordFailureAction
} from './forgot-password.action';

export type OnProcessT = {
  current: 'onProcess';
};

export type OnSuccessT = {
  current: 'onSuccess';
};

export type OnFailureT = {
  current: 'onFailure';
  error: Error;
};

export type OnResetT = {
  current: null;
};

export type ForgotPasswordStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;

export const initialState: ForgotPasswordStateT = {current: null};

export function forgotPasswordReducer(state: ForgotPasswordStateT = initialState, action: Actions): ForgotPasswordStateT {
  switch (action.type) {
    case ActionTypes.FORGOT_PASSWORD_REQUEST:
      return {current: 'onProcess'};

    case ActionTypes.FORGOT_PASSWORD_SUCCESS:
      return {current: 'onSuccess'};

    case ActionTypes.FORGOT_PASSWORD_FAILURE:
      return {
        current: 'onFailure',
        error: (<ForgotPasswordFailureAction>action).error
      };

    case ActionTypes.FORGOT_PASSWORD_RESET:
      return initialState;

    default:
      return state;
  }
}
