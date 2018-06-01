import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SprintService } from '../sprint.service';
import { ISprint } from '../sprint.model';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.css']
})
export class NewSprintComponent implements OnInit {
  newSprintForm = new FormGroup({
    selectedSprint: new FormControl('', { validators: [Validators.required] })
  });
  sprints: ISprint[] = [];

  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.sprintService.getAvailableSprints()
      .pipe(map(response => response.json()))
      .subscribe(response => this.sprints = response);
  }

  onSubmitNewSprintForm() {
    this.sprintService.startSprint(this.newSprintForm.value.selectedSprint);
  }

}
