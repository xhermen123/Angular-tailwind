import { Topics } from 'src/constants';
import { CreateQueueItemDecision } from '../base-queue/interfaces/create-queue-item-decision.interface';

/**
 * Condensed set of topic/risk pairs
 * @example { 0: 1, 2: 3 }
 */
export interface TopicSet {
  [topicId: string]: number;
}

export interface Language {
  language: string;
  detected?: object;
}

export interface QueueItemCheckout {
  expires: number;
  moderatorId: string;
}

export interface QueueItemBase {
  checkout?: QueueItemCheckout;
  clientId: number;
  comments: any[];
  contentId: string;
  dateCreated: number;
  decisions: CreateQueueItemDecision[];
  extras?: QueueItemExtras;
  language: Language;
  prediction?: object[];
  priority: number;
  pseudonymizedDate?: number;
  redacted: any;
  reviewsNeeded: number;
  simplified: string;
  tags?: string[];
}

export interface QueueItemFromAPI extends QueueItemBase {
  topics: TopicSet;
}

export interface QueueItem extends QueueItemBase {
  originalTopics?: TopicSet;
  topics: Topic[];
}

export interface QueueItemExtras {
  altSenses?: string[];
  altSpellings?: string[];
}

export interface DetailedTag {
  tag: string;
  value: any;
}

export interface Rule {
  altSenses: string[];
  altSpellings: string[];
  clientId: number;
  enabled: boolean;
  flags: string[];
  language: string;
  text: string;
  topics: TopicSet;
}

/**
 * A simple topic/risk pair
 */
export class Topic {
  risk: number;
  id: number;
  verification?: string;

  constructor(id, risk, verification?) {
    this.id = id;
    this.risk = risk;
    this.verification = verification;
  }

  static fromTopicSet(topicSet: TopicSet, verification?) {
    if (!topicSet) return [];

    return Object.entries(topicSet).map(
      (topicPair) =>
        new Topic(parseInt(topicPair[0], 10), topicPair[1], verification)
    );
  }

  static toTopicSet(topics: Topic[]) {
    // TODO: when Object.fromEntries is fully in the spec, use it here.
    const topicSet = {};

    topics.forEach((topic) => {
      topicSet[topic.id] = topic.risk;
    });

    return topicSet;
  }

  get icon() {
    if (this.id === undefined) return 'help-box';
    const topic = Topics[this.id.toString()];
    if (!topic?.icon) return `help-box`;
    if (topic.icon === 'numeric-${risk}-box') return `numeric-${this.risk}-box`;
    return topic.icon;
  }

  get name() {
    if (this.id === undefined) return '(No Topic ID)';
    const topic = Topics[this.id.toString()];
    if (!topic?.name) return `(Invalid Topic: ${this.id})`;
    return topic.name;
  }
}
