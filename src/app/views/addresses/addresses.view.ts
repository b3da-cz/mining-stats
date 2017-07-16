import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Address,
  ChartData,
  Coin,
  Record,
  Rig
} from '../../models';
import {
  AddressService,
  CoinService,
  RigService
} from '../../services';
import { TimeUtil } from '../../utils';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.view.html',
  styleUrls: ['./addresses.view.css']
})
export class AddressesView {
  addresses: Address[];
  coins: Coin[];
  rigs: Rig[];
  selectedAddress: Address;
  chartData: ChartData;
  isEditMode = false;
  constructor(
    public addressService: AddressService,
    public coinService: CoinService,
    public rigService: RigService,
    public route: ActivatedRoute
  ) {
    this.addresses = this.addressService.getAddresses();
    if (this.addresses.length === 0) { this.isEditMode = true }
    this.coins = this.coinService.getCoins();
    this.rigs = this.rigService.getRigs();
    this.route.params.forEach(params => {
      const address = params['address'];
      if (address && address.length > 0) {
        this.selectAddress(this.addressService.getAddressByAddress(address));
      } else {
        const selectedAddressAddress = window.localStorage.getItem('mining-stats-selected-address');
        if (selectedAddressAddress && selectedAddressAddress.length > 0) {
          this.selectedAddress = this.addressService.getAddressByAddress(selectedAddressAddress) || new Address();
          this.getChartData();
        } else {
          this.selectedAddress = new Address();
        }
      }
    });
  }

  createNew(): void {
    this.selectedAddress = new Address();
  }

  submitAddress(): void {
    this.addresses = this.addressService.addOrUpdateAddress(this.selectedAddress);
    this.createNew();
    this.isEditMode = false;
  }

  deleteAddress(address: Address): void {
    if (address) {
      if (confirm('Opravdu smazat ' + address.name + ' ?')) {
        this.addresses = this.addressService.deleteAddress(address);
        this.selectedAddress = new Address();
      }
      return;
    }
    if (confirm('Opravdu smazat ' + this.selectedAddress.name + ' a spojené záznamy?')) {
      this.addresses = this.addressService.deleteAddress(this.selectedAddress);
      this.selectedAddress = new Address();
    }
  }

  selectAddress(address: Address): void {
    this.selectedAddress = address;
    window.localStorage.setItem('mining-stats-selected-address', this.selectedAddress.address);
    this.getChartData();
  }

  get selectedAddressCoin(): Coin {
    if (!this.selectedAddress || (this.selectedAddress && !this.selectedAddress.coinSymbol)) { return null }
    return this.coinService.getCoinBySymbol(this.selectedAddress.coinSymbol);
  }

  get selectedAddressRig(): Rig {
    if (!this.selectedAddress || (this.selectedAddress && !this.selectedAddress.rigId)) { return null }
    return this.rigService.getRigById(this.selectedAddress.rigId);
  }

  addRecord(record: Record): void {
    this.addresses = this.addressService.addOrUpdateAddressRecord(this.selectedAddress, record);
    this.selectedAddress = this.addressService.getAddressById(this.selectedAddress.id);
    this.getChartData();
  }

  deleteRecord(record: Record): void {
    this.addresses = this.addressService.deleteAddressRecord(this.selectedAddress, record);
    this.selectedAddress = this.addressService.getAddressById(this.selectedAddress.id);
    this.getChartData();
  }

  getChartData(): void {
    if (!this.selectedAddress.records || (this.selectedAddress.records && this.selectedAddress.records.length < 1)) {
      this.chartData = null;
      return;
    }
    const data = [];
    const recordsReversed = [...this.selectedAddress.records];
    recordsReversed.reverse();
    let lastAmount = 0;
    recordsReversed.forEach(r => {
      lastAmount += Number(r.amount * (r.direction === 2 ? -1 : r.direction === 1 ? 1 : 0));
      data.push(lastAmount);
    });
    this.chartData = {
      // name: this.selectedAddress.name,
      name: 'progress',
      // color: '#979B9E',
      color: '#375a7f',
      unit: this.selectedAddress.coinSymbol.toUpperCase(),
      labels: recordsReversed.map(r => new Date(TimeUtil.getLocalDateForPipe(r.time)).toISOString()),
      data: data,
    };
  }
}
