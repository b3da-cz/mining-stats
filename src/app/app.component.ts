import { Component } from '@angular/core';
import {
  AddressService,
  CoinService,
  RigService,
  StoreService
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    public addressService: AddressService,
    public coinService: CoinService,
    public rigService: RigService,
    public store: StoreService
  ) {
    window['DEBUG'] = {
      basic: false,
      events: false,
      store: false,
    };
    window['MS_LOCAL_STORE'] = true;
    if (window['DEBUG'] && window['DEBUG'].basic) { console.log('app: using local storage for data store\napp: root component mounted') }
    // rxjs subject problem? todo resolve (missing arg on compile time)
    this.addressService.setStore(this.store);
    this.coinService.setStore(this.store);
    this.rigService.setStore(this.store);
  }
}
