import { QueueItemFromAPI } from '../../shared-components/interfaces';

export interface GetQueueItemsAPIResponse<T> {
  total: number;
  items: {
    data: T;
    queueItem: QueueItemFromAPI;
  }[];
}
