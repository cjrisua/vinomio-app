import { TestBed } from '@angular/core/testing';

import { VinomioAllocationEventService } from './vinomio-allocation-event.service';

describe('VinomioAllocationEventService', () => {
  let service: VinomioAllocationEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioAllocationEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
