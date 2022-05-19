import { TestBed } from '@angular/core/testing';

import { VinomioRoleService } from './vinomio-role.service';

describe('VinomioRoleService', () => {
  let service: VinomioRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinomioRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
