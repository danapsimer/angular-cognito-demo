import { Actions, ActionTypes, ResendCodeSuccessAction, ResendCodeFailureAction } from './resend-code.action';

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

export type ResendCodeStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;

export const initialState: ResendCodeStateT = { current: null };

export function resendCodeReducer(state: ResendCodeStateT = initialState, action: Actions): ResendCodeStateT {
  switch (action.type) {
    case ActionTypes.RESEND_CODE_REQUEST:
      return { current: 'onProcess' };

    case ActionTypes.RESEND_CODE_SUCCESS:
      return { current: 'onSuccess' };

    case ActionTypes.RESEND_CODE_FAILURE:
      return {
        current: 'onFailure',
        error: (<ResendCodeFailureAction>action).error
      };

    case ActionTypes.RESEND_CODE_RESET:
      return initialState;

    default:
      return state;
  }
}
