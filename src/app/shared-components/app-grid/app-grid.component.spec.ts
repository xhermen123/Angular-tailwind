import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppGridComponent } from './app-grid.component';

describe.skip('AppGridComponent', () => {
  let component: AppGridComponent;
  let fixture: ComponentFixture<AppGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppGridComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
