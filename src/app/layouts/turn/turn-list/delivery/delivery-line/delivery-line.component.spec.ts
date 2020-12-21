import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeliveryLineComponent } from './delivery-line.component';

describe('DeliveryLineComponent', () => {
  let component: DeliveryLineComponent;
  let fixture: ComponentFixture<DeliveryLineComponent>;

  beforeEach(waitForAsync(() => {
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
