import { TestBed } from '@angular/core/testing';

import { HabitService } from './habit.service';

describe('HabitService', () => {
  let service: HabitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
