import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor() {
  }

  ngOnInit() {
  }

  onSubmitLoginForm() {
    console.log(this.loginForm);
  }

  test() {
    console.log(this.loginForm.get('email').valid);
  }

}
