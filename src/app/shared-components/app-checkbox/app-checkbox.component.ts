import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './app-checkbox.component.html',
  styleUrls: ['./app-checkbox.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppCheckboxComponent),
      multi: true
    }
  ]
})
export class AppCheckboxComponent implements ControlValueAccessor, OnInit {
  @Input() label: string;
  @Input() checked: boolean;
  @Input() small = false;
  @Input() type: string;

  _value: boolean;
  initValue: boolean;
  additionalClassName = '';

  private propagateChange = (_: any) => {};
  private propagateTouched = () => {};

  constructor() { }

  ngOnInit() {
    this.initValue = this.checked;
    if (this.small) {
      this.additionalClassName += ' small'
    }

    if (this.type) {
      this.additionalClassName += ' ' + this.type;
    }
  }

  writeValue(value: any) {
    this._value = value;
    console.log(this._value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  toggleCheckbox() {
    this._value = !this._value;
    this.propagateChange(this._value);
  }
}
