import { TestBed } from '@angular/core/testing';

import { VinomioRegionService } from './vinomio-region.service';

describe('VinomioRegionService', () => {
  let service: VinomioRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
