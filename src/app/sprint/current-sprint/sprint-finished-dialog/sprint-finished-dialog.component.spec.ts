import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintFinishedDialogComponent } from './sprint-finished-dialog.component';

describe('StopSprintFinishedDialogComponent', () => {
  let component: SprintFinishedDialogComponent;
  let fixture: ComponentFixture<SprintFinishedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintFinishedDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintFinishedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
