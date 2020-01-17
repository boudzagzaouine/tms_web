import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomptionDriverListComponent } from './consomption-driver-list.component';

describe('ConsomptionDriverListComponent', () => {
  let component: ConsomptionDriverListComponent;
  let fixture: ComponentFixture<ConsomptionDriverListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsomptionDriverListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsomptionDriverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
