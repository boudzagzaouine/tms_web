import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CatalogTransportTypeEditComponent } from './catalog-transport-type-edit.component';

describe('CatalogTransportTypeEditComponent', () => {
  let component: CatalogTransportTypeEditComponent;
  let fixture: ComponentFixture<CatalogTransportTypeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogTransportTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTransportTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
