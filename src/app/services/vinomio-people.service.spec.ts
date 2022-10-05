import { TestBed } from '@angular/core/testing';

import { VinomioPeopleService } from './vinomio-people.service';

describe('VinomioPeopleService', () => {
  let service: VinomioPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
