import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintTemplateComponent } from './sprint-template.component';

describe('SprintTemplateComponent', () => {
  let component: SprintTemplateComponent;
  let fixture: ComponentFixture<SprintTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprintTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
