import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.view.html',
  styleUrls: ['./settings.view.css']
})
export class SettingsView implements OnInit {
  constructor(public store: StoreService) {}

  ngOnInit() {
    this.prepareAppDataDownload();
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
}
