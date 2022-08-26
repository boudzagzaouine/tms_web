import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinisterEditComponent } from './sinister-edit.component';

describe('SinisterEditComponent', () => {
  let component: SinisterEditComponent;
  let fixture: ComponentFixture<SinisterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinisterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
