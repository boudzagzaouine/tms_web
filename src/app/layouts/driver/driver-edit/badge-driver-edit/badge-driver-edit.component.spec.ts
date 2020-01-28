import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeDriverEditComponent } from './badge-driver-edit.component';

describe('BadgeDriverEditComponent', () => {
  let component: BadgeDriverEditComponent;
  let fixture: ComponentFixture<BadgeDriverEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeDriverEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeDriverEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
