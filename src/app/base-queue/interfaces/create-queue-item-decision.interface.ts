import {
  TopicSet,
  QueueItemExtras,
} from 'src/app/shared-components/interfaces';

export interface CreateQueueItemDecision {
  correctTopics: TopicSet;
  extras?: QueueItemExtras;
  moderatorId?: string;
  reviewedTopics: TopicSet;
  seconds: number;
  tags: string[];
  tagsRemoved: string[];
  timestamp: number;
}
