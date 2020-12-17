import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLanguageButtonGroupComponent } from './app-language-button-group.component';

describe('AppLanguageButtonGroupComponent', () => {
  let component: AppLanguageButtonGroupComponent;
  let fixture: ComponentFixture<AppLanguageButtonGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLanguageButtonGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLanguageButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
