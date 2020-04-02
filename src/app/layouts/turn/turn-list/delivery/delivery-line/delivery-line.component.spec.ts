import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryLineComponent } from './delivery-line.component';

describe('DeliveryLineComponent', () => {
  let component: DeliveryLineComponent;
  let fixture: ComponentFixture<DeliveryLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
