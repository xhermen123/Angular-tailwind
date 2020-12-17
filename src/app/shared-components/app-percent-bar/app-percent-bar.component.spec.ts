import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppPercentBarComponent } from './app-percent-bar.component';

describe('AppPercentBarComponent', () => {
  let component: AppPercentBarComponent;
  let fixture: ComponentFixture<AppPercentBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPercentBarComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPercentBarComponent);
    component = fixture.componentInstance;
    let percent = 50;
    component.percent = percent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
