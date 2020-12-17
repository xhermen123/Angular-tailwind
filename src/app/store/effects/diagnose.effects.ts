import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as DiagnoseActions from '../actions/diagnose.actions';
import { ConstantsService } from 'src/app/services/constants.service';

@Injectable()
export class DiagnoseEffects {

  getProcessedText$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiagnoseActions.requestProcessText),
      exhaustMap(action =>
        this.apiService.processTextData(action.data, true).pipe(
          map(response => {
            const filteredData = this.filterProcessedData(response);
            return DiagnoseActions.successProcessText({ processedData: filteredData });
          }),
          catchError(error => of(DiagnoseActions.failedProcessText({ processedData: error })))
        )
      )
    )
  );

  getPolicyGuides$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiagnoseActions.requestGetPolicyGuides),
      exhaustMap(action =>
        this.apiService.getPolicyGuides().pipe(
          map(response => DiagnoseActions.successGetPolicyGuides({ policyGuides: response })),
          catchError(error => of(DiagnoseActions.failedGetPolicyGuides({ policyGuides: error })))
        )
      )
    )
  );

  private topicTypes: any = {};
  private riskGrades: any[] = [];

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private constantsService: ConstantsService
  ) {
    this.topicTypes = this.constantsService.topicTypes;
    this.riskGrades = this.constantsService.riskGrades;
  }

  private filterProcessedData(data) {
    const returnData: any = {
      filteredTextArray: [],
      predictions: [],
      topics: [],
      failingFragments: [],
      text: data.text
    };

    if (data.failingFragments) {
      data.failingFragments.map((x, index)=> {
        const failingData = {
          ...x,
          originalText: data.text.substring(x.startPos, x.endPos),
          topics: []
        }

        Object.keys(x.topics).map((key, id) => {
          failingData.topics.push({
            id: key,
            value: x.topics[key],
            color: this.riskGrades[x.topics[key]].color,
            icon: this.topicTypes[key].icon,
            name: this.topicTypes[key].name
          });
        });

        returnData.failingFragments.push(failingData);
      })
    }

    if (data.extended) {
      const filteredTextData: any = {};

      data.extended.map((token, index) => {
        if (filteredTextData[token.solution]) {
          filteredTextData[token.solution].originals.push(token.original);
          filteredTextData[token.solution].originalText += ' ' + token.original;
          token.tokens.map(x => {
            let isDuplicated = false;

            filteredTextData[token.solution].tokens.map(y => {
              if (x.text === y.text) {
                isDuplicated = true;
              }
            });

            if (!isDuplicated && x.text !== token.solution) {
              const tempTopics = [];
              Object.keys(x.topics).map(tp => {
                tempTopics.push({
                  id: tp,
                  value: x.topics[tp],
                  color: this.riskGrades[x.topics[tp]].color,
                  icon: this.topicTypes[tp].icon,
                  name: this.topicTypes[tp].name
                })
              });

              x.topics = tempTopics;

              filteredTextData[token.solution].tokens.push(x);
            }
          });
        } else {
          filteredTextData[token.solution] = {
            solution: token.solution,
            originals: [token.original],
            originalText: token.original,
            topics: [],
            tokens: [],
            solutionToken: {}
          };

          token.tokens.map(x => {
            const tempTopics = [];
            Object.keys(x.topics).map(tp => {
              tempTopics.push({
                id: tp,
                value: x.topics[tp],
                color: this.riskGrades[x.topics[tp]].color,
                icon: this.topicTypes[tp].icon,
                name: this.topicTypes[tp].name
              })
            });

            x.topics = tempTopics;

            if (x.text !== token.solution) {
              filteredTextData[token.solution].tokens.push(x);
            } else {
              filteredTextData[token.solution].solutionToken = x;
            }
          });
        }

        filteredTextData[token.solution].topics = filteredTextData[token.solution].solutionToken.topics;
      });

      returnData.filteredTextArray = Object.values(filteredTextData);
    }

    Object.keys(data.predictions).map((x) => {
      returnData.predictions.push({
        id: x,
        value: Math.round(data.predictions[x] * 100)
      });
    });

    Object.keys(data.topics).map((x) => {
      returnData.topics.push({
        id: x,
        value: data.topics[x],
        color: this.riskGrades[data.topics[x]].color,
        icon: this.topicTypes[x].icon,
        name: this.topicTypes[x].name
      })
    });

    return returnData;
  }
}