import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeTypeEditComponent } from './badge-type-edit.component';

describe('BadgeTypeEditComponent', () => {
  let component: BadgeTypeEditComponent;
  let fixture: ComponentFixture<BadgeTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
