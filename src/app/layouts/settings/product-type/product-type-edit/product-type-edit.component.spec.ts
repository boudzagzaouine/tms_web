import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductTypeEditComponent } from './product-type-edit.component';

describe('ProductTypeEditComponent', () => {
  let component: ProductTypeEditComponent;
  let fixture: ComponentFixture<ProductTypeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
