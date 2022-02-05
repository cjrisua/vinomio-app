import { TestBed } from '@angular/core/testing';

import { VinomioCollectionService } from './vinomio-collection.service';

describe('VinomioCollectionService', () => {
  let service: VinomioCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
