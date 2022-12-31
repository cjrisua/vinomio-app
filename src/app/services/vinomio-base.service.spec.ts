import { TestBed } from '@angular/core/testing';

import { VinomioBaseService } from './vinomio-base.service';

describe('VinomioBaseService', () => {
  let service: VinomioBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
