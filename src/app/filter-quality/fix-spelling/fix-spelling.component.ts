import { Component } from '@angular/core';

import { FixSpellingItem } from './fix-spelling';
import { BaseQueueComponent } from '../../base-queue/base-queue.component';
import {
  BaseQueueService,
  QUEUE_NAME,
  QUEUE_CONFIG,
} from '../../base-queue/base-queue.service';
import { QueueConfig } from 'src/app/base-queue/interfaces/queue-config.interface';
import { AuditQueueItem } from 'src/app/base-queue/interfaces/audit-queue-item.interface';
import { RulesApiService } from 'src/app/base-queue/rules-api.service';
import { SentryErrorHandler } from 'src/app/shared-components/sentry.service';
import { Rule } from 'src/app/shared-components/interfaces';
import { Breadcrumb } from 'src/app/shared-components/breadcrumbs/breadcrumb.interface';

const queueConfig: QueueConfig = {
  name: 'spelling',
};

@Component({
  selector: 'ftq-fix-spelling-queue',
  templateUrl: './fix-spelling.component.html',
  providers: [
    { provide: QUEUE_NAME, useValue: 'spelling' },
    { provide: QUEUE_CONFIG, useValue: queueConfig },
    BaseQueueService,
    RulesApiService,
  ],
})
export class FixSpellingComponent extends BaseQueueComponent<FixSpellingItem> {
  readonly breadcrumbs: Breadcrumb[] = [
    {
      label: 'Filter Quality',
      url: '/filter-quality',
    },
    {
      label: 'Fix Spelling',
    },
  ];

  constructor(
    protected readonly queueService: BaseQueueService,
    protected readonly rulesApiService: RulesApiService,
    protected sentry: SentryErrorHandler
  ) {
    super(queueService);
  }

  async completeItems() {
    const rulesApiQueue = [];

    this.queueItems = this.queueItems.map((item: AuditQueueItem) => {
      const queueItem = item.queueItem;
      const tags = new Set(queueItem.tags || []);

      // Get the current decision
      const decision = queueItem.decisions.find((decision) => {
        return decision.timestamp === -1;
      });

      // Populate the FIXED.ALT_SENSE tag and Rules API update queue
      if (
        decision?.extras?.altSenses?.length > 0 &&
        !tags.has('FIXED.ALT_SENSE')
      ) {
        tags.add('FIXED.ALT_SENSE');
        tags.add('FIXED');
      }

      // Populate the FIXED.ALT_SPELLING tag and Rules API update queue
      if (
        decision?.extras?.altSpellings?.length > 0 &&
        !tags?.has('FIXED.ALT_SPELLING')
      ) {
        tags.add('FIXED.ALT_SPELLING');
        tags.add('FIXED');
      }

      // Add a general IGNORE tag if IGNORE.* tags are present
      if (Array.from(tags).some((tag) => tag.startsWith('IGNORE.'))) {
        tags.add('IGNORE');
      }

      // Add a general WRONG tag if WRONG.* tags are present
      if (Array.from(tags).some((tag) => tag.startsWith('WRONG.'))) {
        tags.add('WRONG');
      }

      // Queue the change for the Rules API
      rulesApiQueue.push([
        item.data.text,
        decision?.extras.altSenses,
        decision?.extras.altSpellings,
        queueItem.language.language,
        queueItem.clientId,
      ]);

      item.queueItem.extras = decision?.extras;
      item.queueItem.tags = Array.from(tags);

      return item;
    });

    // Start the Rules API updates
    this.updateRulesApi(rulesApiQueue);

    // Continue submitting the queue item
    super.completeItems();
  }

  /**
   * Create or update a set of rules in the Rules API
   * @param rulesApiQueue An array of attributes to use in creating a new rule
   */
  updateRulesApi(rulesApiQueue) {
    const rulesPayload = rulesApiQueue.map((item) => {
      const [text, altSenses, altSpellings, language, clientId] = item;

      const newRule: Rule = {
        altSenses,
        altSpellings,
        clientId,
        enabled: true,
        flags: [],
        language,
        text,
        topics: { 0: 4 },
      };

      return newRule;
    });

    this.rulesApiService.addOrUpdateRules(rulesPayload).subscribe(
      () => {
        // TODO: @shane.lawrence When the toast component is created, pop it up here
        // May be beneficial to aggregate the results and pop a single toast like "3 rules published"
      },
      (error) => {
        // What's the desired UX for a failure state?
        // Is there anything a user could do if the Rules API rejects a rule?
        this.sentry.handleError(error);
      }
    );
  }
}
