import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRuleRoutingModule } from './create-rule-routing.module';
import { CreateRuleComponent } from './create-rule.component';
import { HomeComponent } from './home/home.component';
import { CreateRuleHomeHeaderComponent } from './home/header/header.component';
import { SharedComponentsModule } from 'src/app/shared-components/shared-components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateRuleComponent, HomeComponent, CreateRuleHomeHeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    PipesModule,
    CreateRuleRoutingModule
  ]
})
export class CreateRuleModule { }
