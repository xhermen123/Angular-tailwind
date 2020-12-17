import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import {
  CheckinRuleResponse,
  GetAuditRulesResponse,
  ClassifyTextResponse,
  RuleAuditDecision,
  AuditRulesItem,
  GetAuditRules,
} from './audit-rules';
import { UserService } from 'src/app/shared-components/user.service';
import Sentry from '@sentry/browser';

interface GetItemOpts {
  checkout: boolean;
  lastItemId?: string;
}

interface CheckoutItemResponse {
  success: boolean;
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuditRulesService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public async cancelCheckout(contentId: string) {
    try {
      const res = await this.http
        .delete<CheckoutItemResponse>(
          `${environment.apiBaseUrl}/inbox/queue/rulesAudit/items/${contentId}/checkout`,
          { observe: 'response' }
        )
        .toPromise();

      // Log to Sentry if we failed to check the item out, but it didn't cause an exception
      if (![200, 204].includes(res.status)) {
        Sentry.captureEvent({
          level: Sentry.Severity.Warning,
          message: 'Failed to cancel a rule checkout',
          extra: {
            contentId,
          },
        });
      }

      return res.body.success;
    } catch (error) {
      // Capture a breadcrumb for context
      Sentry.addBreadcrumb({
        level: Sentry.Severity.Error,
        message: 'Cancelling a rule checkout',
        data: {
          contentId,
        },
      });
      // Log the exception
      Sentry.captureException(error);
      throw error;
    }
  }

  public checkinRule(
    rule: AuditRulesItem,
    decision: RuleAuditDecision
  ): Observable<HttpResponse<CheckinRuleResponse>> {
    return this.http.post<CheckinRuleResponse>(
      environment.apiBaseUrl +
        `/inbox/queue/rulesAudit/items/${rule.queueItem.contentId}/decision`,
      decision,
      {
        observe: 'response',
      }
    );
  }

  /**
   * Check an item out by ID
   * @param contentId The item's content ID
   */
  public async checkoutItem(contentId: string): Promise<boolean> {
    try {
      // Put a checkout request
      const res = await this.http
        .put<CheckoutItemResponse>(
          `${environment.apiBaseUrl}/inbox/queue/rulesAudit/items/${contentId}/checkout`,
          {}
        )
        .toPromise();

      // Log to Sentry if we failed to check the item out, but it didn't cause an exception
      if (!res.success) {
        Sentry.captureEvent({
          level: Sentry.Severity.Warning,
          message: 'Failed to checkout a rule',
          extra: {
            contentId,
          },
        });
      }

      // Return our success or failure
      return res.success;
    } catch (error) {
      // Capture a breadcrumb for context
      Sentry.addBreadcrumb({
        level: Sentry.Severity.Error,
        message: 'Checking out a rule',
        data: {
          contentId,
        },
      });
      // Log the exception
      Sentry.captureException(error);
      throw error;
    }
  }

  /**
   * Get an item from the queue. Does not check the item out.
   */
  public async getItem(
    options: GetItemOpts = { checkout: false }
  ): Promise<GetAuditRules> {
    const notContentIds = [];

    if (options.lastItemId) notContentIds.push(options.lastItemId);

    try {
      const params: HttpParams = new HttpParams()
        .set('checkout', options.checkout.toString())
        .set('limit', '1')
        .set(
          'clientIds',
          this.userService.preferences?.lastClientId?.toString() || '60'
        )
        .set('language', this.userService.preferences?.language || 'en');

      if (options.lastItemId)
        params.set('notContentIds', [options.lastItemId].join(','));

      const res = await this.http
        .get<GetAuditRulesResponse>(
          `${environment.apiBaseUrl}/inbox/queue/rulesAudit/items`,
          { params }
        )
        .toPromise();

      const items = res.items || [];

      return {
        total: res.total,
        items: items.map(AuditRulesItem.fromAPI),
      };
    } catch (error) {
      Sentry.captureException(error);
      throw error;
    }
  }

  public classifyText(
    text: string,
    language: string,
    clientId: number
  ): Observable<ClassifyTextResponse> {
    return this.http
      .post<ClassifyTextResponse>(`${environment.apiBaseUrl}/classify`, {
        text,
        language,
        clientId,
      })
      .pipe(catchError(this.handleError<ClassifyTextResponse>('classifyText')));
  }

  public async verifyRule(item: any, summary: string) {
    return console.log(`TODO: Verify rule as ${summary}`);
  }

  public async verifyItemTopic(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    item: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    topicId: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    risk: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    result: string
  ) {
    throw new Error('Not implemented');
  }

  ///// Helpers

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
