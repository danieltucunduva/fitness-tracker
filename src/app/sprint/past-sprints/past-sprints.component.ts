import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ISprint } from '../sprint.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SprintService } from '../sprint.service';
import { FormGroup, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<ISprint>();
  displayedColumns = ['name', 'spacing', 'status', 'spacing', 'startedDate', 'spacing', 'description'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sprintService: SprintService) {
  }

  ngOnInit(): void {
    this.sprintService.getPastSprints()
      .pipe(map(response => response.json()))
      .subscribe(response => this.dataSource.data = response);
  }

  onApplyPastSprintsTableFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
