import { TestBed } from '@angular/core/testing';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DefaultService } from './api';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DefaultService', () => {
  let service: DefaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DefaultService ]
    });
    service = TestBed.inject(DefaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
