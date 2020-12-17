import { Injectable } from '@angular/core';
import { BaseStorageService } from './base-storage.service';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService extends BaseStorageService {
  constructor() {
    super(window.sessionStorage);
  }
}
