import { BaseQueueService } from './base-queue.service';
import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { AuditQueueItem } from './interfaces/audit-queue-item.interface';
import { Topic } from '../shared-components/interfaces';

export abstract class BaseQueueComponent<T> implements OnInit, OnDestroy {
  private queueItemsSubscription: Subscription;
  private nextPageSubscription: Subscription;

  commitTopicDefaults = new Subject<void>();
  queueItems: AuditQueueItem<T>[];

  constructor(protected readonly queueService: BaseQueueService) {}

  get isReviewing() {
    return this.queueService.isReviewing;
  }

  get isLoading() {
    return this.queueService.isLoading;
  }

  get labelGroups() {
    return this.queueService.queueInfo?.tags?.labelGroups;
  }

  get minimizeTopics() {
    return this.queueService.minimizeTopics;
  }

  ngOnInit() {
    this.queueItemsSubscription = this.queueService.queueItems$.subscribe({
      next: (items) => {
        this.receiveItems(items);
      },
    });

    this.nextPageSubscription = this.queueService.nextPage$.subscribe({
      next: () => {
        this.completeItems();
      },
    });
    this.queueService.loadInitialItems();
  }

  ngOnDestroy() {
    this.queueItemsSubscription?.unsubscribe();
    this.nextPageSubscription?.unsubscribe();
  }

  receiveItems(items: AuditQueueItem<T>[]) {
    this.queueItems = items;
  }

  completeItems() {
    this.queueService.completePage(this.queueItems);
  }

  /**
   * Update a topic on a Queue Item
   * @param auditQueueItem - item to update topics on
   * @param updatedTopic - topic with the updated risk
   */
  onRiskChanged(auditQueueItem: AuditQueueItem, updatedTopic: Topic): void {
    const topics = auditQueueItem.queueItem.topics.slice();

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === updatedTopic.id) {
        topics[i] = new Topic(
          updatedTopic.id,
          updatedTopic.risk,
          updatedTopic.verification
        );
        break;
      }
    }

    auditQueueItem.queueItem.topics = topics;
  }

  onTopicRemoved(auditQueueItem: AuditQueueItem, topic: Topic): void {
    const topics = auditQueueItem.queueItem.topics.slice();
    const topicIndex = topics.indexOf(topic);
    topics.splice(topicIndex, 1);
    auditQueueItem.queueItem.topics = topics;
  }

  /**
   * Update the topics on a Queue Item
   * @param auditQueueItem - Item to update
   * @param updatedTopics - Update topic array
   */
  onTopicsUpdated(
    auditQueueItem: AuditQueueItem,
    updatedTopics: Topic[]
  ): void {
    auditQueueItem.queueItem.topics = updatedTopics;
  }

  onTagsUpdated(auditQueueItem: AuditQueueItem, updatedTags: string[]) {
    auditQueueItem.queueItem.tags = updatedTags;
  }
}
