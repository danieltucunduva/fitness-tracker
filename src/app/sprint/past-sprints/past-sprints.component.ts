import { Component, OnInit } from '@angular/core';
import { ISprint } from '../sprint.model';
import { MatTableDataSource } from '@angular/material';
import { SprintService } from '../sprint.service';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit {
  dataSource = new MatTableDataSource<ISprint>();
  displayedColumns = ['name', 'description', 'startedAt', 'status'];

  constructor(private sprintService: SprintService) { }

  ngOnInit() {
    this.dataSource.data = this.sprintService.getPastSprints();
  }

  onApplyPastSprintsTableFilter() {
  }

}
