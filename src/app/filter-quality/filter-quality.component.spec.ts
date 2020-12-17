import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { FilterQualityComponent } from './filter-quality.component';

describe.skip('FilterQualityComponent', () => {
  let component: FilterQualityComponent;
  let fixture: ComponentFixture<FilterQualityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterQualityComponent, SharedComponentsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterQualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
