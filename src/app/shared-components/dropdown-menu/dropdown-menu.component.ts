import { Component, Input } from '@angular/core';

@Component({
  selector: 'mod-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent {
  @Input() label: string;
  @Input() icon: string;
  @Input() isSmall = false;

  active = false;
}
