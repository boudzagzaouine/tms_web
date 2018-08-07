import { TestBed, inject } from '@angular/core/testing';

import { OrderTypeService } from './order-type.service';

describe('OrderTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderTypeService]
    });
  });

  it('should be created', inject([OrderTypeService], (service: OrderTypeService) => {
    expect(service).toBeTruthy();
  }));
});
