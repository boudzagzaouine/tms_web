import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetourOrderTransportListComponent } from './add-retour-order-transport-list.component';

describe('AddRetourOrderTransportListComponent', () => {
  let component: AddRetourOrderTransportListComponent;
  let fixture: ComponentFixture<AddRetourOrderTransportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetourOrderTransportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRetourOrderTransportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
