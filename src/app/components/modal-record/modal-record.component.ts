import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Coin, Record, TxDir } from '../../models';
import { CoinService } from '../../services';
import { TimeUtil } from '../../utils';

@Component({
  selector: 'app-modal-record',
  templateUrl: './modal-record.component.html',
  styleUrls: ['./modal-record.component.css'],
})
export class ModalRecordComponent implements OnInit {
  @ViewChild('recordModal') public recordModal: ModalDirective;
  @Input() record: Record;
  @Input() coin: Coin;
  @Input() isCreatingNew = false;
  @Input() isEditMode = false;
  @Input() isModalLarge = false;
  @Output() onCreate: EventEmitter<Record> = new EventEmitter();
  @Output() onDelete: EventEmitter<Record> = new EventEmitter();
  directions = [
    // { id: TxDir.txNone, name: 'none' },
    { id: TxDir.txIn, name: 'in' },
    { id: TxDir.txOut, name: 'out' },
  ];
  dateTimeString: string;
  constructor(private coinService: CoinService) {}

  ngOnInit() {}

  showChildModal(): void {
    if (this.isCreatingNew && !this.record) {
      this.record = new Record();
    } else if (this.isCreatingNew && this.record) {
      this.record.time = TimeUtil.timestampNow;
    }
    this.dateTimeString = TimeUtil.convertTimestampForInputElement(this.record.time);
    this.recordModal.show();
  }

  hideChildModal(): void {
    this.recordModal.hide();
  }

  create(): void {
    this.record.amount = Number(this.record.amount);
    this.record.btcRate = Number(this.record.btcRate);
    this.record.btcAmount = Number(this.record.btcAmount);
    this.onCreate.emit(this.record);
    this.record = new Record();
    this.hideChildModal();
  }

  deleteRec(): void {
    if (confirm('Opravdu smazat záznam ?')) {
      this.onDelete.emit(this.record);
      this.record = new Record();
      this.hideChildModal();
    }
  }

  changeDirection(direction: string): void {
    this.record.direction = Number(direction);
  }

  changeTime(time: string): void {
    this.record.time = TimeUtil.getLocalTimestamp(time);
  }

  fillBtcRate(): void {
    if (this.coin && this.coin.btcRateUrl && this.coin.btcRateUrl.length > 0) {
      this.coinService.fillBtcRate(this.coin).then(res => {
        this.record.btcRate = res;
        this.fillBtcAmount();
      });
    }
  }

  fillBtcAmount(): void {
    if (this.record && this.record.btcRate) {
      this.record.btcAmount = Number((this.record.btcRate * this.record.amount).toFixed(8));
    }
  }

  switchEditMode(): void {
    this.isEditMode = !this.isEditMode;
    this.isModalLarge = this.isEditMode;
  }
}
