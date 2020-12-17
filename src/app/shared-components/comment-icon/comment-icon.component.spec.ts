import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentIconComponent } from './comment-icon.component';
import { TaskOutputItems } from 'src/app/api';

describe('CommentIconComponent', () => {
  let component: CommentIconComponent;
  let fixture: ComponentFixture<CommentIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentIconComponent);
    component = fixture.componentInstance;
    const task: TaskOutputItems = {
      queueItem: {
        comments: {
          unresolved: 1
        }
      }
    };
    component.task = task
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
