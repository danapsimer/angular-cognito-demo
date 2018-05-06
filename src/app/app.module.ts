import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AuthWidgetModule} from './modules/widgets/auth-widget/auth-widget.module';
import {AwsCognitoModule} from './modules/services/aws-cognito/aws-cognito.module';

import {AppComponent} from './app.component';

// ngrx
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import * as fromNgrx from './ngrx';

import {CurrentEffects} from './ngrx/auth/current/current.effect';
import {LoginEffects} from './ngrx/auth/login/login.effect';
import {SignUpEffects} from './ngrx/auth/sign-up/sign-up.effect';
import {ResendCodeEffects} from './ngrx/auth/resend-code/resend-code.effect';
import {ConfirmNewPasswordEffects} from './ngrx/auth/confirm-new-password/confirm-new-password.effect';
import {ConfirmRegistrationEffects} from './ngrx/auth/confirm-registration/confirm-registration.effect';
import {ForgotPasswordEffects} from './ngrx/auth/forgot-password/forgot-password.effect';
import {environment} from '../environments/environment';
import {CustomMaterialModule} from './modules/common/custom-material-module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CustomMaterialModule,
    FlexLayoutModule,
    NoopAnimationsModule,

    // ngrx
    StoreModule.forRoot(fromNgrx.appReducers, {
      initialState: fromNgrx.initialState
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([
      CurrentEffects,
      LoginEffects,
      SignUpEffects,
      ResendCodeEffects,
      ForgotPasswordEffects,
      ConfirmNewPasswordEffects,
      ConfirmRegistrationEffects,
    ]),

    AuthWidgetModule,
    AwsCognitoModule.setConfig(environment.POOL_DATA, environment.IDENTITY_POOL_ID)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
