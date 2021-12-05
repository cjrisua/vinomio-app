import { TestBed } from '@angular/core/testing';

import { VinomioproducerService } from './vinomioproducer.service';

describe('VinomioproducerService', () => {
  let service: VinomioproducerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioproducerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
