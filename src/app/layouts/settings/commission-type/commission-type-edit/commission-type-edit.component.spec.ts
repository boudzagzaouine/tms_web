import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionTypeEditComponent } from './commission-type-edit.component';

describe('CommissionTypeEditComponent', () => {
  let component: CommissionTypeEditComponent;
  let fixture: ComponentFixture<CommissionTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
