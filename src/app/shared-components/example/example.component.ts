import { Component, EventEmitter, Input, Output } from '@angular/core';
import { set } from 'lodash';
import { Observable } from 'rxjs';

import { Example, ExampleVerifiedEvent } from './example';
import { ExampleService } from './example.service';
import { Topic } from '../interfaces';
import {
  TopicChipVerifyResult,
  TopicChipVerificationState,
} from '../topic-chip/topic-chip';

@Component({
  selector: 'mod-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.less'],
})
export class ExampleComponent {
  @Input() commitDefaults: Observable<void>;
  @Input() defaultVerifyState: TopicChipVerificationState =
    TopicChipVerificationState.DefaultCorrect;
  @Input() example: Example;
  @Input() highlightText: string;
  @Input() readOnly = true;
  @Input() showTopics = true;
  @Input() minimizeTopics = false;

  @Output() exampleDeleted = new EventEmitter<string>();
  @Output() exampleRedacted = new EventEmitter<string>();
  @Output() exampleVerified = new EventEmitter<ExampleVerifiedEvent>();
  @Output() riskChanged = new EventEmitter<Topic>();
  @Output() topicsUpdated = new EventEmitter<Topic[]>();

  constructor(private service: ExampleService) {}

  /**
   * Fired when the user selects a different topic for the example
   * @param decision The new topic/risk pair for the example
   */
  onRiskChanged(decision: Topic) {
    this.riskChanged.emit(decision);
  }

  /**
   * Fired when the user accepts/rejects a topic/risk pair
   * @param decision The user's verification decision
   */
  onVerified(decision: TopicChipVerifyResult) {
    set(
      this.example,
      ['_meta', 'verifyTopic', decision.topic.id.toString()],
      decision
    );
    const message: ExampleVerifiedEvent = {
      id: this.example.queueItem.contentId,
      decision,
    };
    this.exampleVerified.emit(message);
  }

  onTopicRemoved(topic: Topic) {
    const topics = this.example.queueItem.topics.slice();
    const topicIndex = topics.indexOf(topic);
    topics.splice(topicIndex, 1);
    this.topicsUpdated.emit(topics);
  }

  /**
   * Delete or redact an example
   * @param $event The triggering event
   */
  async redactOrDelete($event: MouseEvent) {
    // TODO: Make this a UI trigger, not hotkey
    const action = $event.shiftKey ? 'delete' : 'redact';
    const exampleId = this.example.queueItem.contentId;

    if (
      confirm(
        `Are you sure you want to ${action} this example?\n\n//TODO: Confirmation as inline component`
      )
    ) {
      if (action === 'delete') {
        this.service.deleteExample(this.example, 0, 0).subscribe(() => {
          const deletedExample: Example = {
            data: {
              text: '[DELETED]',
            },
            queueItem: {
              clientId: -1,
              comments: [],
              contentId: '',
              dateCreated: 0,
              decisions: [],
              language: { language: '' },
              prediction: [],
              priority: -1,
              pseudonymizedDate: -1,
              redacted: {},
              reviewsNeeded: 0,
              simplified: '',
              tags: [],
              topics: [],
              originalTopics: {},
            },
          };
          this.example = deletedExample;
          this.exampleDeleted.emit(exampleId);
        });
      }

      if (action === 'redact') {
        // Redact the example on the API
        try {
          await this.service.redactExample(this.example);

          this.exampleRedacted.emit(exampleId);
        } catch (error) {
          console.warn(error);
        }
      }
    }
  }
}
