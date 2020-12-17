import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AuditQueueItem } from 'src/app/base-queue/interfaces/audit-queue-item.interface';
import { AuditRulesItemData } from '../../audit-rules/audit-rules';
import { Example } from 'src/app/shared-components/example/example';
import { ExampleService } from 'src/app/shared-components/example/example.service';
import { Topic } from 'src/app/shared-components/interfaces';
import { Subject } from 'rxjs';
import { QueueLabelGroup } from 'src/app/base-queue/interfaces/queue-label-group.interface';

@Component({
  selector: 'ftq-rules-audit-queue-item',
  templateUrl: './rules-audit-queue-item.component.html',
  styleUrls: ['./rules-audit-queue-item.component.less'],
})
export class RuleAuditQueueItemComponent implements OnInit {
  @Input() rule: AuditQueueItem<AuditRulesItemData>;
  @Input() isReviewing: boolean;
  @Input() minimizeTopics: boolean;
  @Input() labelGroups: QueueLabelGroup[];

  @Output() riskChanged = new EventEmitter<Topic>();
  @Output() topicsUpdated = new EventEmitter<Topic[]>();
  @Output() tagsUpdated = new EventEmitter<string[]>();

  commitTopicDefaults = new Subject<void>();
  examples: Promise<Example[]>;

  constructor(private readonly exampleService: ExampleService) {}

  async ngOnInit() {
    this.examples = this.loadExamples();
  }

  async loadExamples(): Promise<Example[]> {
    const res = await this.exampleService.searchExamples(
      this.rule.data.text,
      this.rule.queueItem.language,
      this.rule.queueItem.clientId
    );

    return res.items;
  }

  onTopicRemoved(topic: Topic) {
    const topics = this.rule.queueItem.topics.slice();
    const topicIndex = topics.indexOf(topic);
    topics.splice(topicIndex, 1);
    this.topicsUpdated.emit(topics);
  }

  onRiskChanged(decision: Topic) {
    this.riskChanged.emit(decision);
  }

  onTagsUpdated(updatedTags: string[]) {
    this.tagsUpdated.emit(updatedTags);
  }
}
