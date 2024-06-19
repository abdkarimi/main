import { TestBed } from '@angular/core/testing';

import { TcarburantService } from './tcarburant.service';

describe('TcarburantService', () => {
  let service: TcarburantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TcarburantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
