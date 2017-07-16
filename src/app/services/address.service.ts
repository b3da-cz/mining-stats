import { Injectable } from '@angular/core';

import { StoreService } from '../services';
import { Address, Record } from '../models';

@Injectable()
export class AddressService {
  store: StoreService;
  // constructor(public store: StoreService) {} // rxjs subject problem? todo resolve (missing arg on compile time)

  setStore(store: StoreService): void {
    this.store = store;
  }

  addOrUpdateAddress(address: Address): Array<Address> {
    const addresses = this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0 ? this.store.state.addresses.map(a => new Address(a)) : [];
    let exists = false;
    addresses.forEach((a: Address, i: number) => {
      if (a.address === address.address) {
        exists = true;
        addresses[i] = address;
      }
    });
    if (!exists) {
      addresses.push(address);
    }
    this.store.setState({ addresses: addresses });
    return addresses.sort(this.sortAddresses);
  }

  deleteAddress(address: Address): Array<Address> {
    const addresses = this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0 ? this.store.state.addresses.map(a => new Address(a)) : [];
    addresses.forEach((a: Address, i: number) => {
      if (a.address === address.address) {
        addresses.splice(i, 1);
      }
    });
    this.store.setState({ addresses: addresses });
    return addresses.sort(this.sortAddresses);
  }

  getAddresses(): Array<Address> {
    return this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0
      ? this.store.state.addresses.map(a => new Address(a)).sort(this.sortAddresses)
      : [];
  }

  getAddressById(id: string): Address {
    return this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0
      ? new Address(this.store.state.addresses.filter(a => a.id === id)[0])
      : null;
  }

  getAddressByAddress(address: string): Address {
    return this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0
      ? new Address(this.store.state.addresses.filter(a => a.address === address)[0])
      : null;
  }

  getAddressesByCoin(symbol: string): Array<Address> {
    return this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0
      ? this.store.state.addresses.filter(a => a.coinSymbol === symbol).map(a => new Address(a)).sort(this.sortAddresses)
      : [];
  }

  getAddressesByRig(id: string): Array<Address> {
    return this.store && this.store.state && this.store.state.addresses && this.store.state.addresses.length > 0
      ? this.store.state.addresses.filter(a => a.rigId === id).map(a => new Address(a)).sort(this.sortAddresses)
      : [];
  }

  addOrUpdateAddressRecord(address: Address, record: Record): Array<Address> {
    const a = this.getAddressById(address.id);
    let exists = false;
    a.records.forEach((r: Record, i: number) => {
      if (r.id === record.id) {
        exists = true;
        a.records[i] = record;
      }
    });
    if (!exists) {
      a.records.push(record);
    }
    a.records.sort(this.sortRecords);
    return this.addOrUpdateAddress(a);
  }

  deleteAddressRecord(address: Address, record: Record): Array<Address> {
    const a = this.getAddressById(address.id);
    a.records.forEach((r: Record, i: number) => {
      if (r.id === record.id) {
        a.records.splice(i, 1);
      }
    });
    a.records.sort(this.sortRecords);
    return this.addOrUpdateAddress(a);
  }

  private sortAddresses(a: Address, b: Address): number {
    if (a.coinSymbol > b.coinSymbol) { return 1 }
    if (a.coinSymbol < b.coinSymbol) { return -1 }
    if (a.coinSymbol === b.coinSymbol) {
      if (a.name > b.name) { return 1 }
      if (a.name < b.name) { return -1 }
      if (a.name === b.name) { return 0 }
    }
  }

  private sortRecords(a: Record, b: Record): number {
    if (a.time > b.time) { return -1 }
    if (a.time < b.time) { return 1 }
    if (a.time === b.time) { return 0 }
  }
}
