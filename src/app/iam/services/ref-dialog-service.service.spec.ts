import { TestBed } from '@angular/core/testing';

import { RefDialogServiceService } from './ref-dialog-service.service';

describe('RefDialogServiceService', () => {
  let service: RefDialogServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefDialogServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
