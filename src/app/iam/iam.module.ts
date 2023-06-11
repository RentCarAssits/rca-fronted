import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './pages/sign-in/login-form.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {JWTInterceptorService} from "./interceptor/jwtinterceptor.service";
import {ToastModule} from "primeng/toast";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    LoginFormComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PasswordModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    HttpClient,
    HttpClientModule,
    // MessageCustomService
  ],
  exports: [
    LoginFormComponent
  ]
})
export class IAMModule {
}
