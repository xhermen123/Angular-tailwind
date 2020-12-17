import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TaskOutputItems } from '../api';

@Injectable({
  providedIn: 'root'
})
export class LanguageTasksService {
  private _currentTask: Subject<TaskOutputItems> = new Subject();
  private currentTask: TaskOutputItems;

  constructor() { }

  setCurrentTask(task: TaskOutputItems) {
    this.currentTask = task;
    this._currentTask.next(task);
  }

  getCurrentTask() {
    return this.currentTask;
  }

  subscribeCurrentTask() {
    return this._currentTask.asObservable();
  }
}
