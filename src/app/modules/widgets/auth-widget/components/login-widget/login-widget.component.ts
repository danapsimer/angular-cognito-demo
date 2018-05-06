import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {ValidationT, ValidT, MobileNumberT, PasswordT} from '../../services/form-validation/form-validation.service';

import {Store} from '@ngrx/store';
import {AppStateT} from '../../../../../ngrx';
import * as fromLogin from '../../../../../ngrx/auth/login/login.store';
import * as fromCurrent from '../../../../../ngrx/auth/current/current.store';
import * as fromCredential from '../../../../../ngrx/auth/credential/credential.store';

type UserNameOption = { value: string, name: string };
@Component({
  selector: 'msp-login-widget',
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css'],
})
export class LoginWidgetComponent implements OnInit, OnDestroy {
  @Output() forgotPassword = new EventEmitter<true>();
  @Output() resetPasswordRequired = new EventEmitter<true>();

  loginState$: Observable<fromLogin.LoginStateT>;

  submit$ = new Subject<true>();
  mobileValidator$ = new Subject<ValidationT<MobileNumberT>>();
  passwordValidator$ = new Subject<ValidationT<PasswordT>>();
  onDestroy$ = new Subject<true>();
  userNameOptions: UserNameOption[];

  constructor(public store: Store<AppStateT>) {
    this.userNameOptions = [
      {value: 'email', name: 'Email'},
      {value: 'phone', name: 'Mobile Phone'}
    ];
  }

  ngOnInit() {
    this.loginState$ = this.store.select(fromLogin.getLoginState);

    this.submit$
      .withLatestFrom(this.mobileValidator$, this.passwordValidator$)
      .map(([_, mobileValidator, passwordValidator]) => [mobileValidator, passwordValidator])
      .filter(([mobileValidator, passwordValidator]) =>
        mobileValidator.isValid && passwordValidator.isValid)
      .subscribe(([mobileValidator, passwordValidator]) => {
        const username = (<ValidT<MobileNumberT>>mobileValidator).payload.mobileNumber;
        const password = (<ValidT<PasswordT>>passwordValidator).payload.password;
        this.store.dispatch(new fromLogin.LoginRequestAction(username, password));
      });

    // Respond to login success
    this.store.select(fromLogin.getLoginState)
      .takeUntil(this.onDestroy$)
      .filter(state => state.current === 'onSuccess')
      .subscribe(() => this.store.dispatch(new fromCurrent.CurrentRequestAction()));

    // respond to the new password required error.
    this.store.select(fromLogin.getLoginState)
      .takeUntil(this.onDestroy$)
      .filter((state: fromLogin.LoginStateT): state is fromLogin.OnFailureT => state.current === 'onFailure')
      .filter(state => state.error['code'] === 'PasswordResetRequiredException')
      .withLatestFrom(this.mobileValidator$)
      .subscribe(([_, mobileValidator]) => {
        this.store.dispatch(new fromCredential.CredentialPutAliasAction((<ValidT<MobileNumberT>>mobileValidator).payload.mobileNumber));
        this.resetPasswordRequired.emit(true);
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new fromLogin.LoginResetAction());
    this.onDestroy$.next(true);
  }
}
