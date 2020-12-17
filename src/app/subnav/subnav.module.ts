import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SubNavigationComponent } from './sub-navigation/sub-navigation.component';

@NgModule({
  declarations: [SubNavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SubNavigationComponent],
})
export class SubnavModule {}
