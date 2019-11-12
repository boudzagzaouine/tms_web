import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurEditComponent } from './chauffeur-edit.component';

describe('ChauffeurEditComponent', () => {
  let component: ChauffeurEditComponent;
  let fixture: ComponentFixture<ChauffeurEditComponent>;

  beforeEach(async(() => {
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
