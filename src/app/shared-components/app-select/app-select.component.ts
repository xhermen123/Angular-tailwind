import {NgModule,Component,Input, Output, OnInit, forwardRef} from '@angular/core';
import {EventEmitter} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SelectType {
    id: string;
    label: string;
    isSelected?: boolean;
    selected?: boolean;
}

@Component({
    selector: 'app-select',
    templateUrl: './app-select.component.html',
    styleUrls: ['./app-select.component.less'],
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AppSelectComponent),
          multi: true
        }
    ]
})
export class AppSelectComponent implements ControlValueAccessor, OnInit{

    @Input() items: SelectType[] = [];
    @Input() selectedItem: SelectType;
    @Input() displayType = 'label';
    @Input() multiselect = false;
    @Output() doSelect = new EventEmitter<SelectType>();

    public _selectedItem: any;//SelectType | Array<SelectType>;
    public isOpenList = false;
    isDisabled = false;
    isSelected = false;

    private propagateChange = (_: any) => {};
    private propagateTouched = () => {};

    constructor() { }

    ngOnInit() { }

    writeValue(obj: any): void {
        if (this.multiselect) {
            if (obj && obj.length > 0) {
                obj.map(item => item.selected = true);
                this._selectedItem = obj;
            } else {
                if (this.items.length > 0) {
                    this.items[0].selected = true;
                    this._selectedItem = [this.items[0]];
                } else {
                    this._selectedItem = [{
                        id: '',
                        label: ''
                    }];
                }
            }
        } else {
            if (obj) {
                this._selectedItem = obj;
            } else {
                if (this.items.length > 0) {
                    this._selectedItem = this.items[0];
                } else {
                    this._selectedItem = {
                        id: '',
                        label: ''
                    };
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
    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    onClick(item) {
        if (!this.multiselect) {
            this.isOpenList = false;
            this._selectedItem = item;
            this.propagateChange(this._selectedItem);
            this.doSelect.emit(item);
        } else {
            let tempSelectedItem = this._selectedItem as Array<SelectType>;
            let index = tempSelectedItem.indexOf(item);
            if (index > -1) {
                tempSelectedItem.splice(index, 1);
                this._selectedItem = tempSelectedItem;
                item.selected = false;
            } else {
                tempSelectedItem.push(item);
                this._selectedItem = tempSelectedItem;
                item.selected = true;
            }
            console.log(this._selectedItem);
            this.propagateChange(this._selectedItem);
            this.doSelect.emit(this._selectedItem);
        }
    }
}