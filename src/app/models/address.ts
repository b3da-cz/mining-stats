import { Record, TxDir } from '../models';
import { UuidUtil } from '../utils';

export class Address {
  id: string;
  name: string;
  address: string;
  note: string;
  coinSymbol: string;
  rigId: string;
  records: Record[];
  constructor(data: any = {}) {
    this.id = data.id ? data.id : UuidUtil.generate();
    this.name = data.name ? data.name : '';
    this.address = data.address ? data.address : '';
    this.note = data.note ? data.note : '';
    this.coinSymbol = data.coinSymbol ? data.coinSymbol : null;
    this.rigId = data.rigId ? data.rigId : null;
    this.records = data.records && data.records.length > 0 ? data.records.map(r => new Record(r)) : [];
  }

  get balance(): number {
    // don't use in templates, use `addressBalance` pipe instead
    return this.records && this.records.length > 0 ? this.records.map(r => {
      return r.direction === TxDir.txIn ? r.amount
        : r.direction === TxDir.txOut ? (-1 * r.amount)
          : r.direction === TxDir.txNone ? 0 // todo: ghost balance
            : 0;
    }).reduce((sum: number, amount: number) => {
      return Number(sum) + Number(amount);
    }) : 0;
  }
}
