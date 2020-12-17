import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import * as LanguageTasksActions from '../actions/language-tasks.actions';
import { ConstantsService } from 'src/app/services/constants.service';
import { DefaultService } from 'src/app/api';

@Injectable()
export class LanguageTasksEffects {

  getLanguageTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageTasksActions.requestLanguageTasks),
      exhaustMap(action =>
        this.apiService.getTaskItems(
          action.params.language,
          action.params.clientIds,
          action.params.contentIds,
          action.params.notContentIds,
          action.params.endDate,
          action.params.startDate,
          action.params.reviewedEndDate,
          action.params.reviewedEndDate,
          action.params.checkoutAvailable,
          action.params.doneByModeratorId,
          action.params.assignedToModeratorId,
          action.params.limit,
          action.params.offset,
          action.params.sortBy,
          action.params.tags,
          action.params.text,
          action.params.unresolvedComments
        ).pipe(
          map(response => {
            return LanguageTasksActions.successLanguageTasks({ languageTasks: response });
          }),
          catchError(error => of(LanguageTasksActions.failedLanguageTasks({ languageTasks: error })))
        )
      )
    )
  );

  getLanguageTaskDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageTasksActions.requestLanguageTaskDetails),
      exhaustMap(action =>
        this.apiService.getTaskItems(action.params.language, null, action.params.contentIds).pipe(
          map(response => LanguageTasksActions.successLanguageTaskDetails({ languageTaskDetails: response })),
          catchError(error => of(LanguageTasksActions.failedLanguageTaskDetails({ languageTaskDetails: error })))
        )
      )
    )
  );

  createLanguageTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageTasksActions.requestLanguageTaskCreate),
      exhaustMap(action =>
        this.apiService.addTaskItems(action.params.body, action.params.updateData, action.params.extraHttpRequestParams).pipe(
          map(response => LanguageTasksActions.successLanguageTaskCreate({ resp: response })),
          catchError(error => of(LanguageTasksActions.failedLanguageTaskCreate({ resp: error })))
        )
      )
    )
  );

  // editLanguageTask$ = createEffect(() =>
    // this.actions$.pipe(
    //   ofType(LanguageTasksActions.requestLanguageTaskEdit),
    //   exhaustMap(action =>
    //     this.apiService.editTaskItems(action.params.body, action.params.updateData, action.params.extraHttpRequestParams).pipe(
    //       map(response => LanguageTasksActions.successLanguageTaskEdit({ resp: response })),
    //       catchError(error => of(LanguageTasksActions.failedLanguageTaskEdit({ resp: error })))
    //     )
    //   )
    // )
  // );

  // startLanguageTask$ = createEffect(() => 
  //   this.actions$.pipe(
  //     ofType(LanguageTasksActions.requestLanguageTaskStart),
  //     exhaustMap(action =>
  //       this.apiService.updateItemCheckout(action.params.queueId, action.params.contentId, action.params.body).pipe(
  //         map(response => LanguageTasksActions.successLanguageTaskStart({ resp: response })),
  //         catchError(error => of(LanguageTasksActions.failedLanguageTaskStart({ resp: error })))
  //       )
  //     )
  //   )
  // );

  // stopLanguageTask$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(LanguageTasksActions.requestLanguageTaskStop),
  //     exhaustMap(action =>
  //       this.apiService.deleteItemCheckout(action.params.queueId, action.params.contentId).pipe(
  //         map(response => LanguageTasksActions.successLanguageTaskStop({ resp: response })),
  //         catchError(error => of(LanguageTasksActions.failedLanguageTaskStop({ resp: error })))
  //       )
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions,
    private apiService: DefaultService
  ) { }
}