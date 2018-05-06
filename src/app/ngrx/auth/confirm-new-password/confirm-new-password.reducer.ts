import {Actions, ActionTypes, ConfirmNewPasswordSuccessAction, ConfirmNewPasswordFailureAction} from './confirm-new-password.action';

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

export type ConfirmNewPasswordStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;

export const initialState: ConfirmNewPasswordStateT = {current: null};

export function confirmNewPasswordReducer(state: ConfirmNewPasswordStateT = initialState, action: Actions): ConfirmNewPasswordStateT {

  switch (action.type) {
    case ActionTypes.CONFIRM_NEW_PASSWORD_REQUEST:
      return {current: 'onProcess'};

    case ActionTypes.CONFIRM_NEW_PASSWORD_SUCCESS:
      return {current: 'onSuccess'};

    case ActionTypes.CONFIRM_NEW_PASSWORD_FAILURE:
      return {
        current: 'onFailure',
        error: (<ConfirmNewPasswordFailureAction>action).error
      };

    case ActionTypes.CONFIRM_NEW_PASSWORD_RESET:
      return initialState;

    default:
      return state;
  }
}
