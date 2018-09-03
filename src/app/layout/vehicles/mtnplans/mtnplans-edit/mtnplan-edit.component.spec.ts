import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtnPlanEditComponent } from './mtnplan-edit.component';

describe('MtnPlanEditComponent', () => {
  let component: MtnPlanEditComponent;
  let fixture: ComponentFixture<MtnPlanEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtnPlanEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtnPlanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
