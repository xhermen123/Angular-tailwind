import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.less']
})
export class ToggleComponent  {
  @Input() checked: boolean;
  @Input() className: string;
  @Input() label: string;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter();

  onClick() {
    this.checked = !this.checked;
    this.toggled.emit(this.checked);
  }
}
