import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLineEditComponent } from './order-line-edit.component';

describe('OrderLineEditComponent', () => {
  let component: OrderLineEditComponent;
  let fixture: ComponentFixture<OrderLineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderLineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderLineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
