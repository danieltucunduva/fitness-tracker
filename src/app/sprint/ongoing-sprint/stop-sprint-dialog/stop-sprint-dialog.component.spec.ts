import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSprintDialogComponent } from './stop-sprint-dialog.component';

describe('StopSprintDialogComponent', () => {
  let component: StopSprintDialogComponent;
  let fixture: ComponentFixture<StopSprintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopSprintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopSprintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
