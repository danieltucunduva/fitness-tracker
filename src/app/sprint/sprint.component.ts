import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintService } from './sprint.service';
import { ISprint } from './sprint.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { MatDialog } from '@angular/material';
import { SprintDialogComponent } from './sprint-dialog/sprint-dialog.component';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  ongoingSprint = false;
  sprintSubscription: Subscription;
  tabIndex = 0;
  pastSprintsSubscription: Subscription;

  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sprintSubscription = this.sprintService.sprintChanged.subscribe(sprint => {
      if (sprint) {
        this.ongoingSprint = true;
      } else {
        this.ongoingSprint = false;
      }
    });
    this.pastSprintsSubscription = this.sprintService.pastSprintsChanged.subscribe(sprint => {
      if (sprint) {
        this.tabIndex = 0;
      } else {
        this.tabIndex = 1;
      }
    });
    this.sprintService.checkOnePastSprint();
  }

  sprintStop() {
    this.ongoingSprint = false;
  }

  onClickDeleteUser() {
    const dialogRef = this.dialog.open(SprintDialogComponent, { data: { type: 'delete-user' } });
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.authenticationService.deleteLoggedUser();
      }
    });
  }

}
