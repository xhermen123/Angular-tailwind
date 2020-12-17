import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsPanelComponent } from './comments-panel.component';
import { DefaultService } from 'src/app/api';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cpus } from 'os';

describe('CommentsPanelComponent', () => {
  let component: CommentsPanelComponent;
  let fixture: ComponentFixture<CommentsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ CommentsPanelComponent ],
      providers: [ DefaultService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsPanelComponent);
    component = fixture.componentInstance;
    const queueId = 'task';
    const contentId = 'content';
    component.queueId = queueId;
    component.contentId = contentId;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
