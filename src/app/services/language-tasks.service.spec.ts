import { TestBed } from '@angular/core/testing';

import { LanguageTasksService } from './language-tasks.service';

describe('LanguageTasksService', () => {
  let service: LanguageTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
