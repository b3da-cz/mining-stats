export class Coin {
  name: string;
  symbol: string;
  note: string;
  btcRate: number;
  btcRateUrl: string;
  btcRateUpdated: number;
  constructor(data: any = {}) {
    this.name = data.name ? data.name : '';
    this.symbol = data.symbol ? data.symbol : '';
    this.note = data.note ? data.note : '';
    this.btcRate = data.btcRate ? data.btcRate : 0;
    this.btcRateUrl = data.btcRateUrl ? data.btcRateUrl : '';
    this.btcRateUpdated = data.btcRateUpdated ? data.btcRateUpdated : null;
  }

  fillBtcRateUrlBittrex(): string {
    if (!this.symbol || (this.symbol && this.symbol.length < 1)) { return '' }
    return this.btcRateUrl = 'https://bittrex.com/api/v1.1/public/getticker?market=BTC-' + this.symbol.toUpperCase();
  }
}
