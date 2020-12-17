import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskOutputItems } from 'src/app/api';

@Component({
  selector: 'app-comment-icon',
  templateUrl: './comment-icon.component.html',
  styleUrls: ['./comment-icon.component.less']
})
export class CommentIconComponent implements OnInit {
  @Input() task: TaskOutputItems;
  @Output() handleClick = new EventEmitter<TaskOutputItems>();

  constructor() { }

  ngOnInit(): void {
  }

  clickEvent(): void {
    this.handleClick.emit(this.task);
  }
}
