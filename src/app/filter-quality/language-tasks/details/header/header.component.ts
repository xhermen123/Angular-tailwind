import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { has } from 'lodash';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ConstantsService } from 'src/app/services/constants.service';
import { FilterService, FilterType } from 'src/app/services/filter.service';

@Component({
  selector: 'app-language-tasks-details-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class LanguageTasksDetailsHeaderComponent implements OnInit {
  @Input() pageType: number;
  @Output() taskActionEvent = new EventEmitter<number>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private constantsService: ConstantsService,
    private filterService: FilterService
  ) { }

  ngOnInit() { }

  editTask(): void {
    this.pageType = 1;
    this.taskActionEvent.emit(this.pageType);
  }

  createTask(): void {
    this.pageType = 2;
    this.taskActionEvent.emit(this.pageType);
  }
}
