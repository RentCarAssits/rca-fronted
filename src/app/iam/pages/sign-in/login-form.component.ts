import {Component} from '@angular/core';
import {LayoutService} from "../../../shared/services/layout/layout.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sign-in',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  visible!: boolean;
  password!: string;
  email!: string;

  constructor(public layoutService: LayoutService,
              private authService: AuthService,
              private router: Router,
              private message: MessageService,

  ) {
  }

  submitForm(): void {
    this.authService.signIn({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.setCurrentUser(response);
        // console.log(`accessToken: ${this.authService.getToken()}`);
        this.router.navigate(['']).then();
      },
      error: (err) => {
       this.showError()
      },
      complete: () => {
        this.showSuccess()
      }
    });
  }

  showSuccess() {
    this.message.add({ severity: 'success', summary: 'Success', detail: 'Login successfully' });
  }
  showError() {
    this.message.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.' });
  }
}
