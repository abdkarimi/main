import { TestBed } from '@angular/core/testing';

import { CatvehiculeService } from './catvehicule.service';

describe('CatvehiculeService', () => {
  let service: CatvehiculeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatvehiculeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
