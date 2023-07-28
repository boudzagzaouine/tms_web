import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetourOrderTransportComponent } from './add-retour-order-transport.component';

describe('AddRetourOrderTransportComponent', () => {
  let component: AddRetourOrderTransportComponent;
  let fixture: ComponentFixture<AddRetourOrderTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetourOrderTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetourOrderTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
