import {
  TopicSet,
  Topic,
  QueueItem,
  QueueItemFromAPI,
} from '../../shared-components/interfaces';

// TODO: CODEREVIEW: This should be autogenerated from open API
export class AuditRulesItem {
  data: AuditRulesItemData;
  queueItem: QueueItem;

  static fromAPI(item: AuditRulesItemFromAPI): AuditRulesItem {
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

export interface AuditRulesItemFromAPI {
  data: AuditRulesItemData;
  queueItem: QueueItemFromAPI;
}

export interface AuditRulesItemData {
  contentType: 'RECENT_RULE' | 'FIX THIS';
  onCount: number;
  text: string;
}

export interface CheckinRuleResponse {
  id: string;
  success: boolean;
}

export interface ClassifyTextResponse {
  risk: number;
  topics: TopicSet;
}

export interface DecisionRequest {
  moderatorId: string;
  seconds: number;
  tags: string[];
  tagsRemoved: string[];
  timestamp: number;
  topics: Topic[];
}

export interface GetAuditRules {
  items: AuditRulesItem[];
  total: number;
}

export interface GetAuditRulesResponse {
  items: AuditRulesItemFromAPI[];
  total: number;
}

export interface RuleAuditDecision {
  moderatorId: string;
  seconds: number;
  tags: string[];
  tagsRemoved: string[];
  timestamp: number;
  correctTopics: TopicSet;
  reviewedTopics: TopicSet;
}
