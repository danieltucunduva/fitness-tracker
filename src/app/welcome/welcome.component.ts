import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TermsDialogComponent } from '../welcome/terms-dialog/terms-dialog.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  onClickTermsAndConditions() {
    this.dialog.open(TermsDialogComponent, { maxWidth: '20em' });
  }

}
