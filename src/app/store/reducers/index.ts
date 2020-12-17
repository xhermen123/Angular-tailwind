import { ActionReducerMap } from '@ngrx/store';
import { reducer as diagnoseReducer } from './diagnose.reducers';
import { reducer as languageTasksReducer } from './language-tasks.reducers';

export interface IAppState {
    diagnosePageData: any;
    languageTasksData: any;
}

export const reducers: ActionReducerMap<IAppState> = {
    diagnosePageData: diagnoseReducer,
    languageTasksData: languageTasksReducer
};