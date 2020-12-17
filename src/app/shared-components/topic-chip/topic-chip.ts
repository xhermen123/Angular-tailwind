import { Topic } from '../interfaces';

export enum TopicChipVerificationState {
  Incorrect = 'WRONG.FIX_TOPICS',
  Correct = 'CORRECT',
  DefaultCorrect = 'default-CORRECT',
  DefaultIncorrect = 'default-WRONG.FIX_TOPICS',
}

export interface TopicChipVerifyResult {
  topic: Topic;
  result: string;
}
