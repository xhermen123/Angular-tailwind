import { Component, Input } from '@angular/core';
import { IAppGridItem } from './iapp-grid-item';

@Component({
  selector: 'mod-app-grid',
  templateUrl: './app-grid.component.html',
  styleUrls: ['./app-grid.component.less'],
})
export class AppGridComponent {
  _apps: IAppGridItem[] = [];
  _gridColumns = 4;

  get apps() {
    return this._apps;
  }
  @Input() set apps(apps: IAppGridItem[]) {
    this._apps = apps;
  }

  get columns() {
    return this._gridColumns;
  }
  @Input() set columns(columns: number) {
    this._gridColumns = columns;
  }
}
