import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionTagComponent } from './version-tag.component';

describe('VersionTagComponent', () => {
  let component: VersionTagComponent;
  let fixture: ComponentFixture<VersionTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersionTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
