import { createAction, props } from '@ngrx/store';

export const requestProcessText = createAction('[Diagnose Page] Requset Process Text', props<{data: any}>());
export const successProcessText = createAction('[Diagnose Page] Success Process Text', props<{processedData: any}>());
export const failedProcessText = createAction('[Diagnose Page] Failed Process Text', props<{processedData: any}>());
export const requestGetPolicyGuides = createAction('[Diagnose Page] Request Policy Guides');
export const successGetPolicyGuides = createAction('[Diagnose Page] Success Policy Guides', props<{policyGuides: any}>());
export const failedGetPolicyGuides = createAction('[Diagnose Page] Failed Policy Guides', props<{policyGuides: any}>());
