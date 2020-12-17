import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IOptionButton {
  label?: string;
  icon?: string;
  value: string | number;
  ariaLabel: string;
}

@Component({
  selector: 'mod-option-button-group',
  templateUrl: './option-button-group.component.html',
})
export class OptionButtonGroupComponent implements OnInit {
  groupId = '';

  @Input() label = '';
  @Input() options: IOptionButton[] = [];
  @Input() value: string | string[] = '';
  @Input() readOnly = false;
  @Input() multiple = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    this.groupId = Math.random().toString(36).substring(2);

    if (this.multiple && !this.value) {
      this.value = [];
    }
  }

  onValueChanged($event: any) {
    if (this.readOnly) return;
    this.valueChange.emit($event);
  }

  onCheckboxValueChanged(checked: boolean, checkboxValue: string) {
    if (this.readOnly) return;
    const valueIndex = this.value.indexOf(checkboxValue);
    if (!Array.isArray(this.value)) {
      this.value = [];
    }

    if (checked) {
      if (valueIndex === -1) {
        this.value.push(checkboxValue);
      }
    } else if (valueIndex !== -1) {
      this.value.splice(valueIndex, 1);
    }
    this.valueChange.emit(this.value.slice() as any);
  }

  onOptionButtonClicked(checkboxValue) {
    if (this.readOnly) return;
    if (this.multiple) {
      if (!Array.isArray(this.value)) {
        this.value = [];
      }

      const valueIndex = this.value.indexOf(checkboxValue);

      if (valueIndex === -1) {
        this.value.push(checkboxValue);
      } else {
        this.value.splice(valueIndex, 1);
      }
      this.valueChange.emit(this.value.slice() as any);
    } else if (this.value !== checkboxValue) {
      this.value = checkboxValue;
      this.valueChange.emit(checkboxValue);
    }
  }
}
