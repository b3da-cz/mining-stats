import { Injectable } from '@angular/core';

import { StoreService } from '../services';
import { Rig } from '../models';

@Injectable()
export class RigService {
  store: StoreService;
  // constructor(public store: StoreService) {} // rxjs subject problem? todo resolve (missing arg on compile time)

  setStore(store: StoreService): void {
    this.store = store;
  }

  addOrUpdateRig(rig: Rig): Array<Rig> {
    const rigs = this.store && this.store.state && this.store.state.rigs && this.store.state.rigs.length > 0 ? this.store.state.rigs : [];
    let exists = false;
    rigs.forEach((r: Rig, i: number) => {
      if (r.id === rig.id) {
        exists = true;
        rigs[i] = rig;
      }
    });
    if (!exists) {
      rigs.push(rig);
    }
    this.store.setState({ rigs: rigs });
    return rigs.sort(this.sortRigs);
  }

  deleteRig(rig: Rig): Array<Rig> {
    const rigs = this.store && this.store.state && this.store.state.rigs && this.store.state.rigs.length > 0 ? this.store.state.rigs : [];
    rigs.forEach((r: Rig, i: number) => {
      if (r.id === rig.id) {
        rigs.splice(i, 1);
      }
    });
    this.store.setState({ rigs: rigs });
    return rigs.sort(this.sortRigs);
  }

  getRigs(): Array<Rig> {
    return this.store && this.store.state && this.store.state.rigs && this.store.state.rigs.length > 0
      ? this.store.state.rigs.map(r => new Rig(r)).sort(this.sortRigs)
      : [];
  }

  getRigById(id: string): Rig {
    return this.store && this.store.state && this.store.state.rigs && this.store.state.rigs.length > 0
      ? new Rig(this.store.state.rigs.filter(r => r.id === id)[0])
      : null;
  }

  private sortRigs(a: Rig, b: Rig): number {
    if (a.name > b.name) { return 1 }
    if (a.name < b.name) { return -1 }
    if (a.name === b.name) { return 0 }
  }
}
