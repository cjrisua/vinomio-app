import { TestBed } from '@angular/core/testing';

import { VinomioMerchantService } from './vinomio-merchant.service';

describe('VinomioMerchantService', () => {
  let service: VinomioMerchantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioMerchantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
