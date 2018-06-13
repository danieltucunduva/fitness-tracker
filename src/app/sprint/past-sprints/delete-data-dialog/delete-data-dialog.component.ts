import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { SprintService } from '../../sprint.service';

@Component({
  selector: 'app-delete-data-dialog',
  templateUrl: './delete-data-dialog.component.html',
  styleUrls: ['./delete-data-dialog.component.css']
})
export class DeleteDataDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sprintService: SprintService) { }

  ngOnInit() { }

}
