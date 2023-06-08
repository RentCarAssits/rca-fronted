import { TestBed } from '@angular/core/testing';

import { RentingOrderItemsService } from './renting-order-items.service';

describe('RentingOrderItemsService', () => {
  let service: RentingOrderItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentingOrderItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
