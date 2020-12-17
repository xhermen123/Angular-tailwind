import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dueDate',
  pure: false
})
export class DueDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value === 'number') {
      const dueDate = moment(value);

      const diff = moment.duration(dueDate.diff(moment()));
      const diffInYear = diff.asYears();
      const diffInMonth = diff.asMonths();
      const diffInWeek = diff.asWeeks();
      const diffInDay = diff.asDays();

      if (Math.abs(diffInYear) >= 1) {
        return dueDate.format('MMM DD, YYYY');
      } else {
        if (Math.abs(diffInMonth) >= 1) {
          if (Math.floor(Math.abs(diffInMonth)) === 1) {
            return Math.floor(Math.abs(diffInMonth)) + ' Month' + (diffInMonth < 0 ? ' Ago' : '');
          } else {
            return Math.floor(Math.abs(diffInMonth)) + ' Months' + (diffInMonth < 0 ? ' Ago' : '');
          }
        } else if (Math.abs(diffInWeek) >= 1) {
          if (Math.floor(Math.abs(diffInWeek)) === 1) {
            return Math.floor(Math.abs(diffInWeek)) + ' Week' + (diffInWeek < 0 ? ' Ago' : '');
          } else {
            return Math.floor(Math.abs(diffInWeek)) + ' Weeks' + (diffInWeek < 0 ? ' Ago' : '');
          }
        } else {
          if (Math.floor(Math.abs(diffInDay)) === 1) {
            return Math.floor(Math.abs(diffInDay)) + ' Day' + (diffInDay < 0 ? ' Ago' : '');
          } else {
            return Math.floor(Math.abs(diffInDay)) + ' Days' + (diffInDay < 0 ? ' Ago' : '');
          }
        }
      }
    }

    return 'Invalid';
  }

}
