import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styleUrls: ['./topic-info.component.less']
})
export class TopicInfoComponent  {
  @Input() topic: any;
  @Input() color: string;
  @Input() small = false;
}
