import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AppCommentComponent } from './app-comment.component';
import { DefaultService, Comment } from 'src/app/api';
import { UserService } from '../user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppCommentComponent', () => {
  let component: AppCommentComponent;
  let fixture: ComponentFixture<AppCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AppCommentComponent ],
      providers: [ DefaultService, UserService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCommentComponent);
    component = fixture.componentInstance;
    const comment: Comment = {
      moderatorId: 'test',
      resolved: true,
      commentId: 'comment',
      text: 'test'
    }
    component.comment = comment;
    component.queueId = 'task';
    component.contentId = 'content';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test for no comment', () => {
    const comment: Comment = {
      moderatorId: 'test',
      resolved: true,
      commentId: 'comment',
      text: null
    };
    component.comment = comment;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onEdit function', () => {
    component.onEdit();
    fixture.detectChanges();
    expect(component.isEdit).toEqual(true);
  });

  it('should call onSave function', fakeAsync(() => {
    component.onSave();
    fixture.detectChanges();
    tick();
    expect(component.isEdit).toEqual(false);
  }));
  
  it('should call onDelete function', fakeAsync(() => {
    component.onDelete();
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));
  
  it('should call onCancel function', fakeAsync(() => {
    component.onCancel();
    fixture.detectChanges();
    tick();
    expect(component.isEdit).toEqual(false);
  }));
   
  it('should call onResolve function', fakeAsync(() => {
    component.onResolve();
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));

  it('should call onResolve function when not resolved', fakeAsync(() => {
    const comment: Comment = {
      moderatorId: 'test',
      resolved: false,
      commentId: 'comment',
      text: 'test'
    };
    component.comment = comment;
    component.onResolve();
    fixture.detectChanges();
    tick();
    expect(component).toBeTruthy();
  }));
});
