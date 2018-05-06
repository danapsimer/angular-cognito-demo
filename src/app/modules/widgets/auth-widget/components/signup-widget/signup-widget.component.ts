import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ValidationT, ValidT, MobileNumberT, PasswordT } from '../../services/form-validation/form-validation.service';

import { Store } from '@ngrx/store';
import { AppStateT } from '../../../../../ngrx';
import * as fromSignUp from '../../../../../ngrx/auth/sign-up/sign-up.store';
import * as fromCredential from '../../../../../ngrx/auth/credential/credential.store';

@Component({
  selector: 'msp-signup-widget',
  templateUrl: './signup-widget.component.html',
  styleUrls: ['./signup-widget.component.css'],
})
export class SignupWidgetComponent implements OnInit, OnDestroy {

  signUpState$: Observable<fromSignUp.SignUpStateT>;

  submit$ = new Subject<true>();
  mobileValidator$ = new Subject<ValidationT<MobileNumberT>>();
  passwordValidator$ = new Subject<ValidationT<PasswordT>>();
  //firstNameValidator$ = new Subject<ValidationT<FirstNameT>>();

  constructor(public store: Store<AppStateT>) { }

  ngOnInit() {
    this.signUpState$ = this.store.select(fromSignUp.getSignUpState);

    this.submit$
      .withLatestFrom(this.mobileValidator$, this.passwordValidator$)
      .map(([_, mobileValidator, passwordValidator]) => [mobileValidator, passwordValidator])
      .filter(([mobileValidator, passwordValidator]) =>
        mobileValidator.isValid && passwordValidator.isValid)
      .subscribe(([mobileValidator, passwordValidator]) => {
        const alias = (<ValidT<MobileNumberT>>mobileValidator).payload.mobileNumber;
        const password = (<ValidT<PasswordT>>passwordValidator).payload.password;
        this.store.dispatch(new fromSignUp.SignUpRequestAction(alias, password));
        this.store.dispatch(new fromCredential.CredentialPutAliasAction(alias));
        this.store.dispatch(new fromCredential.CredentialPutPasswordAction(password));
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromSignUp.SignUpResetAction());
  }
}
