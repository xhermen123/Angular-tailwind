import { Component, OnInit } from '@angular/core';

import { IAppGridItem } from '../shared-components/app-grid/iapp-grid-item';

@Component({
  selector: 'ftq-filter-quality',
  templateUrl: './filter-quality.component.html',
  styleUrls: ['./filter-quality.component.less'],
})
export class FilterQualityComponent implements OnInit {
  apps: IAppGridItem[] = [];

  ngOnInit() {
    const appModerationLog: IAppGridItem = {
      text: 'Moderation Log',
      icon: 'mdi-table',
      url: null,
    };

    const appCommonPhrases: IAppGridItem = {
      text: 'Examples',
      icon: 'mdi-chat-processing-outline',
      url: '/filter-quality/audit-examples',
    };

    const appFixSpelling: IAppGridItem = {
      text: 'Fix Spelling',
      icon: 'mdi-spellcheck',
      url: '/filter-quality/fix-spelling',
    };

    const appAuditUsernames: IAppGridItem = {
      text: 'Audit Usernames',
      icon: 'mdi-account-circle',
      url: '/filter-quality/audit-usernames',
    };

    const appAuditRules: IAppGridItem = {
      text: 'Audit Rules',
      icon: 'mdi-magnify',
      url: '/filter-quality/audit-rules',
    };

    const appMeasureAccuracy: IAppGridItem = {
      text: 'Measure Accuracy',
      icon: 'mdi-tune',
      url: null,
    };

    const appLanguageTasks: IAppGridItem = {
      text: 'Language Tasks',
      icon: 'mdi-translate',
      url: '/filter-quality/language-tasks',
    };

    const appListRules: IAppGridItem = {
      text: 'List Rules',
      icon: 'mdi-view-list',
      url: null,
    };

    const appPublishRules: IAppGridItem = {
      text: 'Publish Rules',
      icon: 'mdi-publish',
      url: null,
    };

    const appCreateNewRule: IAppGridItem = {
      text: 'Create New Rule',
      icon: 'mdi-pencil-plus',
      url: null,
    };

    this.apps.push(
      ...[
        appModerationLog,
        appCommonPhrases,
        appFixSpelling,
        appAuditUsernames,
        appAuditRules,
        appMeasureAccuracy,
        appLanguageTasks,
        appListRules,
        appPublishRules,
        appCreateNewRule,
      ]
    );
  }
}
