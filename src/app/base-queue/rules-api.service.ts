import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { cloneDeep } from 'lodash';

import { AlternateTypes } from '../shared-components/alternatives/alternatives.component';
import { Rule } from '../shared-components/interfaces';

const rulesApiBaseUrl = (() => {
  let url = environment.apiBaseUrl;
  if (!url.endsWith('/')) url += '/';
  url += 'rules';
  return url;
})();

@Injectable({
  providedIn: 'root',
})
export class RulesApiService {
  constructor(private readonly http: HttpClient) {}

  addAlternateRule(
    type: AlternateTypes,
    text: string,
    dependency: string,
    language: string,
    clientId: number
  ): Observable<object> {
    const url = `${rulesApiBaseUrl}/text/${text}/${type}/${dependency}`;
    const params = new HttpParams()
      .set('language', language)
      .set('clientId', clientId.toString());

    return this.http.put<object>(url, {}, { params });
  }

  /**
   * Create or update a rule
   * @param rules The rule to add or update
   * @param rule.text The rule text
   * @param rule.topics Topics to set/update on the rule
   * @param rule.language The rule's language
   * @param rule.clientId The rule's client ID
   * @param rule.altSenses A list of alt senses
   * @param rule.altSpellings A list of alt spellings
   * @param rule.enabled True to set the ENABLED flag
   */
  addOrUpdateRules(rules: Rule[]): Observable<object> {
    const payloadRules = cloneDeep(rules).map((payloadRule) => {
      if (payloadRule.enabled) {
        payloadRule.flags = payloadRule.flags || [];
        payloadRule.flags.push('ENABLED');
        delete payloadRule.enabled;
      }

      return payloadRule;
    });

    const url = `${rulesApiBaseUrl}/`;

    return this.http.put(url, payloadRules);
  }

  getAutoComplete(
    prefix = '',
    languages: string[],
    clientIds: number[],
    limit = 10
  ): Observable<string[]> {
    const url = `${rulesApiBaseUrl}/autocomplete/${prefix}`;
    const params = new HttpParams()
      .set('languages', languages.join(','))
      .set('clientIds', clientIds.join(','))
      .set('limit', limit.toString());

    try {
      return this.http.get<string[]>(url, { params });
    } catch (error) {
      console.warn(`Failed to get autocomplete: ${error.status}`);
      return from([]);
    }
  }
}
