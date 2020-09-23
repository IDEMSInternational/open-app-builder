import { TestBed } from '@angular/core/testing';

import { OnlineChatServiceService } from './online-chat-service.service';

describe('OnlineChatServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineChatServiceService = TestBed.get(OnlineChatServiceService);
    expect(service).toBeTruthy();
  });
});
