import { TestBed } from '@angular/core/testing';

import { AuditRulesService } from './audit-rules.service';

describe.skip('AuditRulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuditRulesService = TestBed.inject(AuditRulesService);
    expect(service).toBeTruthy();
  });
});
