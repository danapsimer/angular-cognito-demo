import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
  ActionTypes,
  ConfirmRegistrationRequestAction,
  ConfirmRegistrationSuccessAction,
  ConfirmRegistrationFailureAction
} from './confirm-registration.action';
import { UserRegistrationService } from '../../../modules/services/aws-cognito/user-registration/user-registration.service';

@Injectable()
export class ConfirmRegistrationEffects {

  @Effect() request$: Observable<Action> = this.actions$
    .ofType<ConfirmRegistrationRequestAction>(ActionTypes.CONFIRM_REGISTRATION_REQUEST)
    .switchMap(
      action => this.userRegistrationService.confirmRegistration$(action.username, action.confirmationCode)
        .mapTo(new ConfirmRegistrationSuccessAction())
        .catch(err => Observable.of(new ConfirmRegistrationFailureAction(err)))
    );

  constructor(private actions$: Actions, private userRegistrationService: UserRegistrationService) { }
}
