import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedComponentsModule } from '../shared-components/shared-components.module';

import { FilterQualityRoutingModule } from './filter-quality-routing.module';
import { FilterQualityComponent } from './filter-quality.component';
import { ExamplesQueueComponent } from './examples-queue/examples-queue.component';
import { RulesAuditQueueModule } from './rules-audit-queue/rules-audit-queue.module';
import { FixSpellingComponent } from './fix-spelling/fix-spelling.component';
import { UsernamesQueueComponent } from './usernames-queue/usernames-queue.component';
import { FixSpellingItemComponent } from './fix-spelling-item/fix-spelling-item.component';

@NgModule({
  declarations: [
    FilterQualityComponent,
    ExamplesQueueComponent,
    UsernamesQueueComponent,
    FixSpellingComponent,
    FixSpellingItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    RulesAuditQueueModule,
    FilterQualityRoutingModule,
  ],
})
export class FilterQualityModule {}
