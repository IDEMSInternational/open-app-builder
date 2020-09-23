import { TestBed } from '@angular/core/testing';

import { OfflineChatService } from './offline-chat.service';

describe('OfflineChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfflineChatService = TestBed.get(OfflineChatService);
    expect(service).toBeTruthy();
  });
});
