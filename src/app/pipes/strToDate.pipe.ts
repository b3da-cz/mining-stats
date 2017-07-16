import { Pipe, PipeTransform } from '@angular/core';
import { TimeUtil } from '../utils';

@Pipe({ name: 'strToDate' })
export class StrToDatePipe implements PipeTransform {
  transform(value: any, args: string[]): Date {
    let result: Date = null;
    try {
      result = TimeUtil.getLocalDateForPipe(value);
    } catch (e) {
      result = TimeUtil.getLocalDateForPipe(null);
      console.warn('StrToDatePipe::error', e); // TODO: remove
    }
    return result;
  }
}
