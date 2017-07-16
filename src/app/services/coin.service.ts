import { Injectable } from '@angular/core';

import { StoreService } from '../services';
import { Coin } from '../models';
import { TimeUtil } from '../utils';

@Injectable()
export class CoinService {
  store: StoreService;
  isUserAlerted = false;
  // constructor(public store: StoreService) {} // rxjs subject problem? todo resolve (missing arg on compile time)

  setStore(store: StoreService): void {
    this.store = store;
  }

  addOrUpdateCoin(coin: Coin): Array<Coin> {
    const coins = this.store && this.store.state && this.store.state.coins && this.store.state.coins.length > 0 ? this.store.state.coins : [];
    let exists = false;
    coins.forEach((c: Coin, i: number) => {
      if (c.symbol === coin.symbol) {
        exists = true;
        coins[i] = coin;
      }
    });
    if (!exists) {
      coins.push(coin);
    }
    this.store.setState({ coins: coins });
    return coins.sort(this.sortCoins);
  }

  deleteCoin(coin: Coin): Array<Coin> {
    const coins = this.store && this.store.state && this.store.state.coins && this.store.state.coins.length > 0 ? this.store.state.coins : [];
    coins.forEach((c: Coin, i: number) => {
      if (c.symbol === coin.symbol) {
        coins.splice(i, 1);
      }
    });
    this.store.setState({ coins: coins });
    return coins.sort(this.sortCoins);
  }

  getCoins(): Array<Coin> {
    return this.store && this.store.state && this.store.state.coins && this.store.state.coins.length > 0
      ? this.store.state.coins.map(c => new Coin(c)).sort(this.sortCoins)
      : [];
  }

  getCoinBySymbol(symbol: string): Coin {
    return this.store && this.store.state && this.store.state.coins && this.store.state.coins.length > 0
      ? new Coin(this.store.state.coins.filter(c => c.symbol === symbol)[0])
      : null;
  }

  fillBtcRateForAllCoins(): Promise<any> {
    return new Promise(resolve => {
      this.isUserAlerted = false;
      const coins = this.getCoins();
      const promises = [];
      coins
        .filter(c => c.btcRateUrl && c.btcRateUrl.length > 0)
        .forEach(c => {
        promises.push(
          new Promise(res => this.fillBtcRate(c, true)
            .then(o => res(o))
            .catch(e => console.warn(e))
          )
        );
      });
      Promise.all(promises).then(() => {
        resolve(true);
      })
    }).catch(e => console.warn('fillBtcRateForAllCoins Promise.all error: ', e));
  }

  fillBtcRate(coin: Coin, isBatchFill = false): Promise<number> {
    if (!isBatchFill) {
      this.isUserAlerted = false;
    }
    const c = this.getCoinBySymbol(coin.symbol);
    return fetch(c.btcRateUrl).then(raw => {
      return raw.json();
    }).then((res: any) => {
      const rate = Number(res && res.result && res.result.Last ? res.result.Last : 0);
      c.btcRate = rate;
      c.btcRateUpdated = TimeUtil.timestampNow;
      this.addOrUpdateCoin(c);
      return rate;
    }).catch(e => {
      console.warn('fillBtcRate error: ', e);
      if (!this.isUserAlerted) {
        alert('enable CORS :)');
        this.isUserAlerted = true;
      }
    });
  }

  private sortCoins(a: Coin, b: Coin): number {
    if (a.symbol > b.symbol) { return 1 }
    if (a.symbol < b.symbol) { return -1 }
    if (a.symbol === b.symbol) {
      if (a.name > b.name) { return 1 }
      if (a.name < b.name) { return -1 }
      if (a.name === b.name) { return 0 }
    }
  }
}
