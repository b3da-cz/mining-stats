import { Pipe, PipeTransform } from '@angular/core';
import { TxDir } from '../models';

@Pipe({name: 'txDir'})
export class TxDirPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case TxDir.txNone:
        return 'none';
      case TxDir.txIn:
        return 'in';
      case TxDir.txOut:
        return 'out';
    }
  }
}
