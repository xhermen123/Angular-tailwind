import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-counts',
  templateUrl: './pagination-counts.component.html',
  styleUrls: ['./pagination-counts.component.less']
})
export class PaginationCountsComponent implements OnInit {

  constructor() { }

  @Input() countArray: Array<number> = [15, 50, 100, 500, 1000];
  @Input() currentIndex = 0;
  @Output() pageCountChange: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  selectPageCount(index, count): void {
    this.currentIndex = index;
    this.pageCountChange.emit(count);
  }
}
