import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comboBoxFilter',
})
export class ComboBoxFilterPipe implements PipeTransform {
  transform(value: Array<any>, keys: string, keyword: string): Array<any> {
    value = value || [];
    keyword = keyword || '';

    return value.filter((item) =>
      keys
        .split(',')
        .some(
          (key) =>
            item[key] &&
            String(item[key]).toLowerCase().includes(keyword.toLowerCase())
        )
    );
  }
}
