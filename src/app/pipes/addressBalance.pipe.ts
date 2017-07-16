import { Pipe, PipeTransform } from '@angular/core';
import { Address, TxDir } from '../models';

@Pipe({ name: 'addressBalance' })
export class AddressBalancePipe implements PipeTransform {
  transform(address: Address, args: string[]): string {
    return (address.records && address.records.length > 0 ? address.records.map(r => {
      return r.direction === TxDir.txIn ? r.amount
        : r.direction === TxDir.txOut ? (-1 * r.amount)
          : r.direction === TxDir.txNone ? 0 // todo: ghost balance
            : 0;
    }).reduce((sum: number, amount: number) => {
      return Number(sum) + Number(amount);
    }) : 0).toFixed(8);
  }
}
