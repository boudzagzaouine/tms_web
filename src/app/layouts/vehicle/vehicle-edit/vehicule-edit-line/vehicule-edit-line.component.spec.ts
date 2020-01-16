import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeEditLineComponent } from './vehicule-edit-line.component';

describe('VehiculeEditLineComponent', () => {
  let component: VehiculeEditLineComponent;
  let fixture: ComponentFixture<VehiculeEditLineComponent>;

  beforeEach(async(() => {
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
