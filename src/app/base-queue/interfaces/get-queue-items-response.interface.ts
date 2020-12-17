import { AuditQueueItem } from './audit-queue-item.interface';

export interface GetQueueItemsResponse<T = any> {
  total: number;
  items: AuditQueueItem<T>[];
}
