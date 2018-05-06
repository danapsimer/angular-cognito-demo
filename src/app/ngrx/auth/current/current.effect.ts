import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import {
  ActionTypes,
  CurrentInitAction,
  CurrentRequestAction, CurrentSuccessAction, CurrentFailureAction,
  CurrentResetRequestAction, CurrentResetSuccessAction, CurrentResetFailureAction
} from './current.action';

import { UserLoginService } from '../../../modules/services/aws-cognito/user-login/user-login.service';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class CurrentEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType<CurrentInitAction>(ActionTypes.CURRENT_INIT)
    .switchMapTo(
      this.userLoginService.isInitAuthenticated$()
        .mapTo(new CurrentRequestAction())
        .catch(err => Observable.of(new CurrentFailureAction(err)))
    );

  @Effect() request$: Observable<Action> = this.actions$
    .ofType<CurrentRequestAction>(ActionTypes.CURRENT_REQUEST)
    .switchMapTo(
    Observable.of({ username: 'Jason', picture: 'Jason picture' })
      .map(({username, picture}) => new CurrentSuccessAction(username, picture))
      .catch(err => Observable.of(new CurrentFailureAction(err)))
    );

  @Effect() reset$: Observable<Action> = this.actions$
    .ofType<CurrentResetRequestAction>(ActionTypes.CURRENT_RESET_REQUEST)
    .switchMapTo(
    this.userLoginService.logout()
      .mapTo(new CurrentResetSuccessAction())
      .catch(err => Observable.of(new CurrentFailureAction(err)))
    );

  constructor(private actions$: Actions, private userLoginService: UserLoginService) { }
}
