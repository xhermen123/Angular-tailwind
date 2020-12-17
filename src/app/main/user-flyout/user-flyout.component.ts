import { Component, OnInit } from '@angular/core';

import { User } from '../../shared-components/user';
import { UserService } from '../../shared-components/user.service';

@Component({
  selector: 'main-user-flyout',
  templateUrl: './user-flyout.component.html',
  styleUrls: ['./user-flyout.component.less'],
})
export class UserFlyoutComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.currentUser = await this.userService.me();
  }
}
