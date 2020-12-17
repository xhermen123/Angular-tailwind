import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LanguageTasksDetailsHeaderComponent } from './header.component';
import { FilterService } from 'src/app/services/filter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ConstantsService } from 'src/app/services/constants.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LanguageTasksDetailsHeaderComponent', () => {
  let component: LanguageTasksDetailsHeaderComponent;
  let fixture: ComponentFixture<LanguageTasksDetailsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ LanguageTasksDetailsHeaderComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ConstantsService, FilterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageTasksDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
