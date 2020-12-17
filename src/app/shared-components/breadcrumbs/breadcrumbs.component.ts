import { Component, Input } from '@angular/core';
import { Breadcrumb } from './breadcrumb.interface';

@Component({
  selector: 'mod-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [':host { display: block; }'],
})
export class BreadcrumbsComponent {
  @Input() breadcrumbs: Breadcrumb[] = [];
}
