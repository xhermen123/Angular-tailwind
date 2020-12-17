import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ComboBoxFilterPipe } from 'src/app/pipes';
import { ComboBoxComponent } from './combo-box.component';

const items = [
  { id: 0, name: 'English' },
  { id: 1, name: 'Vietnamese' },
  { id: 2, name: 'Japanese' },
];

describe('ComboBoxComponent', () => {
  let component: ComboBoxComponent;
  let fixture: ComponentFixture<ComboBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ComboBoxComponent, ComboBoxFilterPipe],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('setupData', () => {
    it('should get checked item without selectedItems', () => {
      component = new ComboBoxComponent();
      component.items = items;
      component.bindKey = 'id';

      component.setupData();

      expect(component.selectedItems).toEqual([]);
      expect(component.checkedItems).toEqual([]);
      expect(component.items).toEqual([
        { checked: false, id: 0, name: 'English' },
        { checked: false, id: 1, name: 'Vietnamese' },
        { checked: false, id: 2, name: 'Japanese' },
      ]);
    });
    it('should get checked item with selectedItems', () => {
      component = new ComboBoxComponent();
      component.items = items;
      component.selectedItems = [items[1]];
      component.bindKey = 'id';

      component.setupData();

      expect(component.items).toEqual([
        { checked: false, id: 0, name: 'English' },
        { checked: true, id: 1, name: 'Vietnamese' },
        { checked: false, id: 2, name: 'Japanese' },
      ]);
      expect(component.checkedItems).toEqual([
        { checked: true, id: 1, name: 'Vietnamese' },
      ]);
    });
  });

  describe('onItemClicked', () => {
    it('itemChanged should not be called with isMultiple = true', () => {
      const selectedItem = { id: 1, name: 'Vietnamese' };
      const spy = jest.spyOn(component.itemChanged, 'emit');

      component.isMultiple = true;
      component.onItemClicked(selectedItem);

      expect(spy).not.toHaveBeenCalled();
    });
    it('itemChanged should be called with isMultiple = false', () => {
      const selectedItem = { id: 1, name: 'Vietnamese' };
      const spy = jest.spyOn(component.itemChanged, 'emit');
      component.isMultiple = false;

      component.onItemClicked(selectedItem);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith([selectedItem]);
      component.itemChanged.subscribe((item) => {
        expect(item).toEqual([selectedItem]);
      });
      expect(component.selectedItems).toEqual([{ id: 1, name: 'Vietnamese' }]);
      expect(component.checkedItems).toEqual([{ id: 1, name: 'Vietnamese' }]);
    });
  });

  describe('close', () => {
    it('should get active false and closed should be called', () => {
      const closeSpy = jest.spyOn(component.closed, 'emit');
      component.close();
      expect(component.active).toBeFalsy();
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('onSelectClicked', () => {
    let closeSpy;
    beforeEach(() => {
      closeSpy = jest.spyOn(component, 'close');
    });
    it('should get active true and not call close function', () => {
      component.isSearchable = true;
      component.isMultiple = true;
      component.active = true;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();

      component.isSearchable = true;
      component.isMultiple = true;
      component.active = false;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();

      component.isSearchable = true;
      component.isMultiple = false;
      component.active = false;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();

      component.isSearchable = true;
      component.isMultiple = false;
      component.active = true;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();

      component.isSearchable = false;
      component.isMultiple = true;
      component.active = false;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();

      component.isSearchable = false;
      component.isMultiple = true;
      component.active = true;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();

      component.isSearchable = false;
      component.isMultiple = false;
      component.active = false;

      component.onSelectClicked();
      expect(component.active).toBeTruthy();
      expect(closeSpy).not.toHaveBeenCalled();
    });
    it('should get active false and call close function', () => {
      component.isSearchable = false;
      component.isMultiple = false;
      component.active = true;

      component.onSelectClicked();
      expect(component.active).toBeFalsy();
      expect(closeSpy).toHaveBeenCalled();
    });
  });

  describe('onItemChanged', () => {
    it('should emit checkedItems', () => {
      const checkedItems = [{ id: 0, name: 'English', checked: true }];
      const item = { id: 1, name: 'Vietnamese', checked: false };
      const spy = jest.spyOn(component.itemChanged, 'emit');
      component.checkedItems = [];
      component.bindValue = 'name';
      component.bindKey = 'id';

      component.onItemChanged(item);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith([]);
      expect(component.checkedItems).toEqual([]);

      component.checkedItems = [];
      component.onItemChanged(checkedItems[0]);
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenCalledWith(checkedItems);
      expect(component.checkedItems).toEqual(checkedItems);

      component.checkedItems = checkedItems;
      component.onItemChanged(item);
      expect(component.checkedItems).toEqual(checkedItems);
      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenCalledWith(checkedItems);

      const itemCheckedFalseInList = { ...checkedItems[0], checked: false };
      component.onItemChanged(itemCheckedFalseInList);
      expect(spy).toHaveBeenCalledTimes(4);
      expect(spy).toHaveBeenCalledWith([]);
      expect(component.checkedItems).toEqual([]);

      const item2 = { id: 1, name: 'Vietnamese', checked: true };
      const checkedTwoItems = [...checkedItems, item2];
      component.onItemChanged(item2);
      expect(spy).toHaveBeenCalledTimes(5);
      expect(spy).toHaveBeenCalledWith(checkedTwoItems);
      expect(component.checkedItems).toEqual(checkedTwoItems);
    });
  });

  describe('get checkedItemValue', () => {
    it('should return value from checkedItems without showValue', () => {
      component.checkedItems = [
        { id: 0, name: 'English', code: 'En' },
        { id: 1, name: 'Vietnamese', code: 'Vi' },
      ];
      component.bindValue = 'name';
      expect(component.checkedItemValue).toEqual('English, Vietnamese');
    });
    it('should return value from checkedItems with showValue', () => {
      component.checkedItems = [
        { id: 0, name: 'English', code: 'En' },
        { id: 1, name: 'Vietnamese', code: 'Vi' },
      ];
      component.bindValue = 'name';
      component.showValue = 'code';
      expect(component.checkedItemValue).toEqual('En, Vi');
    });
  });

  describe('isActive', () => {
    it('should return true if selectedItems contain item', () => {
      const selectedItems = [
        { id: 0, name: 'English' },
        { id: 1, name: 'Vietnamese' },
      ];
      const selectedItem = { id: 1, name: 'Vietnamese' };

      component.selectedItems = selectedItems;
      component.bindKey = 'id';

      const active = component.isActive(selectedItem);

      expect(active).toBeTruthy();
    });
    it('should return false if selectedItems not contain item', () => {
      const selectedItems = [
        { id: 0, name: 'English' },
        { id: 1, name: 'Vietnamese' },
      ];
      const selectedItem = { id: 2, name: 'Japanese' };

      component.selectedItems = selectedItems;
      component.bindKey = 'id';

      const active = component.isActive(selectedItem);

      expect(active).toBeFalsy();
    });
  });
});
