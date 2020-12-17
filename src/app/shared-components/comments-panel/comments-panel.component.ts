import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TaskOutput, TaskOutputItems, TaskInput, DefaultService, Comment, CommentInput } from 'src/app/api';

@Component({
  selector: 'app-comments-panel',
  templateUrl: './comments-panel.component.html',
  styleUrls: ['./comments-panel.component.less']
})
export class CommentsPanelComponent implements OnInit {
  @Output() doCancel = new EventEmitter<boolean>();
  @Input() queueId: string;
  @Input() contentId: string;

  public comments: Array<Comment> = [];
  public commentText: string;

  constructor(private apiService: DefaultService) { }

  ngOnInit(): void {
    this.apiService.getComments(this.queueId, this.contentId).subscribe(resp => {
      if (resp) {
        this.comments = resp;
      }
    });
  }

  cancelPanel() {
    this.doCancel.emit(true);
  }

  submit(ev) {
    const body: CommentInput = {};
    body.text = this.commentText;

    this.apiService.addComment(this.queueId, this.contentId, body).subscribe(resp => {
      if (resp) {
        this.comments.push(resp);
      }
    });
  }
}
