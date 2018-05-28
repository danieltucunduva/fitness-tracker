import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { Moment } from 'moment';
import { MomentDateAdapter } from '@angular/material-moment-adapter';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  date: Date;
  maxDate: Date;
  minDate: Date;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.minDate = new Date();
    this.minDate.setFullYear(this.maxDate.getFullYear() - 120);
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

  onSubmitSignupForm(form: Form) {
    console.log(form);
  }

}
