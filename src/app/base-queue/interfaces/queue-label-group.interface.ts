export interface QueueLabelGroup {
  ifTag?: string;
  defaultValue?: string | string[];
  multiple: boolean;
  options: QueueLabelGroupOption[];
}

export interface QueueLabelGroupOption {
  name: string;
  value: string;
  description?: string;
}
