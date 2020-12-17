import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IDatePickerConfig, ECalendarValue } from 'src/app/shared-components/app-datepicker';
import moment from 'moment';
import * as LanguageTasksSeletor from 'src/app/store/reducers/language-tasks.reducers';
import * as LanguageTasksActions from 'src/app/store/actions/language-tasks.actions';
import { Store, select } from '@ngrx/store';
import { TaskOutput, TaskOutputItems, TaskInput, DefaultService, Comment } from 'src/app/api';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { LanguageTasksService } from 'src/app/services/language-tasks.service';

const DEF_CONF: IDatePickerConfig = {
  firstDayOfWeek: 'su',
  monthFormat: 'MMM, YYYY',
  disableKeypress: false,
  allowMultiSelect: false,
  closeOnSelect: undefined,
  closeOnSelectDelay: 100,
  openOnFocus: true,
  openOnClick: true,
  onOpenDelay: 0,
  closeOnEnter: true,
  weekDayFormat: 'ddd',
  appendTo: document.body,
  showNearMonthDays: true,
  showWeekNumbers: false,
  enableMonthSelector: true,
  yearFormat: 'YYYY',
  showGoToCurrent: true,
  dayBtnFormat: 'DD',
  monthBtnFormat: 'MMM',
  hours12Format: 'hh',
  hours24Format: 'HH',
  meridiemFormat: 'A',
  minutesFormat: 'mm',
  minutesInterval: 1,
  secondsFormat: 'ss',
  secondsInterval: 1,
  showSeconds: false,
  showTwentyFourHours: false,
  timeSeparator: ':',
  multipleYearsNavigateBy: 10,
  showMultipleYearsNavigation: false,
  locale: moment.locale(),
  hideInputContainer: false,
  returnedValueType: ECalendarValue.String,
  unSelectOnClick: true,
  hideOnOutsideClick: true,
  numOfMonthRows: 3
};

@Component({
  selector: 'app-language-task-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.less']
})
export class DetailsComponent implements OnInit {

  name: string;
  instruction: string;
  control: FormControl;
  config: IDatePickerConfig = {
    ...DEF_CONF,
    format: 'MM-DD-YYYY'
  };
  task: TaskOutputItems;
  comments: Array<Comment> = [];
  dueDate: moment.Moment;
  taskFormData: TaskInput | any; // formdata when edit or create task
  // createFormData: any; // formdata when create task
  pageType = 0; // enum: 0 - details page, 1 - edit page, 2 - create page
  accountOptions: Array<any> = [
    {
      id: 'All',
      label: 'All'
    },
    {
      id: 'Admin Only',
      label: 'Admin Only'
    },
    {
      id: 'Awesome Client',
      label: 'Awesome Client'
    },
    {
      id: 'Radical Client',
      label: 'Radical Client'
    }
  ];
  assignOptions: Array<any> = [
    {
      id: 'jhon_smith',
      label: 'Jhon Smith'
    },
    {
      id: 'danil_j',
      label: 'Danil J'
    }
  ];

  constructor(
    private readonly store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: DefaultService,
    private languageTaskService: LanguageTasksService
  ) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      const params: LanguageTasksActions.LanguageTasksRequestInterface = {
        language: 'en',
        clientIds: [12],
        contentIds: [taskId]
      };

      this.store.dispatch(LanguageTasksActions.requestLanguageTaskDetails({params}));
      this.store.pipe(select(LanguageTasksSeletor._getLanguageTaskDetails))
        .subscribe((languageTasks: TaskOutput) => {
          const tasks = languageTasks ? languageTasks.items : [];
          if (tasks.length > 0) {
            this.task = tasks.find(item => item.queueItem.contentId == taskId);//tasks[0];
            this.dueDate = moment(this.task.data.dueDate);
            this.getComments(this.task.queueItem.contentId);
          }
        });

      this.pageType = 0;
    } else {
      this.pageType = 2;
      this.taskFormData = {
        clientId: [{
          id: 'All',
          label: 'All'
        }],
        language: ['en'],
        priority: 0,
        data: {
          task: '',
          instructions: '',
          dueDate: moment()
        }
      };
    }
  }

  getComments(contentId): void {
    this.apiService.getComments('task', contentId).subscribe(resp => {
      if (resp) {
        this.comments = resp;
      }
    });
  }

  changeTaskAction(type): void {
    console.log(type);
    this.pageType = type;
    switch (type) {
      case 0:
      case 1:
        this.taskFormData = {
          clientId: this.accountOptions[0],
          language: 'en',
          priority: 0,
          data: {
            assign: this.assignOptions[0],
            task: this.task ? this.task.data.task : '',
            instructions: this.task ? this.task.data.instructions : '',
            dueDate: this.task ? moment(this.task.data.dueDate) : moment()
          }
        };
        break;
      case 2:
        this.router.navigate(['/filter-quality/language-tasks/create']);
        break;
      default:
        break;
    }
  }

  onLanguageChange(lang): void {
    console.log(this.taskFormData.language);
  }

  changeAssign(item): void {
    console.log('assign changed', this.taskFormData);
  }

  changeAccount(item): void {

  }

  onSave(): void {
    if (this.pageType === 1) {
      const formData: TaskInput = {
        clientId: this.taskFormData.clientId.id,
        language: this.taskFormData.language,
        priority: this.taskFormData.priority,
        data: {
          assign: this.taskFormData.data.assign,
          task: this.taskFormData.data.task,
          instructions: this.taskFormData.data.instructions,
          dueDate: moment(this.taskFormData.data.dueDate, 'MM-DD-YYYY').valueOf(),
          additionalProp1: {}
        }
      };
      
      this.apiService.addTaskItems([formData], true).subscribe(resp => {
        if (resp.success) {
          this.pageType = 0;
        }
      });
    }
    if (this.pageType === 2) {
      let reqBody = [];

      this.taskFormData.clientId.map(client => {
        this.taskFormData.language.map(lang => {
          const formData: TaskInput = {
            clientId: client.id,
            language: lang,
            priority: this.taskFormData.priority,
            data: {
              task: this.taskFormData.data.task,
              instructions: this.taskFormData.data.instructions,
              dueDate: moment(this.taskFormData.data.dueDate, 'MM-DD-YYYY').valueOf(),
              additionalProp1: {}
            }
          };

          reqBody.push(formData);
        })
      })

      this.apiService.addTaskItems(reqBody).subscribe(resp => {
        if (resp.success) {
          this.router.navigate(['/filter-quality/language-tasks']);
        }
      });
    }
  }

  onStart(): void {
    const body = {
      moderatorId: 'me'
    };
    this.apiService.updateItemCheckout('task', this.task.queueItem.contentId, body).subscribe(resp => {
      if (resp.success) {
        this.languageTaskService.setCurrentTask(this.task);
      }
    });
  }

  onStop(): void {
    this.apiService.deleteItemCheckout('task', this.task.queueItem.contentId).subscribe(resp => {
      if (resp.success) {
        this.languageTaskService.setCurrentTask(null);
      }
    });
  }
}
