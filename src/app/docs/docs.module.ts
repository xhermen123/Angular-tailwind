import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';

@NgModule({
  imports: [CommonModule, DocsRoutingModule, SharedComponentsModule],
  declarations: [DocsComponent],
})
export class DocsModule {}
