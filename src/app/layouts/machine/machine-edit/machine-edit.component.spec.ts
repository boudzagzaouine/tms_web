import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MachineEditComponent } from './machine-edit.component';

describe('MachineEditComponent', () => {
  let component: MachineEditComponent;
  let fixture: ComponentFixture<MachineEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
