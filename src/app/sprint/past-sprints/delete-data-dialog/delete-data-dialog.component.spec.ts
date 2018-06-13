import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDataDialogComponent } from './delete-data-dialog.component';

describe('DeleteDataDialogComponent', () => {
  let component: DeleteDataDialogComponent;
  let fixture: ComponentFixture<DeleteDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
