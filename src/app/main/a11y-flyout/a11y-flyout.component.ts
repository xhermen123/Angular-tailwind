import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/storage/local-storage.service';

type ThemeName = 'light' | 'dark' | 'twilight' | 'high-contrast';
const DEFAULT_TEXT_SIZE = 14;

@Component({
  selector: 'main-a11y-flyout',
  templateUrl: './a11y-flyout.component.html',
})
export class A11yFlyoutComponent implements OnInit {
  readonly themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Twilight', value: 'twilight' },
    { label: 'High contrast', value: 'high-contrast' },
  ];
  readonly textSizeOptions = [11, 12, 14, 16, 18, 24, 28];

  private _activeTheme: ThemeName;
  private _textSize: number;

  get activeTheme() {
    return this._activeTheme;
  }
  set activeTheme(value) {
    document.documentElement.dataset.theme = value;
    this._activeTheme = value;
  }

  get textSize() {
    return this._textSize;
  }
  set textSize(value) {
    document.documentElement.style.fontSize = `${value}px`;
    this._textSize = value;
  }

  constructor(private readonly localStorageSerivce: LocalStorageService) {}

  ngOnInit() {
    this.activeTheme = this.localStorageSerivce.getItem('theme') || 'dark';
    this.textSize =
      this.localStorageSerivce.getItem('textSize') || DEFAULT_TEXT_SIZE;
  }

  onThemeChange(value: ThemeName) {
    this.localStorageSerivce.setItem('theme', value);
    this.activeTheme = value;
  }

  increaseTextSize() {
    const index = this.textSizeOptions.indexOf(this.textSize);
    if (index < this.textSizeOptions.length - 1) {
      this.onTextSizeChange(this.textSizeOptions[index + 1]);
    }
  }

  decreaseTextSize() {
    const index = this.textSizeOptions.indexOf(this.textSize);
    if (index > 0) {
      this.onTextSizeChange(this.textSizeOptions[index - 1]);
    }
  }

  resetTextSize() {
    this.onTextSizeChange(DEFAULT_TEXT_SIZE);
  }

  onTextSizeChange(value: number) {
    this.localStorageSerivce.setItem('textSize', value);
    this.textSize = value;
  }
}
