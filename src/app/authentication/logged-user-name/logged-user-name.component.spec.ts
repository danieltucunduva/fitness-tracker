import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserNameComponent } from './logged-user-name.component';

describe('LoggedUserNameComponent', () => {
  let component: LoggedUserNameComponent;
  let fixture: ComponentFixture<LoggedUserNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedUserNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
