import { TopicChipVerifyResult } from '../topic-chip/topic-chip';
import { QueueItem, QueueItemFromAPI, Topic } from '../interfaces';

export class Example {
  data: ExampleSearchResponseData;
  queueItem: QueueItem;

  static fromAPI(item: ExampleFromAPI): Example {
    return {
      data: item.data,
      queueItem: {
        ...item.queueItem,
        topics: Topic.fromTopicSet(item.queueItem.topics),
        originalTopics: item.queueItem.topics,
      },
    };
  }
}

export interface ExampleFromAPI {
  data: ExampleSearchResponseData;
  queueItem: QueueItemFromAPI;
}

export interface GetExamples {
  total: number;
  items: Example[];
}

export interface ExampleSearchResponse {
  total: number;
  items: ExampleFromAPI[];
}

export interface ExampleSearchResponseData {
  text: string;
}

export interface ExampleVerifiedEvent {
  id: string;
  decision: TopicChipVerifyResult;
}
