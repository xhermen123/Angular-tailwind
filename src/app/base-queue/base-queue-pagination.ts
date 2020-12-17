import { SessionStorageService } from '../shared/services/storage/session-storage.service';

export class BaseQueuePagination {
  private reviewedIds: string[];

  constructor(
    private readonly clientId: number,
    private readonly languageCode: string,
    private readonly queueName: string,
    private readonly storageService: SessionStorageService
  ) {
    this.reviewedIds = this.getStoredIds();
  }

  get amountCompleted(): number {
    return this.reviewedIds.length;
  }

  get firstReviewedId(): string {
    if (this.reviewedIds.length) {
      return this.reviewedIds[0];
    }
  }

  get lastReviewedId(): string {
    if (this.reviewedIds.length) {
      return this.reviewedIds[this.reviewedIds.length - 1];
    }
  }

  addPage(page: string[]) {
    page.forEach((id) => {
      if (!this.reviewedIds.includes(id)) {
        this.reviewedIds.push(id);
      }
    });
    this.saveReviewedIds();
  }

  getIds({
    limit,
    beforeId,
    afterId,
    reverse = false,
  }: {
    limit: number;
    beforeId?: string;
    afterId?: string;
    reverse?: boolean;
  }): string[] {
    if (afterId != null) {
      const afterIndex = this.reviewedIds.indexOf(afterId);
      if (afterIndex > -1) {
        return this.reviewedIds.slice(afterIndex + 1, afterIndex + 1 + limit);
      }
    } else if (beforeId != null) {
      const beforeIndex = beforeId ? this.reviewedIds.indexOf(beforeId) : -1;
      if (beforeIndex > -1) {
        return this.reviewedIds.slice(
          Math.max(beforeIndex - limit, 0),
          beforeIndex
        );
      }
    } else {
      if (reverse) {
        return this.reviewedIds.slice(-limit);
      } else {
        return this.reviewedIds.slice(0, limit);
      }
    }

    return [];
  }

  private get queueNamespace(): string {
    return `queue-${this.queueName}-${this.clientId}-${this.languageCode}-`;
  }

  private getStoredIds(): string[] {
    return (
      this.storageService.getItem(this.queueNamespace + 'reviewedIds') || []
    );
  }

  private saveReviewedIds() {
    this.storageService.setItem(
      this.queueNamespace + 'reviewedIds',
      this.reviewedIds
    );
  }
}
