import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReceptionListComponent } from './reception-list.component';

describe('ReceptionListComponent', () => {
  let component: ReceptionListComponent;
  let fixture: ComponentFixture<ReceptionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
