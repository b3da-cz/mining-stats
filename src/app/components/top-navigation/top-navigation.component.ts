import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../services';
import { Rig } from '../../models';
import { TranslationUtil } from '../../utils';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.css'],
})
export class TopNavigationComponent implements OnInit {
  rigs: Rig[] = [];
  activeRoute = '';
  languages: any[] = [];
  language = 'cs';
  loading = false;
  constructor(
    private store: StoreService,
    private router: Router,
  ) {
    this.router.events.subscribe((e: any) => {
      this.activeRoute = e && e.url && e.url.length > 0 ? e.url : '';
    });
  }

  ngOnInit() {
    this.languages = TranslationUtil.languages.map(l => { return { code: l } });
    this.language = TranslationUtil.getSelectedLanguage();
    this.loadRigs();
    this.subscribeForRigsUpdate();
  }

  loadRigs(): void {
    if (this.store.state && this.store.state.rigs && this.store.state.rigs.length > 0) {
      this.rigs = this.store.state.rigs.map(r => new Rig(r));
    }
  }

  subscribeForRigsUpdate(): void {
    // this.store.changeEmmiter.subscribe(s => {
    //   console.warn('top nav state up', s); // TODO: remove
    // });
  }

  selectLanguage(language: string): void {
    TranslationUtil.selectLanguage(language);
    this.language = language;
    window.location.href = window.location.href.split('#')[0];
  }
}
