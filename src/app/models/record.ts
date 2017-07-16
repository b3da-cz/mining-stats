import { TxDir } from '../models';
import { TimeUtil, UuidUtil } from '../utils';

export class Record {
  id: string;
  direction: TxDir;
  amount: number;
  btcRate: number;
  btcAmount: number;
  time: number;
  note: string;
  constructor(data: any = {}) {
    this.id = data.id ? data.id : UuidUtil.generate();
    this.direction = data.direction ? data.direction : TxDir.txIn;
    this.amount = data.amount ? Number(data.amount) : 0;
    this.btcRate = data.btcRate ? Number(data.btcRate) : 0;
    this.btcAmount = data.btcAmount ? Number(data.btcAmount) : 0;
    this.time = data.time ? data.time : TimeUtil.timestampNow;
    this.note = data.note ? data.note : '';
  }
}
