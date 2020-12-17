// Core dependencies
import { Component, OnInit } from '@angular/core';
import { set } from 'lodash';

// Custom components and services
import { AuditRulesService } from 'src/app/filter-quality/audit-rules/audit-rules.service';
import {
  ExampleSummaryValues,
  RuleSummaryValues,
} from 'src/app/shared-components/enums';
import { GetExamples } from 'src/app/shared-components/example/example';
import { ExampleService } from 'src/app/shared-components/example/example.service';
import { RuleAuditDecision, AuditRulesItem } from './audit-rules';
import { Topic } from 'src/app/shared-components/interfaces';
import {
  TopicChipVerifyResult,
  TopicChipVerificationState,
} from 'src/app/shared-components/topic-chip/topic-chip';
import { User } from 'src/app/shared-components/user';
import { UserService } from 'src/app/shared-components/user.service';

// Interfaces
import { IOptionButton } from 'src/app/shared-components/option-button-group/option-button-group.component';
import {
  Example,
  ExampleVerifiedEvent,
} from '../../shared-components/example/example';
import { Subject } from 'rxjs';

// Constants
const EXAMPLE_SUMMARY_DEFAULT: string = ExampleSummaryValues.Skipped;
const RULE_SUMMARY_DEFAULT: string = RuleSummaryValues.Correct;

@Component({
  selector: 'ftq-audit-rules',
  templateUrl: './audit-rules.component.html',
  styleUrls: ['./audit-rules.component.less'],
})
export class AuditRulesComponent implements OnInit {
  // View states
  commitTopicDefaults: Subject<void> = new Subject<void>();
  currentItem: AuditRulesItem;
  currentUser: User;
  isReviewing = false;
  lastItemId = '';
  loadingExamples = true;
  loadingItem = true;
  totalItems = 0;
  viewMode = 'list';
  viewModes: IOptionButton[] = [];

  // Examples
  examples: Example[] = [];
  exampleOffset = 0;
  exampleSummary: string = EXAMPLE_SUMMARY_DEFAULT;
  exampleSummaryButtons: IOptionButton[] = [];
  examplesError: Error;

  // Rule
  ruleSummary: string = RULE_SUMMARY_DEFAULT;
  ruleSummaryButtons: IOptionButton[] = [];

  ruleSummaryValues = RuleSummaryValues;
  verifyStates = TopicChipVerificationState;

  constructor(
    private service: AuditRulesService,
    private exampleService: ExampleService,
    private userService: UserService
  ) {
    //
    // View mode icons
    // TODO: Is it cleaner to do this in markup, or here?
    //
    const viewBtnGrid: IOptionButton = {
      ariaLabel: 'Small grid',
      value: 'small-grid',
      icon: 'view-comfy',
    };

    const viewBtnList: IOptionButton = {
      ariaLabel: 'List',
      value: 'list',
      icon: 'view-list',
    };

    const viewBtnLargeGrid: IOptionButton = {
      ariaLabel: 'large-grid',
      value: 'large-grid',
      icon: 'view-grid',
    };

    this.viewModes = [viewBtnGrid, viewBtnList, viewBtnLargeGrid];

    //
    // Rule Summary Buttons
    //
    const rsBtnCorrect: IOptionButton = {
      ariaLabel: $localize`Correct`,
      label: $localize`Correct`,
      value: RuleSummaryValues.Correct,
    };

    const rsBtnCloseEnough: IOptionButton = {
      ariaLabel: $localize`Close Enough`,
      label: $localize`Close Enough`,
      value: RuleSummaryValues.OK,
    };

    const rsBtnWrong: IOptionButton = {
      ariaLabel: $localize`Wrong`,
      label: $localize`Wrong`,
      value: RuleSummaryValues.Incorrect,
    };

    this.ruleSummaryButtons.push(
      ...[rsBtnCorrect, rsBtnCloseEnough, rsBtnWrong]
    );

    //
    // Example Summary Buttons
    //
    const esBtnCorrect: IOptionButton = {
      ariaLabel: $localize`Reviewed`,
      label: $localize`Reviewed`,
      value: ExampleSummaryValues.Reviewed,
    };

    const esBtnSkipped: IOptionButton = {
      ariaLabel: $localize`Didn't Review`,
      label: $localize`Didn't Review`,
      value: ExampleSummaryValues.Skipped,
    };

    this.exampleSummaryButtons.push(...[esBtnCorrect, esBtnSkipped]);
  }

  async ngOnInit() {
    await this.getNextItem();

    this.currentUser = await this.userService.me();
  }

  /**
   * Check the current working item in
   */
  checkinItem() {
    // Verify examples
    if (this.exampleSummary === RuleSummaryValues.Correct) {
      this.examples
        .filter(example => example.queueItem.contentId !== null) // Filter out deleted examples
        .forEach(example => {
          this.exampleService
            .verifyExample(example, this.exampleSummary)
            .subscribe(console.log);
        });
    }

    // Trigger commitDefaults() on children
    this.commitTopicDefaults.next();

    setTimeout(() => {
      // Verify rule
      // TODO: CODEREVIEW: When you add a decision below that is the same as verify a rule
      this.service.verifyRule(this.currentItem, this.ruleSummary);

      const decision: RuleAuditDecision = {
        moderatorId: this.currentUser.id,
        // TODO: CODEREVIEW: This needs to be written
        seconds: 0,
        tags: [this.ruleSummary],
        tagsRemoved: [],
        timestamp: new Date().getTime(),
        correctTopics: Topic.toTopicSet(this.currentItem.queueItem.topics),
        reviewedTopics: this.currentItem.queueItem.originalTopics,
      };

      // TODO: CODEREVIEW: This should be abstracted to an sdk shared by all the queue items
      // Check the item in
      this.service
        .checkinRule(this.currentItem, decision)
        .subscribe(httpResponse => {
          if ([200, 201, 204].includes(httpResponse.status)) {
            this.lastItemId = this.currentItem.queueItem.contentId;
            this.getNextItem();
          } else {
            alert('Checkin failed');
          }
        });
    }, 500);
  }

