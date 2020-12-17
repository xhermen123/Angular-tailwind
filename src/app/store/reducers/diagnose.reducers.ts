import { Action, createReducer, on, createSelector } from '@ngrx/store';
import * as DiagnosePageActions from '../actions/diagnose.actions';
import { IAppState } from '.';

export interface State {
  processedData: any;
  policyGuides: any;
}

export const initialState: State = {
  processedData: {},
  policyGuides: [],
};

const diagnoseReducer = createReducer(
  initialState,
  // on(DiagnosePageActions.requestProcessText, state => ({ ...state })),
  on(DiagnosePageActions.successProcessText, (state, { processedData }) => ({ ...state, processedData })),
  on(DiagnosePageActions.failedProcessText, state => ({ ...state })),
  // on(DiagnosePageActions.requestGetPolicyGuides, state => ({ ...state })),
  on(DiagnosePageActions.successGetPolicyGuides, (state, { policyGuides }) => ({ ...state, policyGuides })),
  on(DiagnosePageActions.failedGetPolicyGuides, state => ({ ...state })),
);

export function reducer(state: State | undefined, action: Action) {
  return diagnoseReducer(state, action);
}

// diagnose selectors
export const getDiagnosePageData = (state: IAppState) => state.diagnosePageData;

export const _getProcessedData = createSelector(getDiagnosePageData, (diagnosePageData) => {
  return diagnosePageData.processedData;
});

export const _getPolicyGuides = createSelector(getDiagnosePageData, (diagnosePageData) => {
  return diagnosePageData.policyGuides;
});