import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZoneEditComponent } from './zone-edit.component';

describe('ZoneEditComponent', () => {
  let component: ZoneEditComponent;
  let fixture: ComponentFixture<ZoneEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
