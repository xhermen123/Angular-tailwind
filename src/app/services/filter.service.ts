import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface FilterType {
  language: string,
  accountType: string,
  chatType: string,
  deeperAnalysis: boolean
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private _filterData: Subject<FilterType> = new Subject();
  private filterData: FilterType = {
    language: 'en',
    accountType: 'live',
    chatType: 'chat',
    deeperAnalysis: false
  };
  private _searchText: Subject<string> = new Subject();
  private searchText: string;

  constructor( ) {

  }

  setFilterData(data: FilterType) {
    this.filterData = data;
    this._filterData.next(data);
  }

  getFilterData() {
    return this.filterData;
  }

  subscribeFilterData() {
    return this._filterData.asObservable();
  }

  setSearchText(text: string) {
    this.searchText = text;
    this._searchText.next(text);
  }

  getSearchText() {
    return this.searchText;
  }

  subscribeSearchText() {
    return this._searchText.asObservable();
  }
}
