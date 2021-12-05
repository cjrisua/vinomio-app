import { TestBed } from '@angular/core/testing';

import { VinomiowineService } from './vinomiowine.service';

describe('VinomiowineService', () => {
  let service: VinomiowineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomiowineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
