import { TestBed } from '@angular/core/testing';

import { WorkshopChatService } from './workshop-chat.service';

describe('MessageService', () => {
  let service: WorkshopChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkshopChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
