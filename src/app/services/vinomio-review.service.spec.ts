import { TestBed } from '@angular/core/testing';

import { VinomioReviewService } from './vinomio-review.service';

describe('VinomioReviewService', () => {
  let service: VinomioReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
