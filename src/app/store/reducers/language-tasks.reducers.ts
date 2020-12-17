import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as LanguageTasksActions from '../actions/language-tasks.actions';
import { IAppState } from '.';
import { TaskOutput, TaskOutputItems } from 'src/app/api';

export interface State {
    languageTasks: TaskOutput;
    languageTaskDetails: TaskOutput;
    currentTask: TaskOutputItems
}

export const initialState: State = {
  languageTasks: null,
  languageTaskDetails: null,
  currentTask: null
};

const languageTasksReducer = createReducer(
  initialState,
  on(LanguageTasksActions.successLanguageTasks, (state, { languageTasks }) => ({ ...state, languageTasks })),
  on(LanguageTasksActions.failedLanguageTasks, state => ({ ...state })),
  on(LanguageTasksActions.successLanguageTaskDetails, (state, { languageTaskDetails }) => ({ ...state, languageTaskDetails })),
  on(LanguageTasksActions.failedLanguageTaskDetails, state => ({ ...state })),
  // on(LanguageTasksActions.successLanguageTaskStart, (state, { resp }) => ({ ...state, currentTask: resp}))
);

export function reducer(state: State | undefined, action: Action) {
  return languageTasksReducer(state, action);
}

// language tasks selectors
export const getLanguageTasksData = (state: IAppState) => state.languageTasksData;

export const _getLanguageTasks = createSelector(getLanguageTasksData, (languageTasksData) => {
  return languageTasksData ? languageTasksData.languageTasks : [];
});

export const _getLanguageTaskDetails = createSelector(getLanguageTasksData, (languageTasksData) => {
  return languageTasksData ? languageTasksData.languageTasks : [];
});
