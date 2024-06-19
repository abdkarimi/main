import { TestBed } from '@angular/core/testing';

import { ConcessionnaireService } from './concessionnaire.service';

describe('ConcessionnaireService', () => {
  let service: ConcessionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcessionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
