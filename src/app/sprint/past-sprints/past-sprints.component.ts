import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ISprint } from '../sprint.model';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SprintService } from '../sprint.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-past-sprints',
  templateUrl: './past-sprints.component.html',
  styleUrls: ['./past-sprints.component.css']
})
export class PastSprintsComponent implements OnInit, AfterViewInit {

  pastSprintsFilterForm = new FormGroup({ 'filter': new FormControl() });
  dataSource = new MatTableDataSource<ISprint>();
  displayedColumns = ['name', 'spacing', 'description', 'spacing', 'startedAt', 'spacing', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    this.dataSource.data = this.sprintService.getPastSprints();
    console.log(this.paginator);
  }

  onApplyPastSprintsTableFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    console.log(this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
