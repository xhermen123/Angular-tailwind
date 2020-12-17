import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuditRulesComponent } from './audit-rules.component';

const routes: Routes = [{ path: '', component: AuditRulesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuditRulesRoutingModule {}
