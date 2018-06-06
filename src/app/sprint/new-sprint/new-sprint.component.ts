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
    selectedSprint: new FormControl('', { validators: [Validators.required] }),
    notify: new FormControl('', {}),
    description: new FormControl('', { validators: [Validators.required] })
  });
  sprints: ISprint[] = [];


  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.newSprintForm.get('notify').setValue(true);
    this.getAvailableSprints();
    this.sprintService.availableSprintsChanged.subscribe(changed => {
      if (changed) {
        this.getAvailableSprints();
      }
    });
  }


  private getAvailableSprints() {
    this.sprintService.getAvailableSprints()
      .pipe(map(response => response.json()))
      .subscribe(response => {
        this.sprints = response.sort(this.compareSprintDuration);
        const recommendedSprint = response.find(element => {
          return element.name === 'Pomodoro';
        });
        this.newSprintForm.get('selectedSprint').setValue(recommendedSprint._id);
      });
  }


  private compareSprintDuration(sprintA, sprintB): number {
    if (sprintA.duration < sprintB.duration) {
      return -1;
    }
    if (sprintA.duration > sprintB.duration) {
      return 1;
    }
    return 0;
  }


  getSprintFullName(sprint: ISprint): string {
    return this.sprintService.getFullName(sprint);
  }


  onSubmitNewSprintForm() {
    if (!this.newSprintForm.value.notify) {
      this.newSprintForm.value.notify = false;
    }
    this.sprintService.startSprint(
      this.newSprintForm.value.selectedSprint,
      this.newSprintForm.value.notify,
      this.newSprintForm.value.description);
  }


}
