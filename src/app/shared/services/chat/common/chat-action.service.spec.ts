import { TestBed } from '@angular/core/testing';

import { ChatActionService } from './chat-action.service';

describe('ChatActionService', () => {
  let service: ChatActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
