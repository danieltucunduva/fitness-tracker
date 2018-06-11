import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] })
  });
  invalidLogin = false;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.invalidLoginChange.subscribe(invalidLogin => {
      this.invalidLogin = invalidLogin;
      setTimeout(() => {
        this.invalidLogin = false;
      }, 10 * 1000);
    });
  }

  onSubmitLoginForm() {
    this.authenticationService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    });
  }

}
