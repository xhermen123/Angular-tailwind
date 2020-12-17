import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/shared-components/user.service';
import { User } from 'src/app/shared-components/user';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(public userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.me();
  }

  onUserChangedClient(newClient: number) {
    if (newClient === this.userService.preferences.lastClientId) return;
    // TODO #codereview This smells bad.
    // Oughtn't I be able to write this as this.UserService.preferences.language = newLanguage?
    const prefs = this.userService.preferences;
    prefs.lastClientId = newClient;
    this.userService.preferences = prefs;

    /*
    TODO: Instead of reloading the page, we could have the user service
    emit an event that other components can subscribe to and then refresh
    their data as needed.

    This could be a use case for NgRx. As it stands, we are only updating
    the client in this one location, so it's easier to debug. However, any
    component could inject the UserService and change the preferences as well.
    If the UserService then emitted an event that other components subscribed
    to, then it could quickly become difficult to pinpoint where the change
    that triggered the event happened, and cause painful debugging moments.
    */
    window.location.reload();
  }

  onUserChangedLanguage(newLanguage: string) {
    if (newLanguage === this.userService.preferences.language) return;

    // TODO #codereview This smells bad.
    // Oughtn't I be able to write this as this.UserService.preferences.language = newLanguage?
    const prefs = this.userService.preferences;
    prefs.language = newLanguage;
    this.userService.preferences = prefs;

    window.location.reload();
  }
}
