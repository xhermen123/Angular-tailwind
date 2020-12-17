import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  Example,
  ExampleSearchResponse,
  GetExamples,
  ExampleFromAPI,
} from './example';
import { Observable } from 'rxjs';
import { Language, Topic } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor(private http: HttpClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteExample(example: Example, clientId, language): Observable<Example> {
    return this.http.delete<Example>(
      `${environment.apiBaseUrl}/examples/${example.queueItem.contentId}`
    );
  }

  async redactExample(example: Example): Promise<Example> {
    const redactedExample = { ...example };

    console.warn('Not implemented');

    redactedExample.data.text = '[REDACTED]';

    return redactedExample;
  }

  async searchExamples(
    text: string,
    language: Language,
    clientId: number,
    offset = 0,
    limit = 50
  ): Promise<GetExamples> {
    const params: HttpParams = new HttpParams()
      .set('clientIds', clientId.toString())
      .set('language', language.language)
      .set('offset', offset.toString())
      .set('limit', limit.toString())
      .set('text', text.replace(/[^A-Z0-9\s_-]/gi, ''));

    const res = await this.http
      .get<ExampleSearchResponse>(
        `${environment.apiBaseUrl}/inbox/queue/examples/items`,
        { params }
      )
      .toPromise();

    return {
      total: res.total,
      items: res.items.map(Example.fromAPI),
    };
  }

  verifyExample(example: Example, response: string) {
    const apiExample: ExampleFromAPI = {
      data: example.data,
      queueItem: {
        ...example.queueItem,
        topics: Topic.toTopicSet(example.queueItem.topics),
      },
    };

    return this.http.post(
      `${environment.apiBaseUrl}/inbox/queue/examples/items/${example.queueItem.contentId}/decision`,
      { example: apiExample, response }
    );
  }
}
