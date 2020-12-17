import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BreadcrumbModule } from 'xng-breadcrumb';
import { FormsModule } from '@angular/forms';

import { AuditRulesRoutingModule } from './audit-rules-routing.module';
import { AuditRulesComponent } from './audit-rules.component';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';

@NgModule({
  declarations: [AuditRulesComponent],
  imports: [
    CommonModule,
    AuditRulesRoutingModule,
    SharedComponentsModule,
    // BreadcrumbModule,
    FormsModule,
  ],
})
export class AuditRulesModule {}
