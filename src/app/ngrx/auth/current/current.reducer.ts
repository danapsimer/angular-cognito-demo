import {Actions, ActionTypes, CurrentSuccessAction, CurrentFailureAction} from './current.action';

export type OnProcessT = {
  current: 'onProcess';
};

export type OnSuccessT = {
  current: 'onSuccess';
  payload: { username: string, picture: string };
};

export type OnFailureT = {
  current: 'onFailure';
  error: Error;
};

export type OnResetT = {
  current: null;
};

export type CurrentStateT = OnProcessT | OnSuccessT | OnFailureT | OnResetT;

export const initialState: CurrentStateT = {current: null};

export function currentReducer(state: CurrentStateT = initialState, action: Actions): CurrentStateT {
  switch (action.type) {
    case ActionTypes.CURRENT_INIT:
      return {current: 'onProcess'};

    case ActionTypes.CURRENT_REQUEST:
      return {current: 'onProcess'};

    case ActionTypes.CURRENT_SUCCESS:
      return {
        current: 'onSuccess',
        payload: {username: (<CurrentSuccessAction>action).username, picture: (<CurrentSuccessAction>action).picture}
      };

    case ActionTypes.CURRENT_FAILURE:
      return {
        current: 'onFailure',
        error: (<CurrentFailureAction>action).error
      };

    case ActionTypes.CURRENT_RESET_REQUEST:
      return {current: 'onProcess'};

    case ActionTypes.CURRENT_RESET_SUCCESS:
      return initialState;

    case ActionTypes.CURRENT_RESET_FAILURE:
      return initialState;

    default:
      return state;
  }
}
