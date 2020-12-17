import { TestBed } from '@angular/core/testing';

import { ExampleService } from './example.service';

describe.skip('ExampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExampleService = TestBed.inject(ExampleService);
    expect(service).toBeTruthy();
  });
});
