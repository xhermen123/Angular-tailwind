import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

import { Topic } from '../interfaces';
import {
  TopicChipVerifyResult,
  TopicChipVerificationState,
} from './topic-chip';

@Component({
  selector: 'mod-topic-chip',
  templateUrl: './topic-chip.component.html',
  styles: [':host { display: inline-flex; }'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ overflow: 'hidden', width: 0 }),
        animate('200ms ease-in', style({ width: '100%' })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ width: 0 }))]),
    ]),
  ],
})
export class TopicChipComponent implements OnInit {
  @Input() defaultVerifyState: TopicChipVerificationState;
  @Input() maxRisk = 7;
  @Input() minRisk = 0;
  @Input() readOnly = false;
  @Input() showVerifyButtons = false;
  @Input() minimized = false;
  @Input() topic: Topic;
  @Input() verification: TopicChipVerificationState;
  @Input() type: 'default' | 'secondary' = 'default';

  @Output() removed = new EventEmitter<Topic>();
  @Output() riskChanged = new EventEmitter<Topic>();
  @Output() verified = new EventEmitter<TopicChipVerifyResult>();

  editing = false;
  risks: number[] = [];
  verificationStates = TopicChipVerificationState;

  ngOnInit() {
    for (let i = this.minRisk; i <= this.maxRisk; i++) {
      this.risks.push(i);
    }
    if (this.defaultVerifyState) this.verification = this.defaultVerifyState;
  }

  /////

  @Input()
  commitDefault() {
    console.log('Commiting default');
  }

  /**
   * Fired when the user clicks the delete button on a topic
   */
  removeTopic() {
    this.removed.emit(this.topic);
  }

  setTopicRisk(risk: number) {
    this.riskChanged.emit(
      new Topic(this.topic.id, risk, this.topic.verification)
    );
    this.editing = false;
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  /**
   * Allow a user to mark a topic as right/wrong in its current context
   * @param result The user's response to the topic/risk pair.
   */
  verify(result: TopicChipVerificationState) {
    this.verified.emit({
      topic: this.topic,
      result,
    });
    this.verification = result;
  }
}
