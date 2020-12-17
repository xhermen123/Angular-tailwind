export interface GetQueueItemsOptions {
  checkout?: boolean;
  clientIds?: number[];
  language?: string;
  offset?: number;
  limit?: number;
  text?: string;
  contentIds?: string[];
  notContentIds?: string[];
  checkoutAvailable?: boolean;
  sortBy?: 'FIFO' | 'Recent' | 'Priority' | 'AI';
}
