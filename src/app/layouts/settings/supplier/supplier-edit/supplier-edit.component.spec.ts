import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SupplierEditComponent } from './supplier-edit.component';

describe('SupplierEditComponent', () => {
  let component: SupplierEditComponent;
  let fixture: ComponentFixture<SupplierEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
