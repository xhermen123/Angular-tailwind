export interface QueueConfig {

  /* The queue's name */
  name: string;

  /* Available filter options. An empty list hides the filter button. */
  filters?: string[];

  /* The queue is always in review mode */
  reviewModeOnly?: boolean;

}