import { TestBed } from '@angular/core/testing';

import { VinomioVintageService } from './vinomio-vintage.service';

describe('VinomioVintageService', () => {
  let service: VinomioVintageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioVintageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
