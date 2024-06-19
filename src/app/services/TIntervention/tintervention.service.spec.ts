import { TestBed } from '@angular/core/testing';

import { TinterventionService } from './tintervention.service';

describe('TinterventionService', () => {
  let service: TinterventionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinterventionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
