import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContractTypeEditComponent } from './contract-type-edit.component';

describe('ContractTypeEditComponent', () => {
  let component: ContractTypeEditComponent;
  let fixture: ComponentFixture<ContractTypeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
