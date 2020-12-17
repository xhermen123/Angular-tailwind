export interface Filters {
  accountType?: string;
  countLimit?: number[];
  createdEndDate?: string;
  createdStartDate?: string;
  maxAI?: number;
  minAI?: number;
  reviewedBy?: string;
  reviewedEndDate?: string;
  reviewedStartDate?: string;
  status?: string;
}

export interface FixSpellingItem {
  onCount: number;
  text: string;
}
