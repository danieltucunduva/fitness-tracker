import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SprintService } from '../../sprint.service';

@Component({
  selector: 'app-sprint-finished-dialog',
  templateUrl: './sprint-finished-dialog.component.html',
  styleUrls: ['./sprint-finished-dialog.component.css']
})
export class SprintFinishedDialogComponent implements OnInit {
  sprintName: string;
  sprintStart: Date;
  sprintFinish: Date;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sprintService: SprintService) { }

  ngOnInit() {
    this.sprintName = this.sprintService.getFullName(this.data.sprint);
    this.sprintStart = this.data.sprint.startedAt;
    this.sprintFinish = this.data.sprint.finishedAt;
  }

}
