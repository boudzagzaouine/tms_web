import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonyComponent } from './patrimony.component';

describe('PatrimonyComponent', () => {
  let component: PatrimonyComponent;
  let fixture: ComponentFixture<PatrimonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
