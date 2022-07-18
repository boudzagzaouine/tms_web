import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAccountComponent } from './contract-account.component';

describe('ContactAccountComponent', () => {
  let component: ContractAccountComponent;
  let fixture: ComponentFixture<ContractAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
