import { TestBed } from '@angular/core/testing';

import { VinomioAllocationEventOfferService } from './vinomio-allocation-event-offer.service';

describe('VinomioAllocationEventOfferService', () => {
  let service: VinomioAllocationEventOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioAllocationEventOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
