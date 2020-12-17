import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { BreadcrumbModule } from 'xng-breadcrumb';

import { AlternativesComponent } from './alternatives/alternatives.component';
import { AppGridComponent } from './app-grid/app-grid.component';
import { ExampleComponent } from './example/example.component';
import { ExampleListComponent } from './example-list/example-list.component';
import { HighlightDirective } from './highlight-directive/highlight.directive';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { OptionButtonGroupComponent } from './option-button-group/option-button-group.component';
import { TopicChipComponent } from './topic-chip/topic-chip.component';
import { TopicChipListComponent } from './topic-chip-list/topic-chip-list.component';
import { QueueWrapperComponent } from './queue-wrapper/queue-wrapper.component';
import { QueueItemTagsComponent } from './queue-item-tags/queue-item-tags.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ComboBoxComponent } from './combo-box/combo-box.component';
import { ComboBoxFilterPipe } from '../pipes';
import { AppCommentComponent } from './app-comment/app-comment.component';
import { AppDatePickerModule } from './app-datepicker';
import { AppPaginationModule } from './app-pagination/pagination.module';
import { AppCheckboxComponent } from './app-checkbox/app-checkbox.component';
import { AppLanguageButtonGroupComponent } from './app-language-button-group/app-language-button-group.component';
import { AppSelectComponent } from './app-select/app-select.component';
import { CommentsPanelComponent } from './comments-panel/comments-panel.component';
import { CommentIconComponent } from './comment-icon/comment-icon.component';
import { AppBreadcrumbsComponent } from './app-breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AlternativesComponent,
    AppGridComponent,
    BreadcrumbsComponent,
    AppBreadcrumbsComponent,
    ComboBoxComponent,
    ComboBoxFilterPipe,
    DropdownMenuComponent,
    ExampleComponent,
    ExampleListComponent,
    HighlightDirective,
    LoadingIndicatorComponent,
    OptionButtonGroupComponent,
    QueueItemTagsComponent,
    QueueWrapperComponent,
    TopicChipComponent,
    TopicChipListComponent,
    AppCheckboxComponent,
    AppCommentComponent,
    AppLanguageButtonGroupComponent,
    AppSelectComponent,
    CommentsPanelComponent,
    CommentIconComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule, BreadcrumbModule, AppDatePickerModule, AppPaginationModule],
  exports: [
    BreadcrumbModule,
    AppDatePickerModule,
    AppPaginationModule,
    AlternativesComponent,
    AppGridComponent,
    ComboBoxComponent,
    DropdownMenuComponent,
    ExampleComponent,
    ExampleListComponent,
    HighlightDirective,
    LoadingIndicatorComponent,
    OptionButtonGroupComponent,
    QueueItemTagsComponent,
    QueueWrapperComponent,
    TopicChipComponent,
    TopicChipListComponent,
    AppCheckboxComponent,
    AppCommentComponent,
    AppLanguageButtonGroupComponent,
    AppSelectComponent,
    CommentsPanelComponent,
    CommentIconComponent,
    BreadcrumbsComponent,
    AppBreadcrumbsComponent,
    ComboBoxFilterPipe
  ],
})
export class SharedComponentsModule {}
