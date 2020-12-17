import { QueueLabelGroup } from './queue-label-group.interface';

export interface GetQueueInfoApiResponse {
  name: string;
  filters: string[];
  queueId: string;
  schema: any;
  params: [];
  tags: {
    contentType: {
      name: string;
      description: string;
      value: string;
    }[];
    labelGroups: QueueLabelGroup[];
  };
}
