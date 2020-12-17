import { TestBed } from '@angular/core/testing';

import { SentryErrorHandler as SentryService } from './sentry.service';

describe('SentryService', () => {
  let service: SentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
