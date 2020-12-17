import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterQualityComponent } from './filter-quality.component';
import { ExamplesQueueComponent } from './examples-queue/examples-queue.component';
import { RulesAuditQueueComponent } from './rules-audit-queue/rules-audit-queue.component';
import { UsernamesQueueComponent } from './usernames-queue/usernames-queue.component';
import { FixSpellingComponent } from './fix-spelling/fix-spelling.component';
import { LanguageTasksComponent } from './language-tasks/language-tasks.component';

const routes: Routes = [
  {
    path: '',
    component: FilterQualityComponent,
    data: { breadcrumb: 'Filter Quality' },
  },
  {
    path: 'audit-examples',
    component: ExamplesQueueComponent,
    data: {
      breadcrumb: 'Audit Examples',
    },
  },
  {
    path: 'audit-rules',
    component: RulesAuditQueueComponent,
    data: {
      breadcrumb: 'Audit Rules',
    },
  },
  {
    path: 'audit-usernames',
    component: UsernamesQueueComponent,
    data: {
      breadcrumb: 'Audit Usernames',
    },
  },
  {
    path: 'fix-spelling',
    component: FixSpellingComponent,
    data: {
      breadcrumb: 'Fix Spelling'
    }
  },
  {
    path: 'language-tasks',
    component: LanguageTasksComponent,
    data: {breadcrumb: 'Language Tasks', title: 'Language Tasks'},
    loadChildren: () => import('./language-tasks/language-tasks.module').then(m => m.LanguageTasksModule)
  },
  {
    path: 'create-rule',
    component: LanguageTasksComponent,
    data: {breadcrumb: 'Create Rule', title: 'Create Rule'},
    loadChildren: () => import('./create-rule/create-rule.module').then(m => m.CreateRuleModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterQualityRoutingModule {}
