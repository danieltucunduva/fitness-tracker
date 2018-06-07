import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SprintService } from '../sprint.service';
import { ISprint } from '../sprint.model';

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
  yesButtonColor = 0; // 0 => accent, 1 => warn

  noButtonText: string;
  noButtonPresent: boolean;

  submitButtonPresent = false;
  submitButtonText: string;

  templateTablePresent = false;
  // sprintTemplates: ISprint[] = [];
  sprintTemplates = [1, 2, 3];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sprintService: SprintService) { }

  ngOnInit() {
    if (this.data.type === 'cancel-sprint') {
      this.templateTablePresent = false;
      this.dialogTitle = 'Do you want to cancel the sprint?';
      this.yesButtonText = 'Yes';
      this.yesButtonPresent = true;
      this.noButtonText = 'No';
      this.noButtonPresent = true;
      this.dialogTextPresent = false;
    }

    if (this.data.type === 'sprint-finished') {
      this.templateTablePresent = false;
      this.dialogTitle = 'Sprint finished';
      this.sprintName = this.sprintService.getFullName(this.data.sprint);
      this.sprintStart = this.data.sprint.startedAt;
      this.sprintFinish = this.data.sprint.finishedAt;
      this.dialogTextPresent = true;
      this.noButtonText = '✔';
      this.noButtonPresent = true;
      this.yesButtonPresent = false;
    }

    if (this.data.type === 'delete-user') {
      this.templateTablePresent = false;
      this.dialogTitle = 'Deletion is irreversible. Are you sure?';
      this.yesButtonText = 'Yes';
      this.yesButtonPresent = true;
      this.noButtonText = 'No';
      this.noButtonPresent = true;
      this.dialogTextPresent = false;
      this.yesButtonColor = 1;
    }

    if (this.data.type === 'import-sprint-template') {
      // this.sprintService.getTemplatesToImport(); this.templates =
      this.noButtonPresent = false;
      this.yesButtonPresent = false;
      this.dialogTitle = 'List of templates created by other users:';
      this.noButtonPresent = false;
      this.dialogTextPresent = false;
      this.templateTablePresent = true;
      this.submitButtonPresent = true;
      this.submitButtonText = 'Import';
    }
  }

}
