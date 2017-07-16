import { Component } from '@angular/core';
import {
  Address,
  Coin,
  Rig,
  TxDir
} from '../../models';
import {
  AddressService,
  CoinService,
  RigService
} from '../../services';

@Component({
  selector: 'app-rigs',
  templateUrl: './rigs.view.html',
  styleUrls: ['./rigs.view.css']
})
export class RigsView {
  addresses: Address[];
  rigs: Rig[];
  selectedRig: Rig;
  isEditMode = false;
  constructor(
    public addressService: AddressService,
    public coinService: CoinService,
    public rigService: RigService
  ) {
    this.rigs = this.rigService.getRigs();
    if (this.rigs.length === 0) { this.isEditMode = true }
    const selectedRigId = window.localStorage.getItem('mining-stats-selected-rig');
    if (selectedRigId && selectedRigId.length > 0) {
      this.selectedRig = this.rigService.getRigById(selectedRigId) || new Rig();
      this.getAddressesForSelection();
    } else {
      this.selectedRig = new Rig();
    }
  }

  createNew(): void {
    this.selectedRig = new Rig();
  }

  submitRig(): void {
    this.rigs = this.rigService.addOrUpdateRig(this.selectedRig);
    this.createNew();
    this.isEditMode = false;
  }

  deleteRig(rig: Rig): void {
    if (rig) {
      if (confirm('Opravdu smazat ' + rig.name + ' ?')) {
        this.rigs = this.rigService.deleteRig(rig);
        this.selectedRig = new Rig();
      }
      return;
    }
    if (confirm('Opravdu smazat ' + this.selectedRig.name + ' ?')) {
      this.rigs = this.rigService.deleteRig(this.selectedRig);
      this.selectedRig = new Rig();
    }
  }

  getAddressesForSelection(): void {
    if (!this.selectedRig || (this.selectedRig && (!this.selectedRig.id || (this.selectedRig.id && this.selectedRig.id.length < 1)))) { return }
    this.addresses = this.addressService.getAddressesByRig(this.selectedRig.id);
    window.localStorage.setItem('mining-stats-selected-rig', this.selectedRig.id)
  }

  getRigBalanceSum(withNewestBtcRate = false): string {
    if (this.addresses && this.addresses.length > 0) {
      let coins = [];
      if (withNewestBtcRate) { coins = this.getCoins() }
      return this.addresses.map(a => {
        return a.records && a.records.length > 0 ? a.records.map(r => {
          return r.direction === TxDir.txIn
            ? (withNewestBtcRate ? (r.amount * coins.filter(cr => cr.symbol === a.coinSymbol)[0].btcRate) : (r.amount * r.btcRate))
            : r.direction === TxDir.txOut ? (-1 * r.amount * r.btcRate)
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

  getCoins(): Array<Coin> {
    return this.addresses.map(c => this.coinService.getCoinBySymbol(c.coinSymbol));
  }
}
