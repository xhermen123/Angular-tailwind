import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuditRulesComponent } from './audit-rules.component';

describe.skip('AuditRulesComponent', () => {
  let component: AuditRulesComponent;
  let fixture: ComponentFixture<AuditRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditRulesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
