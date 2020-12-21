import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransportEditComponent } from './transport-edit.component';

describe('TransportEditComponent', () => {
  let component: TransportEditComponent;
  let fixture: ComponentFixture<TransportEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
