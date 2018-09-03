import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtnPlanComponent } from './mtnplan.component';

describe('MtnPlanComponent', () => {
  let component: MtnPlanComponent;
  let fixture: ComponentFixture<MtnPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtnPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtnPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
