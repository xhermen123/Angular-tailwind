import { Component } from '@angular/core';
import { BaseQueueComponent } from '../../base-queue/base-queue.component';

import {
  BaseQueueService,
  QUEUE_NAME,
} from '../../base-queue/base-queue.service';
import { Breadcrumb } from '../../shared-components/breadcrumbs/breadcrumb.interface';

@Component({
  selector: 'ftq-usernames-queue',
  templateUrl: './usernames-queue.component.html',
  styles: [':host { width: 100%; }'],
  providers: [
    {
      provide: QUEUE_NAME,
      useValue: 'usernames',
    },
    BaseQueueService,
  ],
})
export class UsernamesQueueComponent extends BaseQueueComponent<{
  text: string;
}> {
  readonly breadcrumbs: Breadcrumb[] = [
    {
      label: 'Filter Quality',
      url: '/filter-quality',
    },
    {
      label: 'Audit Usernames',
    },
  ];
}
