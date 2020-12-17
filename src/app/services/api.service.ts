import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantsService } from './constants.service';
import { environment } from '../../environments/environment';

const apiBaseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private processedTextData: Subject<any> = new Subject();
  private searchText = '';
  private topicTypes: any = {};
  private riskGrades: any[] = [];

  private policyGuides: Subject<any> = new Subject();

  constructor(
    private http: HttpClient,
    private constantsService: ConstantsService
  ) {
    this.topicTypes = this.constantsService.topicTypes;
    this.riskGrades = this.constantsService.riskGrades;
  }

  processTextData(data: any, extended: boolean) {
    this.searchText = data.text;
    return this.http.post(`${apiBaseUrl}twohat/classifyText/2.0.1/classify/text?extended=${extended}`, data);
  }

  getSearchText() {
    return this.searchText;
  }

  subscribeProcessedTextData() {
    return this.processedTextData.asObservable();
  }

  getPolicyGuides () {
    return this.http.get(`${apiBaseUrl}Individual136/towhub/1.0.0/policy_groups`);
  }

  setPolicyGuides (data) {
    this.policyGuides.next(data);
  }

  getLanguageTasks (query) {
    return this.http.get(`${apiBaseUrl}/inbox/queue/task/items`, {params: query});
  }

  getLanguageTaskDetails (id) {
    return this.http.get(`${apiBaseUrl}/inbox/queue/task/items?contentIds=${id}`);
  }
}
