import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-calendar-nav',
  templateUrl: './calendar-nav.component.html',
  styleUrls: ['./calendar-nav.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarNavComponent {
  @Input() label: string;
  @Input() isLabelClickable = false;
  @Input() showLeftNav = true;
  @Input() showLeftSecondaryNav = false;
  @Input() showRightNav = true;
  @Input() showRightSecondaryNav = false;
  @Input() leftNavDisabled = false;
  @Input() leftSecondaryNavDisabled = false;
  @Input() rightNavDisabled = false;
  @Input() rightSecondaryNavDisabled = false;
  @Input() showGoToCurrent = true;
  @HostBinding('class') @Input() theme: string;

  @Output() onLeftNav: EventEmitter<null> = new EventEmitter();
  @Output() onLeftSecondaryNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightNav: EventEmitter<null> = new EventEmitter();
  @Output() onRightSecondaryNav: EventEmitter<null> = new EventEmitter();
  @Output() onLabelClick: EventEmitter<null> = new EventEmitter();
  @Output() onGoToCurrent: EventEmitter<null> = new EventEmitter();

  leftNavClicked() {
    this.onLeftNav.emit();
  }

  leftSecondaryNavClicked() {
    this.onLeftSecondaryNav.emit();
  }

  rightNavClicked() {
    this.onRightNav.emit();
  }

  rightSecondaryNavClicked() {
    this.onRightSecondaryNav.emit();
  }

  labelClicked() {
    this.onLabelClick.emit();
  }
}
