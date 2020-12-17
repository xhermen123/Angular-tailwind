import { Component, Input } from '@angular/core';

@Component({
  selector: 'mod-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.less'],
})
export class LoadingIndicatorComponent {
  @Input() error: boolean;
  @Input() loading: boolean;
}
