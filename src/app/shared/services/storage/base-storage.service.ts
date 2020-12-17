export class BaseStorageService {
  constructor(protected readonly storage: Storage) {}

  setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const value = this.storage.getItem(key);
    if (value == null) return null;

    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (error) {
      return value;
    }
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear(): void {
    this.storage.clear();
  }
}
