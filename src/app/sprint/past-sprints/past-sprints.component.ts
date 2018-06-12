import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ISprint } from '../sprint.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SprintService } from '../sprint.service';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ISprint>();
  displayedColumns = [
    'name', 'spacing', 'status', 'spacing', 'startedDate', 'spacing',
    'startedTime', 'spacing', 'finishedTime', 'spacing', 'description'
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.sprintService.getPastSprints()
      .pipe(map(response => response.json()))
      .subscribe(response => this.dataSource.data = response.data.docs);
    this.authenticationService.dataDeleted.subscribe(deleted => {
      if (deleted) {
        this.sprintService.getPastSprints()
          .pipe(map(response => response.json()))
          .subscribe(response => this.dataSource.data = response.data.docs);
      }
    });
  }

  onApplyPastSprintsTableFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'startedDate': return new Date(item.startedAt);
        default: return item[property];
      }
    };
    this.dataSource.filterPredicate = (data: ISprint, filter: string) => (
      this.getSprintFullName(data).trim().toLowerCase().includes(filter) ||
      this.getStatus(data).trim().toLowerCase().includes(filter) ||
      data.description.trim().toLowerCase().includes(filter) ||
      data.startedAt.toString().trim().toLowerCase().includes(filter)
    );
  }

  getSprintFullName(sprint: ISprint): string {
    return this.sprintService.getFullName(sprint);
  }

  getStatus(sprint: ISprint) {
    const status: string = sprint.status.charAt(0).toUpperCase() + sprint.status.slice(1);
    const progress: string = sprint.status === 'completed' ? '' : ' (at ' + sprint.progress + '%)';
    return status + progress;
  }

}
