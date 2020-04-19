import { TestBed } from '@angular/core/testing';

import { PreRfxWriteGuard } from './pre-rfx-write.guard';

describe('PreRfxWriteGuard', () => {
  let guard: PreRfxWriteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreRfxWriteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
