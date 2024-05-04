import { TestBed } from '@angular/core/testing';

import { CoomonsLibService } from './coomons-lib.service';

describe('CoomonsLibService', () => {
  let service: CoomonsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoomonsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
