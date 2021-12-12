import { TestBed } from '@angular/core/testing';

import { VinomioVarietyService } from './vinomio-variety.service';

describe('VinomioVarietyService', () => {
  let service: VinomioVarietyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioVarietyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
