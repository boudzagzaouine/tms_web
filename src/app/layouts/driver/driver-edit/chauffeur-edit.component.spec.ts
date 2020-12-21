import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChauffeurEditComponent } from './driver-edit.component';

describe('ChauffeurEditComponent', () => {
  let component: ChauffeurEditComponent;
  let fixture: ComponentFixture<ChauffeurEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
