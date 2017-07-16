import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Select2Module } from 'ng2-select2';
import { ModalModule, TabsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import {
  BtnComponent,
  FormRowCheckboxComponent,
  FormRowInputComponent,
  FormRowSelectComponent,
  FormRowSelectMultipleComponent,
  FormRowTextareaComponent,
  InfoTooltipComponent
} from './components/common';

import {
  ChartComponent,
  ModalRecordComponent,
  TopNavigationComponent
} from './components';

import {
  AddressesView,
  CoinsView,
  RigsView,
  DashboardView,
  SettingsView
} from './views';

import {
  AddressBalancePipe,
  FormatCoinAmountPipe,
  Nl2brPipe,
  StrToDatePipe,
  TranslationPipe,
  TxDirPipe
} from './pipes';

import {
  AddressService,
  CoinService,
  RigService,
  StoreService
} from './services';


@NgModule({
  declarations: [
    // common components
    BtnComponent,
    FormRowCheckboxComponent,
    FormRowInputComponent,
    FormRowSelectComponent,
    FormRowSelectMultipleComponent,
    FormRowTextareaComponent,
    InfoTooltipComponent,

    // components
    AppComponent,
    ChartComponent,
    ModalRecordComponent,
    TopNavigationComponent,

    // pipes
    AddressBalancePipe,
    FormatCoinAmountPipe,
    Nl2brPipe,
    StrToDatePipe,
    TranslationPipe,
    TxDirPipe,

    // directives

    // views
    AddressesView,
    CoinsView,
    DashboardView,
    RigsView,
    SettingsView,
  ],
  imports: [
    // Ng modules
    BrowserModule,
    FormsModule,
    HttpModule,
    Select2Module,
    ModalModule.forRoot(),
    TabsModule.forRoot(),

    // routing
    AppRoutingModule,
  ],
  providers: [
    AddressService,
    CoinService,
    RigService,
    StoreService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
