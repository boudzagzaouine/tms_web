import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTermEditComponent } from './insurance-term-edit.component';

describe('InsuranceTermEditComponent', () => {
  let component: InsuranceTermEditComponent;
  let fixture: ComponentFixture<InsuranceTermEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceTermEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceTermEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
