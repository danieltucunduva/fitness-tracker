import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { SprintService } from './sprint.service';
import { ISprint } from './sprint.model';
import { Router } from '@angular/router';

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

  constructor(private sprintService: SprintService) { }

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

}
