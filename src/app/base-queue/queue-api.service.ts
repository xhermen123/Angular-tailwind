import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { GetQueueItemsResponse } from './interfaces/get-queue-items-response.interface';
import { GetQueueItemsOptions } from './interfaces/get-queue-items-options.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserService } from '../shared-components/user.service';
import { User } from '../shared-components/user';
import { GetQueueItemsAPIResponse } from './interfaces/get-queue-items-api-response.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Topic } from '../shared-components/interfaces';
import { AuditQueueItem } from './interfaces/audit-queue-item.interface';
import { CreateQueueItemDecision } from './interfaces/create-queue-item-decision.interface';
import * as Sentry from '@sentry/browser';
import { GetQueueInfoApiResponse } from './interfaces/get-queue-info-api-response.interface';

const queueApiBaseUrl = (() => {
  let url = environment.apiBaseUrl;
  if (!url.endsWith('/')) url += '/';
  url += 'inbox/queue';
  return url;
})();

@Injectable({
  providedIn: 'root',
})
export class QueueApiService {
  private currentUser: Observable<User>;

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService
  ) {
    this.currentUser = from(userService.me());
  }

  getQueueInfo(queueName: string): Observable<GetQueueInfoApiResponse> {
    return this.http.get<GetQueueInfoApiResponse>(this.getUrl(queueName));
  }

  getItems<T>(
    queueName: string,
    options: GetQueueItemsOptions
  ): Observable<GetQueueItemsResponse<T>> {
    return this.http
      .get<GetQueueItemsAPIResponse<T>>(this.getUrl(queueName, 'items'), {
        params: this.getItemHttpParams(options),
      })
      .pipe(
        map(({ total, items }) => {
          return {
            total,
            items: items.map(({ data, queueItem }) => {
              return {
                data,
                queueItem: {
                  ...queueItem,
                  topics: Topic.fromTopicSet(queueItem.topics),
                },
              };
            }),
          };
        })
      );
  }

  async addDecisions(
    queueName: string,
    seconds: number,
    initialQueueItems: AuditQueueItem[],
    updatedItems: AuditQueueItem[]
  ): Promise<boolean> {
    const now = Date.now();

    const res = await Promise.all(
      updatedItems.map(async (updatedItem) => {
        const contentId = updatedItem.queueItem.contentId;
        const initialItem = initialQueueItems.find(({ queueItem }) => {
          return queueItem.contentId === contentId;
        });

        return this.addDecision(queueName, contentId, {
          timestamp: now,
          seconds,
          // Added tags
          // Tags that are in the updated item and not the initial item
          tags: updatedItem.queueItem.tags.filter(
            (tag) => !initialItem.queueItem.tags.includes(tag)
          ),
          // Tags that are in initial item and not in the updated item
          tagsRemoved: initialItem.queueItem.tags.filter(
            (tag) => !updatedItem.queueItem.tags.includes(tag)
          ),
          reviewedTopics: initialItem.queueItem.topics.reduce(
            (result, topic) => {
              result[topic.id] = topic.risk;
              return result;
            },
            {}
          ),
          correctTopics: updatedItem.queueItem.topics.reduce(
            (result, topic) => {
              result[topic.id] = topic.risk;
              return result;
            },
            {}
          ),
          extras: updatedItem.queueItem.extras || {},
        });
      })
    );

    for (const success of res) {
      if (!success) return false;
    }

    return true;
  }

  async addDecision(
    queueName: string,
    contentId: string,
    decision: CreateQueueItemDecision
  ): Promise<boolean> {
    try {
      const user = await this.currentUser.toPromise();
      const res = await this.http
        .post<{ success: boolean }>(
          this.getUrl(queueName, `items/${contentId}/decision`),
          {
            ...decision,
            moderatorId: user.id,
          }
        )
        .toPromise();

      return res.success;
    } catch (error) {
      this.captureException(error, 'Adding a decision to a queue item', {
        queueName,
        contentId,
        decision,
      });
      throw error;
    }
  }

  /**
   * Checkout items in a queue by content ID
   * @param queueName - Name of the queue (e.g. ruleAudit, examples)
   * @param contentIds - IDs of items to checkout
   */
  async checkoutItems(
    queueName: string,
    contentIds: string[]
  ): Promise<boolean> {
    const res = await Promise.all(
      contentIds.map(async (contentId) => {
        return this.checkoutItem(queueName, contentId);
      })
    );

    for (const success of res) {
      if (!success) {
        return false;
      }
    }

    return true;
  }

  async checkoutItem(queueName: string, contentId: string): Promise<boolean> {
    try {
      const res = await this.http
        .put<{ success: boolean; total: number }>(
          this.getUrl(queueName, `items/${contentId}/checkout`),
          {}
        )
        .toPromise();

      // Log to Sentry if we failed to check the item out, but it didn't cause an exception
      if (!res.success) {
        this.captureWarning('Failed to checkout a queue item', {
          queueName,
          contentId,
        });
      }

      return res.success;
    } catch (error) {
      this.captureException(error, 'Checking out a queue item', {
        queueName,
        contentId,
      });
      throw error;
    }
  }

  async cancelCheckouts(
    queueName: string,
    contentIds: string[]
  ): Promise<boolean> {
    const res = await Promise.all(
      contentIds.map(async (contentId) => {
        return this.cancelCheckout(queueName, contentId);
      })
    );

    for (const success of res) {
      if (!success) {
        return false;
      }
    }

    return true;
  }

  async cancelCheckout(queueName: string, contentId: string): Promise<boolean> {
    try {
      const res = await this.http
        .delete<{ success: boolean; total: number }>(
          this.getUrl(queueName, `items/${contentId}/checkout`)
        )
        .toPromise();

      // Log to Sentry if we failed to check the item out, but it didn't cause an exception
      if (!res.success) {
        this.captureWarning('Failed to cancel a queue item checkout', {
          queueName,
          contentId,
        });
      }

      return res.success;
    } catch (error) {
      this.captureException(error, 'Cancelling a queue item checkout', {
        queueName,
        contentId,
      });
      throw error;
    }
  }

  private getUrl(queueName: string, path = ''): string {
    let url = queueApiBaseUrl;
    url += '/';
    url += window.encodeURIComponent(queueName);

    if (path?.length) {
      if (path[0] !== '/') url += '/';
      url += path;
    }

    return url;
  }

  private getItemHttpParams(options: GetQueueItemsOptions): HttpParams {
    let params = new HttpParams({
      encoder: {
        encodeKey: (key: string): string => window.encodeURIComponent(key),
        decodeKey: (key: string): string => window.decodeURIComponent(key),
        encodeValue: (value: string): string =>
          window.encodeURIComponent(value),
        decodeValue: (value: string): string =>
          window.decodeURIComponent(value),
      },
    });
    if (options.checkout != null)
      params = params.set('checkout', options.checkout.toString());
    params = params.set('language', this.getLanguageParam(options.language));

    const clientIdsParam = this.getClientIdsParam(options.clientIds);
    if (clientIdsParam) {
      params = params.set('clientIds', clientIdsParam);
    }

    if (!options.checkout) {
      const checkoutAvailable =
        options.checkoutAvailable == null ? true : options.checkoutAvailable;
      params = params.set('checkoutAvailable', checkoutAvailable.toString());
    }

    if (options.contentIds && options.contentIds.length > 0) {
      params = params.set('contentIds', options.contentIds.join(','));
    } else if (options.notContentIds && options.notContentIds.length > 0) {
      params = params.set('notContentIds', options.notContentIds.join(','));
    }

    if (options.text) params = params.set('text', options.text);
    if (options.offset)
      params = params.set('offset', options.offset.toString());
    if (options.limit) params = params.set('limit', options.limit.toString());
    if (options.sortBy) params = params.set('sortBy', options.sortBy);
    return params;
  }

  private getLanguageParam(language: string): string {
    if (language) return language;
    if (this.userService.preferences?.language)
      return this.userService.preferences?.language;
    return 'en';
  }

  private getClientIdsParam(clientIds?: number[]): string {
    if (clientIds?.length) return clientIds.join(',');
    if (this.userService.preferences?.lastClientId != null)
      return this.userService.preferences?.lastClientId.toString();
  }

  private captureException(
    exception: Error,
    message?: string,
    data?: {}
  ): void {
    if (message) {
      // Capture a breadcrumb for context
      Sentry.addBreadcrumb({
        level: Sentry.Severity.Error,
        message,
        data,
      });
    }

    // Log the exception
    Sentry.captureException(exception);
  }

  private captureWarning(message: string, extra?: {}): void {
    Sentry.captureEvent({
      level: Sentry.Severity.Warning,
      message,
      extra,
    });
  }
}
