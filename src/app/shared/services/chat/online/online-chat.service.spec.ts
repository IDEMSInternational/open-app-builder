import { TestBed } from '@angular/core/testing';

import { OnlineChatService } from './online-chat.service';

describe('OnlineChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineChatService = TestBed.get(OnlineChatService);
    expect(service).toBeTruthy();
  });
});
