import { TestBed } from '@angular/core/testing';

import { VinomioService } from './vinomio.service';

describe('VinomioService', () => {
  let service: VinomioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
