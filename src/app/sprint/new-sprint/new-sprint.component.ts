import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {
  newSprintForm = new FormGroup({
    selectedExercise: new FormControl('', { validators: [Validators.required] })
  });

  @Output() sprintStart = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSubmitNewSprintForm() {
    this.sprintStart.emit();
  }

}
