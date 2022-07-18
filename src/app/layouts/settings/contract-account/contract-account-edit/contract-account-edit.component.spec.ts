import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAccountEditComponent } from './contract-account-edit.component';

describe('ContractAccountEditComponent', () => {
  let component: ContractAccountEditComponent;
  let fixture: ComponentFixture<ContractAccountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractAccountEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
