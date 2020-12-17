import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TopicChipComponent } from './topic-chip.component';

describe.skip('TopicChipComponent', () => {
  let component: TopicChipComponent;
  let fixture: ComponentFixture<TopicChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicChipComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
