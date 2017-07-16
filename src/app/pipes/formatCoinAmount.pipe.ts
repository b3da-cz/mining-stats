import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCoinAmount' })
export class FormatCoinAmountPipe implements PipeTransform {
  transform(value: any, args: string[]): string {
    return Number(value).toFixed(8);
  }
}
