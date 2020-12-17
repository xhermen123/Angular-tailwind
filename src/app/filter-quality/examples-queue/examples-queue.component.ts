import { Component } from '@angular/core';
import { Example } from '../../shared-components/example/example';
import { BaseQueueComponent } from '../../base-queue/base-queue.component';
import {
  BaseQueueService,
  QUEUE_NAME,
} from '../../base-queue/base-queue.service';
import { Breadcrumb } from '../../shared-components/breadcrumbs/breadcrumb.interface';

@Component({
  selector: 'ftq-examples-queue',
  templateUrl: './examples-queue.component.html',
  styleUrls: ['./examples-queue.component.less'],
  providers: [{ provide: QUEUE_NAME, useValue: 'examples' }, BaseQueueService],
})
export class ExamplesQueueComponent extends BaseQueueComponent<Example> {
  readonly breadcrumbs: Breadcrumb[] = [
    {
      label: 'Filter Quality',
      url: '/filter-quality',
    },
    {
      label: 'Audit Examples',
    },
  ];
}
