import { Component, EventEmitter, Output } from '@angular/core';

interface SubMenuItem {
  label: string;
  href?: string;
}

interface TopMenuItem extends SubMenuItem {
  icon: string;
  subMenuItems: SubMenuItem[];
}

@Component({
  selector: 'main-sub-navigation',
  templateUrl: './sub-navigation.component.html',
})
export class SubNavigationComponent {
  @Output() collapse = new EventEmitter<void>();

  readonly menuItems: TopMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'mdi-home',
      href: '/',
      subMenuItems: [],
    },
    {
      label: 'Policy Guides',
      icon: 'mdi-book-variant',
      subMenuItems: [],
    },
    {
      label: 'Filter Quality',
      icon: 'mdi-air-filter',
      href: '/filter-quality',
      subMenuItems: [
        {
          label: 'Audit Examples',
          href: '/filter-quality/audit-examples',
        },
        {
          label: 'Audit Rules',
          href: '/filter-quality/audit-rules',
        },
        {
          label: 'Audit Usernames',
          href: '/filter-quality/audit-usernames',
        },
      ],
    },
    {
      label: 'User Reputation',
      icon: 'mdi-account-check',
      subMenuItems: [],
    },
    {
      label: 'Reported Content',
      icon: 'mdi-flag',
      subMenuItems: [],
    },
    {
      label: 'Transparency Reports',
      icon: 'mdi-chart-line',
      subMenuItems: [],
    },
  ];

  onCollapseButtonClicked() {
    this.collapse.emit();
  }
}
