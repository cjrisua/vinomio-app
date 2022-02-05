import { TestBed } from '@angular/core/testing';

import { VinomioAllocationService } from './vinomio-allocation.service';

describe('VinomioAllocationService', () => {
  let service: VinomioAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
