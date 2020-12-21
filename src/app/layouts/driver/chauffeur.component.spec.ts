import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChauffeurComponent } from './chauffeur.component';

describe('ChauffeurComponent', () => {
  let component: ChauffeurComponent;
  let fixture: ComponentFixture<ChauffeurComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
