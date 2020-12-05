import { TestBed } from '@angular/core/testing';

import { FamilyService } from './family.service';

describe('FamilyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FamilyService = TestBed.get(FamilyService);
    expect(service).toBeTruthy();
  });
});
