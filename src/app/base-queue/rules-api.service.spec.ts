import { TestBed } from '@angular/core/testing';

import { RulesApiService } from './rules-api.service';

describe('RulesApiService', () => {
  let service: RulesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
