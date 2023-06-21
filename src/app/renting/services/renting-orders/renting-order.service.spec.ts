import { TestBed } from '@angular/core/testing';

import { RentingOrderService } from './renting-order.service';

describe('RentingOrderService', () => {
  let service: RentingOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentingOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
