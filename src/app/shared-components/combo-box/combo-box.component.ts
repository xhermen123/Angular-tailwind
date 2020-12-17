import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'mod-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.less'],
})
export class ComboBoxComponent implements OnInit, OnChanges {
  @Input() isSearchable = false;
  @Input() isMultiple = false;
  @Input() items = [];
  @Input() maximumItemShow = 6;
  @Input() bindKey: string;
  @Input() bindValue: string;
  @Input() selectedItems = [];
  @Input() cssClass = '';
  @Input() isShowChevronDownIcon = true;
  @Input() showValue: string;

  @Output() itemChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed: EventEmitter<any> = new EventEmitter<any>();

  active = false;
  checkedItems = [];
  keyword: string;

  optionItemHeight = 2.78; // rem
  optionWrapperPaddingY = 0.75; // 3/4 rem  = 3 * tailwind unit
  optionWrapperMaxHeight =
    this.optionItemHeight * this.maximumItemShow +
    this.optionWrapperPaddingY * 2 +
    'rem';

  ngOnInit(): void {
    this.setupData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupData();
  }

  setupData() {
    // set checked checkbox on load
    if (this.selectedItems) {
      this.items = this.items.map((item) => {
        item.checked = this.isActive(item);
        return item;
      });
    }
    // push selected item to checked array to display
    this.checkedItems = [...this.selectedItems];
  }
  onItemClicked(item: any) {
    if (!this.isMultiple) {
      this.selectedItems = [item];
      this.checkedItems = [item];
      this.itemChanged.emit([item]);
    }
  }
  onSelectClicked() {
    // change active status when not isSearchable nor isMultiple
    if (this.isSearchable || this.isMultiple || !this.active) {
      this.active = true;
    } else {
      this.close();
    }
  }
  onItemChanged(item: any) {
    const idx = this.checkedItems.findIndex(
      (i) => i[this.bindKey] === item[this.bindKey]
    );
    if (item.checked) {
      idx === -1 && this.checkedItems.push(item);
    } else {
      idx !== -1 && this.checkedItems.splice(idx, 1);
    }
    // emit to parent
    this.itemChanged.emit(this.checkedItems);
  }
  get checkedItemValue() {
    return this.checkedItems
      .map((elem) =>
        this.showValue ? elem[this.showValue] : elem[this.bindValue]
      )
      .join(', ');
  }
  isActive(item) {
    return this.selectedItems.some(
      (sltItem) => sltItem[this.bindKey] === item[this.bindKey]
    );
  }
  close() {
    this.active = false;
    this.closed.emit();
  }
}
