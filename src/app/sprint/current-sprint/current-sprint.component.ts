import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopSprintDialogComponent } from './stop-sprint-dialog/stop-sprint-dialog.component';

@Component({
  selector: 'app-current-sprint',
  templateUrl: './current-sprint.component.html',
  styleUrls: ['./current-sprint.component.css']
})
export class CurrentSprintComponent implements OnInit {
  progressSpinnerValue = 0;
  timer = 0;
  @Output() sprintStop = new EventEmitter<void>();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeProgressTimer();
  }

  startOrResumeProgressTimer() {
    this.timer = window.setInterval(() => {
      if (this.progressSpinnerValue >= 100) {
        clearInterval(this.timer);
      } else {
        this.progressSpinnerValue = this.progressSpinnerValue + 5;
      }
    }, 1000);
  }

  onClickStopSprint() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopSprintDialogComponent);
    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.sprintStop.emit();
      } else {
        this.startOrResumeProgressTimer();
      }
    });
  }

}
