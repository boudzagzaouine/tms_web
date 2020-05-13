import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrimonyEditComponent } from './patrimony-edit.component';

describe('PatrimonyEditComponent', () => {
  let component: PatrimonyEditComponent;
  let fixture: ComponentFixture<PatrimonyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrimonyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrimonyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
