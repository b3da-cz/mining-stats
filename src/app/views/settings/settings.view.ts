import { Component, OnInit } from '@angular/core';
import * as crypto from 'crypto-browserify';
import { StoreService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.view.html',
  styleUrls: ['./settings.view.css']
})
export class SettingsView implements OnInit {
  urlBackup: string;
  urlRestore: string;
  cloudAuthData = { user: '', password: '' };
  passphase: string;
  resultMsg: string;
  constructor(public store: StoreService) {}

  ngOnInit() {
    this.loadViewSetting();
    this.prepareAppDataDownload();
  }

  loadViewSetting(): void {
    const settings = JSON.parse(window.localStorage.getItem('mining-stats-settings')) || null;
    if (settings) {
      this.urlBackup = settings.urlBackup;
      this.urlRestore = settings.urlRestore;
      this.cloudAuthData = settings.cloudAuthData;
      this.passphase = settings.passphase;
    }
  }

  saveViewSetting(): void {
    window.localStorage.setItem('mining-stats-settings', JSON.stringify({
      urlBackup: this.urlBackup,
      urlRestore: this.urlRestore,
      cloudAuthData: this.cloudAuthData,
      passphase: this.passphase,
    }));
    this.resultMsg = 'settings.saved';
    setTimeout(() => this.resultMsg = '', 3000);
  }

  prepareAppDataDownload(): void {
    const data = JSON.stringify(this.store.state);
    const a: any = document.getElementById('download-anchor');
    const file = new Blob([data], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'mining-stats-data-export-' + new Date().getTime() + '.backup';
  }

  uploadAppData(event: any): void {
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsText(new Blob([event.target.files[0]]));
      reader.onload = (evt) => {
        let data = evt.target['result'];
        try {
          data = JSON.parse(data);
        } catch (e) {
          data = null;
          alert('Došlo k chybě při zpracování souboru');
          console.warn('file upload error: ', e);
        }
        if (data && confirm('Opravdu přepsat aktuální data importovanými?')) {
          this.store.setState(data);
        }
      };
      reader.onerror = function (e) {
        alert('Došlo k chybě při zpracování souboru');
        console.warn('file upload error: ', e);
      }
    }
  }

  cloudBackup(): Promise<any> {
    return fetch(this.urlBackup, {
      method: 'post',
      headers: {
        'Authorization': this.cloudAuth,
        'Content-Type': 'application/json',
      },
      body: this.cipher(),
    }).then(raw => {
      return raw.json();
    }).then((res: any) => {
      if (res && res.status === 'ok') {
        this.resultMsg = 'cloud.backup.success';
      } else {
        this.resultMsg = 'cloud.backup.failed';
      }
      setTimeout(() => this.resultMsg = '', 3000);
    }).catch(e => {
      console.warn('cloudBackup error: ', e);
    });
  }

  cloudRestore(): Promise<any> {
    return fetch(this.urlRestore, {
      method: 'get',
      headers: {
        'Authorization': this.cloudAuth,
        'Content-Type': 'application/json',
      },
    }).then(raw => {
      return raw.json();
    }).then((res: any) => {
      if (res && res.data && res.data.data) {
        const data = this.decipher(res.data.data);
        if (data && confirm('Opravdu přepsat aktuální data staženými?')) {
          this.store.setState(data);
        }
      }
    }).catch(e => {
      console.warn('cloudRestore error: ', e);
    });
  }

  private get cloudAuth(): string {
    return 'Basic ' + btoa(this.cloudAuthData.user + ':' + this.cloudAuthData.password);
  }

  private cipher(): string {
    if (!this.passphase || (this.passphase && this.passphase.length < 1)) {
      alert('Nastav heslo!');
      return;
    }
    const appData = JSON.stringify(this.store.state);
    const cipher = crypto.createCipher('aes192', this.passphase);
    let encrypted = cipher.update(appData, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return JSON.stringify({
      time: new Date().getTime(),
      data: encrypted,
    });
  }

  private decipher(encrypted: string) {
    if (!this.passphase || (this.passphase && this.passphase.length < 1)) {
      alert('Nastav heslo!');
      return;
    }
    const decipher = crypto.createDecipher('aes192', this.passphase);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
  }
}
