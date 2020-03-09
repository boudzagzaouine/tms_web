import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLineEditComponent } from './delivery-line-edit.component';

describe('DeliveryLineEditComponent', () => {
  let component: DeliveryLineEditComponent;
  let fixture: ComponentFixture<DeliveryLineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
