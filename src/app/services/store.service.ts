import { Injectable } from '@angular/core';
// import { ReplaySubject } from 'rxjs/Rx';

import {
  Address,
  Coin,
  Rig
} from '../models';

class Store {
  addresses: Address[];
  coins: Coin[];
  rigs: Rig[];
}

@Injectable()
export class StoreService {
  private s: Store|any;
  // changeEmmiter: ReplaySubject<Store|any> = new ReplaySubject<Store|any>(1);
  constructor() {
    this.s = JSON.parse(window.localStorage.getItem('mining-stats-store')) || {};
  }

  setState(newState: Store|any): Store|any {
    this.s = Object.assign({}, this.s, newState);
    if (window['MS_LOCAL_STORE']) { window.localStorage.setItem('mining-stats-store', JSON.stringify(this.s)) }
    if (window['DEBUG'] && window['DEBUG'].store) { console.log('StoreService::setState ', this.s) }
    this.emitChange();
  }

  get state(): any {
    return this.s;
  }

  emitChange(): void {
    // this.changeEmmiter.next(this.s);
  }
}
