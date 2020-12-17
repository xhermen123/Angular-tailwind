import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { AuditQueueItem } from './interfaces/audit-queue-item.interface';
import { QueueApiService } from './queue-api.service';
import { Subject, Observable } from 'rxjs';
import { cloneDeep as _cloneDeep } from 'lodash';
import { GetQueueItemsOptions } from './interfaces/get-queue-items-options.interface';
import { tap, flatMap } from 'rxjs/operators';
import { GetQueueItemsResponse } from './interfaces/get-queue-items-response.interface';
import { SessionStorageService } from '../shared/services/storage/session-storage.service';
import { BaseQueuePagination } from './base-queue-pagination';
import { GetQueueInfoApiResponse } from './interfaces/get-queue-info-api-response.interface';
import { UserService } from '../shared-components/user.service';
import { LocalStorageService } from '../shared/services/storage/local-storage.service';
import { QueueConfig } from './interfaces/queue-config.interface';

export const QUEUE_CONFIG = new InjectionToken<QueueConfig>(
  'Queue-specific configuration values'
);
export const QUEUE_NAME = new InjectionToken<string>(
  'Unique indentifier for the queue'
);
export enum QueueState {
  INITIAL,
  GETTING_ITEMS,
  CHECKING_OUT,
  CANCELLING_CHECKOUT,
  REVIEWING,
  COMPLETING_PAGE,
}

@Injectable()
export class BaseQueueService {
  private _queueState: QueueState = QueueState.INITIAL;
  private _checkoutTime: number;
  private _initialQueueItems: AuditQueueItem[];
  private _queueSize = 0;
  private _resultsPerPage = 3;
  private _queueInfo: GetQueueInfoApiResponse;
  private queueItemsSource = new Subject<AuditQueueItem[]>();
  private nextPageSource = new Subject<void>();
  private pagination: BaseQueuePagination;
  private onFirstPage = false;
  private pageInfo = {
    firstItemId: '',
    lastItemId: '',
  };

  minimizeTopics = true;
  queueItems$ = this.queueItemsSource.asObservable();
  nextPage$ = this.nextPageSource.asObservable();

  constructor(
    @Inject(QUEUE_NAME) private readonly queueName: string,
    @Optional() @Inject(QUEUE_CONFIG) readonly queueConfig: QueueConfig,
    private readonly queueApiService: QueueApiService,
    private readonly userService: UserService,
    private readonly localStorageService: LocalStorageService,
    private readonly sessionStorageService: SessionStorageService
  ) {
    const resultsPerPage = this.localStorageService.getItem(
      `${this.queueName}-resultsPerPage`
    );
    if (resultsPerPage) {
      this._resultsPerPage = resultsPerPage;
    }
  }

  private get initalQueueItemIds(): string[] {
    return this._initialQueueItems.map(({ queueItem }) => queueItem.contentId);
  }

  get amountCompleted() {
    return this.pagination.amountCompleted;
  }

  get resultsPerPage() {
    return this._resultsPerPage;
  }

  set resultsPerPage(value: number) {
    const parsedValue = Math.max(value, 1);
    this._resultsPerPage = parsedValue;
    this.localStorageService.setItem(
      `${this.queueName}-resultsPerPage`,
      parsedValue
    );
  }

  get queueFilters() {
    return this._queueInfo?.filters || [];
  }

  get queueState() {
    return this._queueState;
  }

  get queueSize() {
    return this._queueSize;
  }

  get currentPageSize(): number {
    return this._initialQueueItems?.length || 0;
  }

  get hasPreviousPage() {
    return !this.onFirstPage;
  }

  get isLoading() {
    return (
      this._queueState === QueueState.GETTING_ITEMS ||
      this._queueState === QueueState.CHECKING_OUT ||
      this._queueState === QueueState.CANCELLING_CHECKOUT ||
      this._queueState === QueueState.COMPLETING_PAGE
    );
  }

  get isReviewing() {
    return (
      this._queueState === QueueState.REVIEWING ||
      this._queueState === QueueState.CHECKING_OUT ||
      this._queueState === QueueState.CANCELLING_CHECKOUT ||
      this._queueState === QueueState.COMPLETING_PAGE
    );
  }

  get queueInfo() {
    return this._queueInfo;
  }

  get selectedClientId() {
    return this.userService.preferences.lastClientId;
  }

  get selectedLanguage() {
    return this.userService.preferences.language;
  }

  loadInitialItems() {
    if (this._queueState !== QueueState.INITIAL) return;

    const reviewModeOnly = this.queueConfig?.reviewModeOnly === true;

    this._queueState = QueueState.GETTING_ITEMS;
    this.queueApiService
      .getQueueInfo(this.queueName)
      .pipe(
        tap((queueInfo) => {
          this._queueInfo = queueInfo;
        }),
        flatMap(() => this.initializePagination()),
        flatMap(() =>
          this.getItems({ checkout: reviewModeOnly, checkoutAvailable: true })
        )
      )
      .subscribe(({ total }) => {
        this._queueState = QueueState.INITIAL;
        this._queueSize = total;
        if (reviewModeOnly) this.startReview();
      });
  }

  toggleReviewMode() {
    switch (this._queueState) {
      case QueueState.INITIAL:
        this.startReview();
        break;
      case QueueState.REVIEWING:
        this.cancelCheckout();
        break;
    }
  }

  private async initializePagination() {
    await this.userService.me();
    this.pagination = new BaseQueuePagination(
      this.userService.preferences.lastClientId,
      this.userService.preferences.language,
      this.queueName,
      this.sessionStorageService
    );

    if (this.pagination.lastReviewedId) {
      this.pageInfo.firstItemId = this.pagination.lastReviewedId;
    }
  }

