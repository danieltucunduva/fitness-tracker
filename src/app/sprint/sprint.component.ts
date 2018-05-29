import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SprintService } from './sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  ongoingSprint = false;
  sprintSubscription: Subscription;

  constructor(private sprintService: SprintService) { }

  ngOnInit() {
    this.sprintSubscription = this.sprintService.sprintChanged.subscribe(sprint => {
      if (sprint) {
        this.ongoingSprint = true;
      } else {
        this.ongoingSprint = false;
      }
    });
  }

}
