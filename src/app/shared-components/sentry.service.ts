import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '../../environments/environment';

import * as Sentry from '@sentry/browser';

Sentry.init(environment.sentry);

@Injectable({
  providedIn: 'root',
})
export class SentryErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (environment.production === true) {
      const eventId = Sentry.captureException(error.originalError || error);
      Sentry.showReportDialog({ eventId });
    }
    throw error;
  }
}
