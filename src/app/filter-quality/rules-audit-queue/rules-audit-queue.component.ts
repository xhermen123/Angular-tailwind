import { BaseQueueComponent } from 'src/app/base-queue/base-queue.component';
import {
  BaseQueueService,
  QUEUE_NAME,
} from 'src/app/base-queue/base-queue.service';
import { Component } from '@angular/core';
import { AuditRulesItemData } from '../audit-rules/audit-rules';
import { Breadcrumb } from 'src/app/shared-components/breadcrumbs/breadcrumb.interface';

@Component({
  selector: 'ftq-rules-audit-queue',
  templateUrl: './rules-audit-queue.component.html',
  styleUrls: ['./rules-audit-queue.component.less'],
  providers: [
    { provide: QUEUE_NAME, useValue: 'rulesAudit' },
    BaseQueueService,
  ],
})
export class RulesAuditQueueComponent extends BaseQueueComponent<
  AuditRulesItemData
> {
  readonly breadcrumbs: Breadcrumb[] = [
    {
      label: 'Filter Quality',
      url: '/filter-quality',
    },
    {
      label: 'Audit Rules',
    },
  ];
}
