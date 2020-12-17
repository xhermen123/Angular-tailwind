import {SingleCalendarValue} from '../common/types/single-calendar-value';

export interface IAppDayPickerApi {
  open: () => void;
  close: () => void;
  moveCalendarTo: (date: SingleCalendarValue) => void;
}
