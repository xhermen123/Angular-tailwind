import { Component } from '@angular/core';
import { ThemeService } from '../theme';

@Component({
  selector: 'mod-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.less'],
})
export class DocsComponent {
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('light');
    }
  }
}
