import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetEditComponent } from './trajet-edit.component';

describe('TrajetEditComponent', () => {
  let component: TrajetEditComponent;
  let fixture: ComponentFixture<TrajetEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrajetEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
