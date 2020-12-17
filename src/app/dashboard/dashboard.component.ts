import { Component, OnInit } from '@angular/core';
import { IAppGridItem } from '../shared-components/app-grid/iapp-grid-item';

@Component({
  selector: 'mod-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  apps: IAppGridItem[] = [];

  ngOnInit() {
    const appPolicyGuides: IAppGridItem = {
      text: 'Policy Guides',
      icon: 'mdi-book-variant',
      url: '',
    };

    const appFilterQuality: IAppGridItem = {
      text: 'Filter Quality',
      icon: 'mdi-air-filter',
      url: '/filter-quality',
    };

    const appUserReputation: IAppGridItem = {
      text: 'User Reputation',
      icon: 'mdi-account-check',
      url: '',
    };

    const appReportedContent: IAppGridItem = {
      text: 'Reported Content',
      icon: 'mdi-flag',
      url: '',
    };

    const appAPIDocs: IAppGridItem = {
      text: 'API Docs',
      icon: 'mdi-file-outline',
      url: '',
    };

    const appTransparency: IAppGridItem = {
      text: 'Transparency Reports',
      icon: 'mdi-chart-line',
      url: '',
    };

    const appAdmin: IAppGridItem = {
      text: 'Administration',
      icon: 'mdi-cogs',
      url: '',
    };

    const appSiftUniversity: IAppGridItem = {
      text: 'Sift University',
      icon: 'mdi-school',
      url: '',
    };

    this.apps.push(
      ...[
        appPolicyGuides,
        appFilterQuality,
        appUserReputation,
        appReportedContent,
        appAPIDocs,
        appTransparency,
        appAdmin,
        appSiftUniversity,
      ]
    );
  }
}
