import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppBreadcrumbsComponent } from './breadcrumbs.component';
import { RouterModule } from '@angular/router';

describe('AppBreadcrumbsComponent', () => {
  let component: AppBreadcrumbsComponent;
  let fixture: ComponentFixture<AppBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppBreadcrumbsComponent],
      imports: [RouterModule.forRoot([])],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
