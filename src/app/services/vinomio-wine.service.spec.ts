import { TestBed } from '@angular/core/testing';

import { VinomioWineService } from './vinomio-wine.service';

describe('VinomioWineService', () => {
  let service: VinomioWineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioWineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
