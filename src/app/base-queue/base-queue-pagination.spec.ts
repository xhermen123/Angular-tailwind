import { BaseQueuePagination } from './base-queue-pagination';
import { SessionStorageService } from '../shared/services/storage/session-storage.service';
jest.mock('../shared/services/storage/session-storage.service');

const CLIENT_60 = 60;
const LANGUAGE_EN = 'en';

describe('BaseQueuePagination', () => {
  let sessionService: SessionStorageService;
  let setItemMock: jest.Mock<void, [string, any]>;
  let getItemMock: jest.Mock<any, [string]>;

  beforeEach(() => {
    sessionService = new SessionStorageService();
    setItemMock = sessionService.setItem as jest.Mock<void, [string, any]>;
    getItemMock = sessionService.getItem as jest.Mock<any, [string]>;
  });

  describe('#constructor', () => {
    it('should get the reviewed Ids from session storage', () => {
      const queueName = 'test';
      const storedIds = ['a', 'b', 'c'];

      getItemMock.mockImplementationOnce(() => {
        return storedIds;
      });

      const pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        queueName,
        sessionService
      );
      expect(getItemMock).toHaveBeenCalledTimes(1);
      expect(getItemMock).toHaveBeenCalledWith(
        `queue-${queueName}-${CLIENT_60}-${LANGUAGE_EN}-reviewedIds`
      );

      expect(pagination.getIds({ limit: 10 })).toEqual(storedIds);
    });
  });

  describe('#addPage', () => {
    it('should update the IDs saved in session storage', () => {
      const pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        'test',
        sessionService
      );
      pagination.addPage(['a', 'b', 'c']);

      expect(setItemMock).toHaveBeenCalledTimes(1);
      expect(setItemMock).toHaveBeenCalledWith('queue-test-60-en-reviewedIds', [
        'a',
        'b',
        'c',
      ]);
    });

    it('should not add duplicates', () => {
      const pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        'test',
        sessionService
      );
      pagination.addPage(['a', 'b', 'c']);

      expect(setItemMock).toHaveBeenCalledTimes(1);
      expect(setItemMock).toHaveBeenCalledWith('queue-test-60-en-reviewedIds', [
        'a',
        'b',
        'c',
      ]);

      pagination.addPage(['b', 'c', 'd', 'e', 'a', 'f']);
      expect(setItemMock).toHaveBeenCalledTimes(2);
      expect(
        setItemMock
      ).toHaveBeenLastCalledWith('queue-test-60-en-reviewedIds', [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ]);
    });
  });

  describe('#getIds', () => {
    let pagination: BaseQueuePagination;
    const reviewedIds = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    beforeEach(() => {
      pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        'test',
        sessionService
      );
      pagination.addPage(reviewedIds);
    });

    it.each([
      [1, null, ['a']],
      [3, 'c', ['d', 'e', 'f']],
      [6, 'd', ['e', 'f', 'g', 'h']],
      [5, 'h', []],
      [1, 'no match', []],
    ])('returns the first %i items after %s', (limit, afterId, expected) => {
      expect(pagination.getIds({ limit, afterId })).toEqual(expected);
    });

    it.each([
      [1, null, ['a']],
      [3, 'c', ['a', 'b']],
      [6, 'd', ['a', 'b', 'c']],
      [5, 'h', ['c', 'd', 'e', 'f', 'g']],
      [5, 'a', []],
      [1, 'no match', []],
    ])('returns the first %i items before %s', (limit, beforeId, expected) => {
      expect(pagination.getIds({ limit, beforeId })).toEqual(expected);
    });

    it('returns the last items when reverse is true', () => {
      expect(pagination.getIds({ limit: 3, reverse: true })).toEqual([
        'f',
        'g',
        'h',
      ]);
    });
  });

  describe('#amountCompleted', () => {
    it('should be the total number of unique IDs added', () => {
      const pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        'test',
        sessionService
      );
      expect(pagination.amountCompleted).toBe<number>(0);

      pagination.addPage(['a', 'b', 'c']);
      expect(pagination.amountCompleted).toBe<number>(3);

      pagination.addPage(['a', 'b', 'c']);
      expect(pagination.amountCompleted).toBe<number>(3);

      pagination.addPage(['d', 'e']);
      expect(pagination.amountCompleted).toBe<number>(5);

      pagination.addPage(['a', 'd', 'e', 'f', 'g']);
      expect(pagination.amountCompleted).toBe<number>(7);
    });
  });

  describe('#firstReviewedId', () => {
    it('should be the ID of the first item added', () => {
      const pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        'test',
        sessionService
      );
      expect(pagination.firstReviewedId == null).toBe(true);

      pagination.addPage(['a', 'b', 'c']);
      expect(pagination.firstReviewedId).toBe('a');

      pagination.addPage(['a', 'b', 'c']);
      expect(pagination.firstReviewedId).toBe('a');

      pagination.addPage(['d', 'e']);
      expect(pagination.firstReviewedId).toBe('a');

      pagination.addPage(['a', 'd', 'e', 'f', 'g']);
      expect(pagination.firstReviewedId).toBe('a');
    });
  });

  describe('#lastReviewedId', () => {
    it('should be the ID of the last item added', () => {
      const pagination = new BaseQueuePagination(
        CLIENT_60,
        LANGUAGE_EN,
        'test',
        sessionService
      );
      expect(pagination.lastReviewedId == null).toBe(true);

      pagination.addPage(['a', 'b', 'c']);
      expect(pagination.lastReviewedId).toBe('c');

      pagination.addPage(['a', 'b']);
      expect(pagination.lastReviewedId).toBe('c');

      pagination.addPage(['d', 'e']);
      expect(pagination.lastReviewedId).toBe('e');

      pagination.addPage(['a', 'd', 'e', 'f', 'g']);
      expect(pagination.lastReviewedId).toBe('g');
    });
  });
});
