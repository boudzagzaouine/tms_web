import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VehiculeEditLineComponent } from './vehicule-edit-line.component';

describe('VehiculeEditLineComponent', () => {
  let component: VehiculeEditLineComponent;
  let fixture: ComponentFixture<VehiculeEditLineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculeEditLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeEditLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
