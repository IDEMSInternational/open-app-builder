import { TestBed } from '@angular/core/testing';

import { PlhDataService } from './plh-data.service';

describe('PlhDataService', () => {
  let service: PlhDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlhDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
