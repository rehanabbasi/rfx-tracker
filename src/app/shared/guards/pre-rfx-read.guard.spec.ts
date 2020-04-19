import { TestBed } from '@angular/core/testing';

import { PreRfxReadGuard } from './pre-rfx-read.guard';

describe('PreRfxReadGuard', () => {
  let guard: PreRfxReadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreRfxReadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
