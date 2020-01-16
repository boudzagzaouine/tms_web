import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverBadgetypeLineEditComponent } from './driver-badgetype-line-edit.component';

describe('DriverBadgetypeLineEditComponent', () => {
  let component: DriverBadgetypeLineEditComponent;
  let fixture: ComponentFixture<DriverBadgetypeLineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverBadgetypeLineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverBadgetypeLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
