import { TestBed } from '@angular/core/testing';

import { VinomioTagService } from './vinomio-tag.service';

describe('VinomioTagService', () => {
  let service: VinomioTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
