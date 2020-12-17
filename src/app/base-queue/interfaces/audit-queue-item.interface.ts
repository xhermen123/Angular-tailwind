import { QueueItem } from '../../shared-components/interfaces';

export interface AuditQueueItem<T = any> {
  data: T;
  queueItem: QueueItem;
}