  /**
   * Checkout the next item
   */
  async getNextItem() {
    // Reset the view
    this.reset();

    // Checkout a rule
    const res = await this.service.getItem({
      checkout: this.isReviewing,
      lastItemId: this.lastItemId,
    });

    // If we didn't get anything, halt gracefully.
    if (!res || res.items?.length === 0) {
      this.loadingItem = false;
      return;
    }

    // For now, we can assume that we're dealing with one rule at a time.
    this.currentItem = res.items[0];
    this.totalItems = res.total;

    // Classify the rule
    try {
      this.service
        .classifyText(
          this.currentItem.data.text,
          this.currentItem.queueItem.language.language,
          this.currentItem.queueItem.clientId
        )
        .subscribe(response => {
          this.currentItem.queueItem.topics = Topic.fromTopicSet(
            response.topics,
            this.verifyStates.DefaultCorrect
          );
          this.currentItem.queueItem.originalTopics = response.topics;
          this.loadingItem = false;
        });
    } catch (error) {
      console.warn(error.message);
    }

    // Load examples for this rule
    this.exampleOffset = 0;
    this.examples = [];
    this.moreExamples(this.exampleOffset);
  }

  /**
   * Load examples, optionally with an offset
   * @param offset The offset from which to load examples
   */
  async moreExamples(offset = 0, limit = 5) {
    this.loadingExamples = true;
    this.examplesError = null;

    // Load examples for the selected item
    const examples: GetExamples = await this.exampleService.searchExamples(
      this.currentItem.data.text,
      this.currentItem.queueItem.language,
      this.currentItem.queueItem.clientId,
      offset,
      limit
    );

    if (examples?.total === 0 || !examples.items || examples.items.length === 0)
      return (this.loadingExamples = false);

    this.examples.push(...examples.items);
    this.exampleOffset = this.examples.length;

    this.examples.forEach((example, idx) => {
      setTimeout(() => {
        this.service
          .classifyText(
            example.data.text,
            example.queueItem.language.language,
            example.queueItem.clientId
          )
          .subscribe(classification => {
            if (classification?.topics) {
              example.queueItem.topics = Topic.fromTopicSet(
                classification.topics,
                this.verifyStates.DefaultCorrect
              );
            }
          });
      }, idx * 500);
    });

    this.loadingExamples = false;
  }

  /**
   * Fired when an example has been deleted
   * @param exampleId The ID of the example to delete
   */
  onExampleDeleted(exampleId: string) {
    this.examples = this.examples.filter(
      example => example.queueItem.contentId !== exampleId
    );
  }

  /**
   * Fired when an example has been redacted
   * @param exampleId The ID of the example to mark as redacted
   */
  onExampleRedacted(exampleId: string) {
    const redactedExample = this.examples.find(
      example => example.queueItem.contentId === exampleId
    );
    if (redactedExample) redactedExample.data.text = '[REDACTED]';
  }

  onExampleVerified($event: ExampleVerifiedEvent) {
    this.exampleSummary = ExampleSummaryValues.Reviewed;
    console.log($event);
  }

  onTopicRemoved(removedTopic: Topic) {
    let topics: Topic[] = [...this.currentItem.queueItem.topics];
    topics = topics.filter(t => t.id !== removedTopic.id);
    this.currentItem.queueItem.topics = topics;
  }

  onRiskChanged(changedTopic: Topic) {
    let topics: Topic[] = [...this.currentItem.queueItem.topics];
    topics = topics.map((t: Topic) => {
      if (t.id === changedTopic.id) {
        t.risk = changedTopic.risk;
      }
      return t;
    });
    this.currentItem.queueItem.topics = topics;
  }

  /**
   * Fires when a topic chip in the view is voted as correct or incorrect
   * @param decision The topic chip decision
   */
  onVerifyTopic(decision: TopicChipVerifyResult) {
    // If they disagreed, mark the rule as "Wrong"
    if (decision.result === RuleSummaryValues.Incorrect)
      this.ruleSummary = RuleSummaryValues.Incorrect;

    try {
      // TODO: Figure out where this is supposed to go
      set(
        this.currentItem,
        ['_meta', 'verifyTopic', decision.topic.id.toString()],
        decision
      );
    } catch (error) {
      console.warn(error);
    }
  }

  // Reset the view
  private reset() {
    // Reset
    // 2020-01-20 CP/SL decided not to reset exampleSummary
    this.currentItem = null;
    this.loadingExamples = true;
    this.examples = [];
    this.examplesError = null;
    this.ruleSummary = RULE_SUMMARY_DEFAULT;
  }

  /**
   * Toggle review mode
   */
  async toggleReviewing() {
    if (this.isReviewing === false) {
      // We're not currently reviewing, but we want to

      const success = await this.service.checkoutItem(
        this.currentItem.queueItem.contentId
      );
      if (success) {
        this.isReviewing = true;
      } else {
        alert('Failed enter review mode. A report has been generated.');
      }
    } else {
      // We're currently reviewing, and we want to stop

      const success = await this.service.cancelCheckout(
        this.currentItem.queueItem.contentId
      );
      if (success) {
        this.isReviewing = false;
      } else {
        alert('Failed to exit review mode. A report has been generated.');
      }
    }
  }
}
