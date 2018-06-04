import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AuthenticationService } from '../authentication.service';
import { MatDialog } from '@angular/material';
import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  date: Date;
  maxDate: Date;
  minDate: Date;
  usernameAvailable = true;

  constructor(private authenticationService: AuthenticationService, private dialog: MatDialog) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.minDate = new Date();
    this.minDate.setFullYear(this.maxDate.getFullYear() - 120);

    this.authenticationService.usernameAvailableChange.subscribe(usernameAvailable => {
      this.usernameAvailable = usernameAvailable;
      setTimeout(() => {
        this.usernameAvailable = true;
      }, 10 * 1000);
    });
  }

  emptyDatepicker(input: HTMLInputElement): boolean {
    return input.value === '';
  }

  invalidDatepicker(input: HTMLInputElement): boolean {
    return (
      !this.emptyDatepicker(input) && (
        this.date === undefined || !(this.minDate <= this.date && this.date <= this.maxDate)
      )
    );
  }

  validDatepicker(input: HTMLInputElement): boolean {
    return !this.emptyDatepicker(input) && !this.invalidDatepicker(input);
  }

  onClickTermsAndConditions() {
    this.dialog.open(TermsDialogComponent, { maxWidth: '25em' });
  }

  onSubmitSignupForm(form: NgForm) {
    this.authenticationService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

}
