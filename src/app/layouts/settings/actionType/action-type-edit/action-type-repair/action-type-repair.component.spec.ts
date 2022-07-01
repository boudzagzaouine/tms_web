import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTypeRepairComponent } from './action-type-repair.component';

describe('ActionTypeRepairComponent', () => {
  let component: ActionTypeRepairComponent;
  let fixture: ComponentFixture<ActionTypeRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionTypeRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTypeRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
