import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';

import { AuditQueueItem } from 'src/app/base-queue/interfaces/audit-queue-item.interface';
import { FixSpellingItem, Filters } from '../fix-spelling/fix-spelling';
import { AlternateTypes } from 'src/app/shared-components/alternatives/alternatives.component';
import { Example } from 'src/app/shared-components/example/example';
import { sortBy } from 'lodash';
import { Languages } from 'src/constants';
import { CreateQueueItemDecision } from 'src/app/base-queue/interfaces/create-queue-item-decision.interface';
import { UserService } from 'src/app/shared-components/user.service';
import { Observable, from } from 'rxjs';
import { User } from 'src/app/shared-components/user';
import { QueueItemExtras } from 'src/app/shared-components/interfaces';
import { RulesApiService } from 'src/app/base-queue/rules-api.service';

interface IgnoreOption {
  label: string;
  value: string;
}

@Component({
  selector: 'ftq-fix-spelling-item',
  templateUrl: './fix-spelling-item.component.html',
})
export class FixSpellingItemComponent implements OnChanges {
  @Input() disabled = false;
  @Input() item: AuditQueueItem<FixSpellingItem>;
  @Input() labelGroups: any;
  @Input() toggleReview: Observable<boolean>;

  @Output() itemChanged: EventEmitter<
    AuditQueueItem<FixSpellingItem>
  > = new EventEmitter();
  @Output() tagsUpdated: EventEmitter<string[]> = new EventEmitter();

  // Private Locals
  private _currentUser: Observable<User>;
  private _ignoreReasons: IgnoreOption[] = [
    { label: 'Ignore...', value: '' },
    { label: 'Wrong Language', value: 'WRONG.LANGUAGE' },
    { label: 'Spam', value: 'IGNORE.SPAM' },
    { label: 'Gibberish', value: 'IGNORE.GIBBERISH' },
  ];

  // Public locals for the template
  altTypes = AlternateTypes;
  autocomplete: string[] = [];
  correction: '';
  decision: CreateQueueItemDecision;
  error: Error;
  examples: Example[] = [];
  filterObj: Filters = {} as Filters;
  languages = sortBy(Languages, 'name');
  searchText = '';
  selectedIgnore: IgnoreOption = this.ignoreReasons[0];

  // Constructors and initializers

  constructor(
    private readonly userService: UserService,
    private readonly rulesApiService: RulesApiService
  ) {
    this._currentUser = from(this.userService.me());
  }

  async ngOnChanges() {
    const user = await this._currentUser.toPromise();

    // If we already have an active decision, end early.
    if (this.decision) return;

    // See if there are already decisions in this item
    // If there are, see if any of them are mine, and select the most recent.
    if (this.item?.queueItem?.decisions?.length > 0) {
      const myDecisions = (this.item?.queueItem?.decisions || []).filter(
        (myDecision) => myDecision.moderatorId === user.moderatorId
      );

      if (myDecisions.length > 0) {
        this.decision = myDecisions[myDecisions.length - 1];
        if (!('extras' in this.decision)) this.decision.extras = {};
        return;
      }
    }

    // Instantiate a new decision otherwise.
    this.decision = {
      correctTopics: {},
      extras: {},
      moderatorId: user.moderatorId,
      reviewedTopics: {},
      seconds: 0,
      tags: [],
      tagsRemoved: [],
      timestamp: -1,
    } as CreateQueueItemDecision;
  }

  onAlternativesChanged(extras: QueueItemExtras) {
    this.decision.extras = extras;
    this.writeValue(this.value);
  }

  get ignoreReasons() {
    return this._ignoreReasons.filter(
      (reason) => !this.item?.queueItem?.tags?.includes(reason.value)
    );
  }

  ignoreReasonLabel(value: string) {
    return this._ignoreReasons.find((reason) => reason.value === value)?.label;
  }

  get value(): AuditQueueItem<FixSpellingItem> {
    const returnItem = { ...this.item };

    // Remove the existing decision if there is one
    // Otherwise, the feedback loop between this and writeValue() will blow up.
    returnItem.queueItem.decisions = returnItem.queueItem.decisions.filter(
      (decision) => {
        return (
          decision.timestamp !== this.decision.timestamp &&
          decision.moderatorId !== this.decision.moderatorId
        );
      }
    );

    // Add our current decision(s) to the item
    returnItem.queueItem.decisions.push(this.decision);

    return returnItem;
  }

  writeValue(value: any): void {
    if (!value) return;
    this.item = value;
    this.itemChanged.emit(value);
  }

  // Guards against missing properties causing exceptions
  get extras(): QueueItemExtras {
    return this.decision?.extras || ({} as QueueItemExtras);
  }
  set extras(extras: QueueItemExtras) {
    if (this.decision) this.decision.extras = extras;
  }

  get dataListID(): string {
    return `datalist-${this.item?.queueItem?.contentId}`;
  }

  onAlternativeAdded() {
    this.correction = '';
  }

  onIgnoreChanged() {
    // Validate
    if (!this.selectedIgnore) return;

    // Push onto the decision's tags if not already there
    if (!this.item.queueItem.tags.includes(this.selectedIgnore.value)) {
      this.item.queueItem.tags.push(this.selectedIgnore.value);
    }

    // Reset the ignore picker on the next tick
    setTimeout(() => {
      this.selectedIgnore = this.ignoreReasons[0];
    });
  }

  // showing the search list accoring to the word. also hiding it while empty
  onSearchChange(prefix) {
    if (prefix && prefix.length >= 3) {
      this.rulesApiService
        .getAutoComplete(
          prefix,
          [this.item.queueItem.language.language],
          [this.item.queueItem.clientId],
          10
        )
        .subscribe(
          (data) => {
            if (data) this.autocomplete = [...data];
          },
          (error) => {
            console.warn(`Error getting autocomplete: ${error.message}`);
            this.autocomplete = [];
          }
        );
    }
  }

  onTagsUpdated(tags: any) {
    this.tagsUpdated.emit(tags);
  }

  removeTag(removeTag: string) {
    this.item.queueItem.tags = this.item.queueItem.tags.filter(
      (tag) => tag !== removeTag
    );
  }

  selectedWord() {
    // Stub function until I figure out what this does. -SL
  }
}
