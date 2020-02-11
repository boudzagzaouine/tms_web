import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogTransportTypeComponent } from './catalog-transport-type.component';

describe('CatalogTransportTypeComponent', () => {
  let component: CatalogTransportTypeComponent;
  let fixture: ComponentFixture<CatalogTransportTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogTransportTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogTransportTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
