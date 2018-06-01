import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SprintService } from '../sprint.service';

@Component({
  selector: 'app-sprint-dialog',
  templateUrl: './sprint-dialog.component.html',
  styleUrls: ['./sprint-dialog.component.css']
})
export class SprintDialogComponent implements OnInit {
  dialogTitle: string;

  dialogTextPresent: boolean;

  sprintName: string;
  sprintStart: Date;
  sprintFinish: Date;

  yesButtonText: string;
  yesButtonPresent: boolean;

  noButtonText: string;
  noButtonPresent: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sprintService: SprintService) { }

  ngOnInit() {
    if (this.data.type === 'cancel-sprint') {
      this.dialogTitle = 'Do you want to cancel the sprint?';
      this.yesButtonText = 'Yes';
      this.yesButtonPresent = true;
      this.noButtonText = 'No';
      this.noButtonPresent = true;
      this.dialogTextPresent = false;
    }

    if (this.data.type === 'sprint-finished') {
      this.dialogTitle = 'Sprint finished';
      this.sprintName = this.sprintService.getFullName(this.data.sprint);
      this.sprintStart = this.data.sprint.startedDate;
      this.sprintFinish = this.data.sprint.finishedDate;
      this.dialogTextPresent = true;
      this.noButtonText = '✔';
      this.noButtonPresent = true;
      this.yesButtonPresent = false;
    }
  }

}
