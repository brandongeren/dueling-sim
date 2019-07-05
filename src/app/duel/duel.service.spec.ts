import { TestBed } from '@angular/core/testing';

import { DuelService } from './duel.service';

describe('DuelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuelService = TestBed.get(DuelService);
    expect(service).toBeTruthy();
  });
});
