import { TestBed } from '@angular/core/testing';

import { VinomioCountryService } from './vinomio-country.service';

describe('VinomioCountryService', () => {
  let service: VinomioCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
