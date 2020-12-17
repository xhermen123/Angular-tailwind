import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Sentry from '@sentry/browser';

import { User, UserPreferences } from './user';
import { DefaultLanguage, DefaultClient } from 'src/constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  defaultPrefs: UserPreferences = {
    language: DefaultLanguage,
    lastClientId: DefaultClient,
  };

  defaultUser: User = {
    moderatorId: 'user@example.com',
    displayName: 'DEFAULT USER',
    email: 'user@example.com',
    emails: [{ value: 'user@example.com', verified: false }],
    id: 'user@example.com',
    name: { familyName: 'User', givenName: 'Default' },
    photos: [],
    provider: 'NONE',
    config: {
      allowedLanguages: ['en'],
      allowedClients: [60],
    },
  };

  user: User;

  private _preferences: UserPreferences;

  constructor(private http: HttpClient) {}

  async me(): Promise<User> {
    // If we already have a user, don't get it again
    if (this.user) return this.user;

    try {
      this.user = await this.http.get<User>('/me').toPromise();

      // Set the user in Sentry
      Sentry.setUser({
        email: this.user && this.user.email,
        name: this.user && this.user.displayName,
      });
    } catch (error) {
      // If we failed to get a user, return a default one.
      if (error.status === 404) this.user = this.defaultUser;

      // Unset the Sentry user
      Sentry.setUser(null);
    }

    return this.user;
  }

  isAdmin(): boolean {
    return true;
  }

  get preferences(): UserPreferences {
    // Use in-memory prefs first
    if (this._preferences) return this._preferences;

    // Try getting prefs from LocalStorage
    if ('localStorage' in window) {
      const savedPrefs: string = window.localStorage.getItem('prefs');
      if (savedPrefs) {
        try {
          this._preferences = JSON.parse(savedPrefs);
          return this._preferences;
        } catch (error) {
          Sentry.addBreadcrumb({
            category: 'user',
            message: 'Tried loading user prefs from LocalStorage',
            level: Sentry.Severity.Error,
          });
          Sentry.captureException(error);
          console.error(error);
        }
      }
    }

    // Fail back to default prefs
    return this.defaultPrefs;
  }

  set preferences(value: UserPreferences) {
    // Save to memory
    this._preferences = value;

    // Serialize and save to LocalStorage
    if ('localStorage' in window) {
      try {
        // Serialize and save the prefs to LocalStorage
        // TODO: #scooter - Persist these with the user's prefs on the server
        const savedPrefs = JSON.stringify(value);
        window.localStorage.setItem('prefs', savedPrefs);
      } catch (error) {
        Sentry.addBreadcrumb({
          category: 'user',
          message: 'Tried saving user prefs to LocalStorage',
          level: Sentry.Severity.Error,
        });
        Sentry.captureException(error);
        console.error(error);
      }
    }
  }
}
