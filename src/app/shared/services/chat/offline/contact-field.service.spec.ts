import { TestBed } from '@angular/core/testing';

import { ContactFieldService } from './contact-field.service';

describe('ContactFieldService', () => {
  let service: ContactFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
