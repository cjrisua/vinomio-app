import { TestBed } from '@angular/core/testing';

import { VinomioProducerService } from './vinomio-producer.service';

describe('VinomioProducerService', () => {
  let service: VinomioProducerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioProducerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
