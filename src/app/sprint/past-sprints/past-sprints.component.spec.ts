import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSprintsComponent } from './past-sprints.component';

describe('PastSprintsComponent', () => {
  let component: PastSprintsComponent;
  let fixture: ComponentFixture<PastSprintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PastSprintsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSprintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
