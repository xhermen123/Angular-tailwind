import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-app-language-button-group',
  templateUrl: './app-language-button-group.component.html',
  styleUrls: ['./app-language-button-group.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppLanguageButtonGroupComponent),
      multi: true
    }
  ]
})
export class AppLanguageButtonGroupComponent implements OnInit {
  @Input() languages: Array<string> = ['All', 'en', 'fr', 'pt', 'it', 'ru'];
  @Input() currentIndex = 0;
  @Input() multiple = false;
  @Output() languageChange: EventEmitter<string | Array<string>> = new EventEmitter<string | Array<string>>();
  _value: string | Array<string>;
  private propagateChange = (_: any) => {};
  private propagateTouched = () => {};

  constructor() { }

  ngOnInit(): void {
  }

  writeValue(value: any) {
    if (this.multiple) {
      if (value) {
        this._value = value;
      } else {
        if (this.languages.length > 0) {
          this._value = [this.languages[0]];
        }
      }
    } else {
      if (value) {
        this._value = value;
      } else {
        if (this.languages.length > 0) {
          this._value = this.languages[0];
        }
      }
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  selectLanguage(index, lang): void {
    // this.currentIndex = index;
    if (this.multiple) {
      let index = this._value.indexOf(lang);
      let tempVal = this._value as Array<string>;

      if (index > -1) {
        tempVal.splice(index, 1);
        this._value = tempVal;
      } else {
        tempVal.push(lang);
        this._value = tempVal;
      }
      this.propagateChange(tempVal);
      this.languageChange.emit(tempVal);
    } else {
      this._value = lang;
      this.propagateChange(lang);
      this.languageChange.emit(lang);
    }
  }
}
