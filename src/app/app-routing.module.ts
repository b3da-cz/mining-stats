import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AddressesView,
  CoinsView,
  DashboardView,
  RigsView,
  SettingsView
} from './views';


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardView },
  { path: 'addresses', component: AddressesView },
  { path: 'addresses/:address', component: AddressesView },
  { path: 'coins', component: CoinsView },
  { path: 'rigs', component: RigsView },
  { path: 'settings', component: SettingsView },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
