import { TestBed } from '@angular/core/testing';

import { PreRfxService } from './pre-rfx.service';

describe('PreRfxService', () => {
  let service: PreRfxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreRfxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
