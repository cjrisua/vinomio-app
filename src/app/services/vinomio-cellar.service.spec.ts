import { TestBed } from '@angular/core/testing';

import { VinomioCellarService } from './vinomio-cellar.service';

describe('VinomioCellarService', () => {
  let service: VinomioCellarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioCellarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
