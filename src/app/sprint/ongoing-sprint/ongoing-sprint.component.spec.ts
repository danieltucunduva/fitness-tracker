import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingSprintComponent } from './ongoing-sprint.component';

describe('OngoingSprintComponent', () => {
  let component: OngoingSprintComponent;
  let fixture: ComponentFixture<OngoingSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingSprintComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