  /**
   * Starts the review process
   */
  private startReview(extraOptions: GetQueueItemsOptions = {}) {
    if (this._queueState !== QueueState.INITIAL) return;
    this._queueState = QueueState.CHECKING_OUT;

    const options: GetQueueItemsOptions = { ...extraOptions };
    const nextPageIds = this.pagination.getIds({
      limit: this.resultsPerPage,
      beforeId: this.pageInfo.lastItemId,
    });

    if (!nextPageIds?.length) {
      options.checkout = true;
    } else {
      options.checkout = false;
      options.contentIds = nextPageIds;
    }

    this.getItems(options).subscribe(() => {
      this._queueState = QueueState.REVIEWING;
    });
  }

  /**
   * Stop reviewing and check items back in
   */
  private async cancelCheckout(): Promise<boolean> {
    if (this._queueState !== QueueState.REVIEWING) return;
    this._queueState = QueueState.CANCELLING_CHECKOUT;
    const result = await this.queueApiService.cancelCheckouts(
      this.queueName,
      this.initalQueueItemIds
    );
    this._queueState = QueueState.INITIAL;
    return result;
  }

  nextPage() {
    if (this._queueState !== QueueState.REVIEWING) return;
    this._queueState = QueueState.COMPLETING_PAGE;
    this.nextPageSource.next();
  }

  async previousPage() {
    if (this._queueState !== QueueState.REVIEWING) return;
    if (this.onFirstPage) return;
    const result = await this.cancelCheckout();
    if (result) {
      this._queueState = QueueState.CHECKING_OUT;

      const contentIds = this.pageInfo.firstItemId
        ? this.pagination.getIds({
            limit: this.resultsPerPage,
            beforeId: this.pageInfo.firstItemId,
          })
        : this.pagination.getIds({
            limit: this.resultsPerPage,
            reverse: true,
          });

      this.getItems({
        checkout: false,
        checkoutAvailable: false,
        contentIds,
      }).subscribe(() => {
        this._queueState = QueueState.REVIEWING;
      });
    }
  }

  async completePage(updatedItems: AuditQueueItem[]) {
    if (this._queueState !== QueueState.COMPLETING_PAGE) return;
    const seconds = Math.floor((Date.now() - this._checkoutTime) * 0.001);

    const contentTags = this.getAvailableContentTags();
    const labelTags = this.getAvailableLabels();

    await this.queueApiService.addDecisions(
      this.queueName,
      seconds,
      this._initialQueueItems,
      updatedItems.map((item) => {
        const initialQueueItem = this._initialQueueItems.find(
          ({ queueItem }) => queueItem.contentId === item.queueItem.contentId
        );

        // Handle cases where tags weren't added
        item.queueItem.tags = item.queueItem.tags || [];
        initialQueueItem.queueItem.tags = initialQueueItem.queueItem.tags || [];

        // Keep all content type tags that were on the initial queue item
        const initialContentTypeTags = initialQueueItem.queueItem.tags.filter(
          (tag) => contentTags.includes(tag)
        );

        const tags: string[] = item.queueItem.tags
          // Filter out tags that aren't available labels
          .filter((tag) => labelTags.includes(tag))
          // Merge all content type tags that were on the initial item
          .concat(initialContentTypeTags);

        return {
          data: item.data,
          queueItem: {
            ...item.queueItem,
            tags,
          },
        };
      })
    );

    const options: GetQueueItemsOptions = {};
    const nextPageIds = this.pagination.getIds({
      limit: this.resultsPerPage,
      afterId: this.pageInfo.lastItemId,
    });

    if (!nextPageIds?.length) {
      options.checkout = true;
      options.notContentIds = this.initalQueueItemIds;
    } else {
      options.checkout = false;
      options.checkoutAvailable = false;
      options.contentIds = nextPageIds;
    }

    await this.getItems(options).toPromise();

    // If there are no items to checkout, then we leave review mode
    if (
      this._queueSize === 0 &&
      this._initialQueueItems?.length === 0 &&
      this.queueConfig.reviewModeOnly !== true
    ) {
      this._queueState = QueueState.INITIAL;
    } else {
      this._queueState = QueueState.REVIEWING;
    }
  }

  private getItems(
    options: GetQueueItemsOptions
  ): Observable<GetQueueItemsResponse> {
    const gettingNewItems = !options.contentIds?.length;

    return this.queueApiService
      .getItems(this.queueName, { limit: this.resultsPerPage, ...options })
      .pipe(
        tap(({ total, items }) => {
          this._checkoutTime = Date.now();
          this._initialQueueItems = _cloneDeep(items);
          this.queueItemsSource.next(items);
          if (items?.length) {
            const ids = items.map(({ queueItem }) => queueItem.contentId);
            this.pageInfo.firstItemId = ids[0];
            this.pageInfo.lastItemId = ids[ids.length - 1];
            this.pagination.addPage(ids);
            this.onFirstPage =
              this.pagination.firstReviewedId === this.pageInfo.firstItemId;
          } else {
            this.pageInfo.firstItemId = '';
            this.pageInfo.lastItemId = '';
            this.onFirstPage = this.amountCompleted <= 0;
          }
          if (
            gettingNewItems &&
            (options.checkout || options.checkoutAvailable)
          ) {
            this._queueSize = total;
          }
        })
      );
  }

  private getAvailableContentTags(): string[] {
    return this._queueInfo?.tags.contentType.map(({ value }) => value);
  }

  private getAvailableLabels(): string[] {
    let availableLabels: string[] = [];

    this._queueInfo.tags.labelGroups.forEach((labelGroup) => {
      const optionValues = labelGroup.options.map(({ value }) => value);
      availableLabels = availableLabels.concat(optionValues);
    });

    return availableLabels;
  }

  async onFilterChanged() {
    throw new Error('Not implemented');
  }
}
