import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as LanguageTasksSeletor from 'src/app/store/reducers/language-tasks.reducers';
import * as LanguageTasksActions from 'src/app/store/actions/language-tasks.actions';
import { TaskOutputItems, TaskOutput, DefaultService } from 'src/app/api';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import moment from 'moment';
import { init } from '@sentry/browser';

@Component({
  selector: 'app-language-tasks-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  p: number;
  totalCount: number;
  isCommentsPanel: boolean;
  commentQueueId: string;
  commentContentId: string;

  // tasks: Observable<Array<TaskOutputItems>>;
  tasks: Array<TaskOutputItems>;
  perPageCounts: Array<number> = [15, 50, 100, 500, 1000];
  countPerPage: number = this.perPageCounts[0];
  currentPage = 1;
  selectedTab = 'all';

  constructor(
    private readonly store: Store,
    private apiService: DefaultService
  ) { }

  ngOnInit(): void {
    const params: LanguageTasksActions.LanguageTasksRequestInterface = {
      language: 'en',
      clientIds: [12]
    };

    this.store.dispatch(LanguageTasksActions.requestLanguageTasks({params}));
    this.store.pipe(select(LanguageTasksSeletor._getLanguageTasks))
    // .pipe(
    //   tap(res => {
    //       this.totalPages = res ? res.total : 0;
    //       this.p = 1;
    //   }),
    //   map(res => res ? res.items : [])
    // );
    .subscribe((languageTasks: TaskOutput) => {
      this.totalCount = languageTasks ? languageTasks.total : 0;
      this.tasks = languageTasks ? languageTasks.items : [];
    });
  }

  getTaskItems (initial: boolean = false): void {
    const params: LanguageTasksActions.LanguageTasksRequestInterface = {
      language: 'en',
      clientIds: [12],
      limit: this.countPerPage,
      offset: initial ? 0 : (this.currentPage - 1) * this.countPerPage
    };

    switch (this.selectedTab) {
      case 'all':
        // params.assignedToModeratorId = 'moderator';
        break;
      case 'assigned_me':
        params.assignedToModeratorId = 'moderator';
        break;
      case 'pending':
        params.checkoutAvailable = true;
        break;
      case 'active':
        params.reviewedEndDate = moment().unix();
        break;
      case 'done':
        params.checkoutAvailable = false;
        params.reviewedStartDate = 0;
        break;
      default:
        break;
    }

    this.store.dispatch(LanguageTasksActions.requestLanguageTasks({params}));
  }

  selectTab (id): void {
    this.selectedTab = id;
    this.currentPage = 1;
    this.getTaskItems(true);
  }

  onPageChange(page) {
    console.log('page', page);
    this.currentPage = page;
    this.getTaskItems();
  }

  onPageCountChange (count): void {
    this.countPerPage = count;
    this.currentPage = 1;
    this.getTaskItems();
  }

  openCommentsPanel (task): void {
    this.commentQueueId = 'task';
    this.commentContentId = task.queueItem.contentId;
    this.isCommentsPanel = true;
  }

  closeCommentsPanel (): void {
    this.isCommentsPanel = false;
  }
}
