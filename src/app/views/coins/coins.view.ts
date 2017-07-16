import { Component } from '@angular/core';
import {
  Address,
  Coin,
  TxDir
} from '../../models';
import {
  AddressService,
  CoinService
} from '../../services';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.view.html',
  styleUrls: ['./coins.view.css']
})
export class CoinsView {
  addresses: Address[];
  coins: Coin[];
  selectedCoin: Coin;
  isEditMode = false;
  constructor(
    public addressService: AddressService,
    public coinService: CoinService
  ) {
    this.coins = this.coinService.getCoins();
    if (this.coins.length === 0) { this.isEditMode = true }
    const selectedCoinSymbol = window.localStorage.getItem('mining-stats-selected-coin');
    if (selectedCoinSymbol && selectedCoinSymbol.length > 0) {
      this.selectedCoin = this.coinService.getCoinBySymbol(selectedCoinSymbol) || new Coin();
      this.getAddressesForSelection();
    } else {
      this.selectedCoin = new Coin();
    }
  }

  createNew(): void {
    this.selectedCoin = new Coin();
  }

  submitCoin(): void {
    this.coins = this.coinService.addOrUpdateCoin(this.selectedCoin);
    this.createNew();
    this.isEditMode = false;
  }

  deleteCoin(coin: Coin): void {
    if (coin) {
      if (confirm('Opravdu smazat ' + coin.name + ' ?')) {
        this.coins = this.coinService.deleteCoin(coin);
        this.selectedCoin = new Coin();
      }
      return;
    }
    if (confirm('Opravdu smazat ' + this.selectedCoin.name + ' ?')) {
      this.coins = this.coinService.deleteCoin(this.selectedCoin);
      this.selectedCoin = new Coin();
    }
  }

  getAddressesForSelection(): void {
    if (!this.selectedCoin || (this.selectedCoin && (!this.selectedCoin.symbol || (this.selectedCoin.symbol && this.selectedCoin.symbol.length < 1)))) { return }
    this.addresses = this.addressService.getAddressesByCoin(this.selectedCoin.symbol);
    window.localStorage.setItem('mining-stats-selected-coin', this.selectedCoin.symbol)
  }

  getCoinBalanceSum(): string {
    if (this.addresses && this.addresses.length > 0) {
      return this.addresses.map(a => {
        return a.records && a.records.length > 0 ? a.records.map(r => {
          return r.direction === TxDir.txIn ? r.amount
            : r.direction === TxDir.txOut ? (-1 * r.amount)
              : r.direction === TxDir.txNone ? 0 // todo: ghost balance
                : 0;
        }).reduce((sum, amount) => {
          return Number(sum) + Number(amount);
        }) : 0;
      }).reduce((sum, amount) => {
        return Number(sum) + Number(amount);
      }).toFixed(8);
    }
    return (0).toFixed(8);
  }

  fillBtcRateForAllCoins(): void {
    this.coinService.fillBtcRateForAllCoins().then(() => {
      this.coins = this.coinService.getCoins();
      this.selectedCoin = this.coinService.getCoinBySymbol(this.selectedCoin.symbol);
    });
  }

  fillBtcRateUrl(): void {
    this.selectedCoin.fillBtcRateUrlBittrex();
  }
}
