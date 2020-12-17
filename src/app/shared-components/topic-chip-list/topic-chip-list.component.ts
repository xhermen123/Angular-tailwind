import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic } from '../interfaces';
import { Topics as TopicsList } from 'src/constants';

const sortedTopicsList = Object.keys(TopicsList)
  .filter((key) => key !== '0')
  // Sort alphabetically with custom at the end
  .sort((prev, curr) => {
    const prevName = TopicsList[prev].name.toUpperCase();
    const currName = TopicsList[curr].name.toUpperCase();
    const isCustomRe = /^CUSTOM\d$/;

    if (isCustomRe.test(prevName) && !isCustomRe.test(currName)) {
      return 1;
    } else if (!isCustomRe.test(prevName) && isCustomRe.test(currName)) {
      return -1;
    }

    if (currName < prevName) {
      return 1;
    } else if (currName > prevName) {
      return -1;
    } else {
      return 0;
    }
  })
  .map((key: string) => {
    const topic: Topic = new Topic(parseInt(key, 10), 4);
    return {
      id: topic.id,
      name: topic.name,
      icon: topic.icon,
    };
  });

@Component({
  selector: 'mod-topic-chip-list',
  templateUrl: './topic-chip-list.component.html',
})
export class TopicChipListComponent {
  private _topics: Topic[];

  @Input() readOnly = false;
  @Input() minimized = false;
  @Input()
  set topics(topics: Topic[]) {
    this._topics = topics;
  }
  get topics() {
    return this._topics;
  }

  // Bubble up child events to our parent
  @Output() removed = new EventEmitter<Topic>();
  @Output() riskChanged = new EventEmitter<Topic>();

  get generalTopic() {
    if (this.topics.length && this.topics[0].id === 0) {
      return this.topics[0];
    }
  }

  get additionalTopics() {
    if (this.generalTopic) return this.topics.slice(1);
    else return this.topics;
  }

  get currentTopicIds() {
    return this._topics.map((topic) => topic.id);
  }

  get topicsList() {
    return sortedTopicsList.map((topic) => {
      return {
        ...topic,
        checked: this.currentTopicIds.includes(topic.id),
      };
    });
  }

  onTopicChanged(topicId: number, checked: boolean) {
    if (checked) {
      this.topics.push(new Topic(topicId, 4));
    } else {
      const topic = this.topics.find(({ id }) => id === topicId);
      this.onRemoved(topic);
    }
  }

  onRemoved(topic: Topic) {
    this.removed.emit(topic);
  }

  /**
   * Fired when the user selects a new risk level for a given topic
   * @param topic The topic risk change event
   */
  async onRiskChanged(topic: Topic) {
    this.riskChanged.emit(topic);
  }
}
