import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ISprint } from '../sprint.model';
import { SprintService } from '../sprint.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-sprint-template',
  templateUrl: './sprint-template.component.html',
  styleUrls: ['./sprint-template.component.css']
})
export class SprintTemplateComponent implements OnInit {
  newSprintTemplateForm = new FormGroup({
    username: new FormControl({ value: this.authenticationService.getUserName(), disabled: true }),
    name: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
    length: new FormControl('', { validators: [Validators.required, Validators.min(1)] })
  });
  importedSprints: ISprint[] = [];

  constructor(
    private sprintService: SprintService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
  }

  onSubmitNewSprintTemplateForm(): void {
    this.sprintService.createSharedSprintTemplate(
      this.authenticationService.getUserId(),
      this.newSprintTemplateForm.value.name,
      this.newSprintTemplateForm.value.length);
  }
}

