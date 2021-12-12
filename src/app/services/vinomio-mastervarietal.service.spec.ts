import { TestBed } from '@angular/core/testing';

import { VinomioMastervarietalService } from './vinomio-mastervarietal.service';

describe('VinomioMastervarietalService', () => {
  let service: VinomioMastervarietalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioMastervarietalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
