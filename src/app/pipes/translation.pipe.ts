import { Pipe, PipeTransform } from '@angular/core';
import { TranslationUtil } from '../utils';

@Pipe({name: 'trans'})
export class TranslationPipe implements PipeTransform {
  transform(value: string, language?: string): string {
    const debug = false;
    return TranslationUtil.translate(value, language || null, debug);
  }
}
