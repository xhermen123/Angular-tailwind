import { BaseStorageService } from './base-storage.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends BaseStorageService {
  constructor() {
    super(window.localStorage);
  }
}
