import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TopicChipListComponent } from './topic-chip-list.component';

describe.skip('TopicChipListComponent', () => {
  let component: TopicChipListComponent;
  let fixture: ComponentFixture<TopicChipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopicChipListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicChipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
