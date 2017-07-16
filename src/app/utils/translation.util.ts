import { Translation } from '../models';


export class TranslationUtil {
  static translate(token: string, language?: string, debug: boolean = false): string {
    // if (TranslationUtil.languages.indexOf(language) === -1) {
    //   return 'INVALID LANGUAGE SET';
    // }
    if (!token) {
      return '';
    }
    let trans: Translation;
    if (debug) {
      trans = {
        token: token,
        cs: 'CHYBĚJÍCÍ PŘEKLAD : [' + token + ']',
        en: 'MISSING TRANSLATION : [' + token + ']',
      };
    } else {
      trans = {
        token: token,
        cs: token,
        en: token,
      };
    }
    let exists = false;
    TranslationUtil.translations.forEach((t: Translation) => {
      if (token === t.token) {
        trans = t;
        exists = true;
        return;
      }
    });
    if (!exists) {
      TranslationUtil.addToUntranslatedMessages(trans);
    }
    return trans[TranslationUtil.getSelectedLanguage()];
  }

  static get languages(): Array<string> {
    return [
      'cs',
      'en',
    ];
  }

  static getUntranslatedMessages(): Translation[] {
    const result: Translation[] = [];
    const dataObj: any = JSON.parse(window.localStorage.getItem('mining-stats-untranslated_messages')) || [];
    if (dataObj && dataObj.length > 0) {
      dataObj.forEach(trans => {
        result.push(new Translation(trans));
      });
    }
    return result;
  }

  static setUntranslatedMessages(messages: Translation[]): void {
    window.localStorage.setItem('mining-stats-untranslated_messages', JSON.stringify(messages));
  }

  static addToUntranslatedMessages(message: Translation): boolean {
    const messages: Translation[] = TranslationUtil.getUntranslatedMessages();
    let exists = false;
    messages.forEach((msg: Translation, i: number) => {
      if (msg.token === message.token) {
        exists = true;
      }
    });
    if (!exists) {
      messages.push(message);
      this.setUntranslatedMessages(messages);
      return true;
    }
    return false;
  }

  static getSelectedLanguage(): string {
    return window.localStorage.getItem('mining-stats-language') || TranslationUtil.languages[0];
  }

  static selectLanguage(language: string): void {
    window.localStorage.setItem('mining-stats-language', language);
  }

  static get translations(): Array<Translation> {
    return [
      {
        token: 'welcome',
        cs: 'Vítejte',
        en: 'Welcome'
      },
      {
        token: 'login.msg',
        cs: 'Přihlaste se, prosím',
        en: 'Sign in to start your session'
      },
      {
        token: 'login.username',
        cs: 'Uživatelské jméno',
        en: 'Username'
      },
      {
        token: 'login.password',
        cs: 'Heslo',
        en: 'Password'
      },
      {
        token: 'login.rememberme',
        cs: 'Pamatovat',
        en: 'Remember me'
      },
      {
        token: 'login.loginbtn',
        cs: 'Přihlásit',
        en: 'Sign in'
      },
      {
        token: 'login.error',
        cs: 'Chyba',
        en: 'Error'
      },
      {
        token: 'login.error.msg',
        cs: 'zkontrolujte přihlašovací údaje',
        en: 'check your credentials'
      },
      {
        token: 'activate',
        cs: 'Aktivovat',
        en: 'Activate'
      },
      {
        token: 'logout',
        cs: 'Odhlásit',
        en: 'Logout'
      },
      {
        token: 'dashboard',
        cs: 'Přehled',
        en: 'Dashboard'
      },
      {
        token: 'product.image',
        cs: 'Obrázek',
        en: 'Image'
      },
      {
        token: 'filter',
        cs: 'Filtrovat',
        en: 'Filter'
      },
      {
        token: 'clear',
        cs: 'Vyčistit',
        en: 'Clear'
      },
      {
        token: 'price',
        cs: 'Cena',
        en: 'Price'
      },
      {
        token: 'quantity',
        cs: 'Počet',
        en: 'Quantity'
      },
      {
        token: 'income',
        cs: 'Příjem',
        en: 'Income'
      },
      {
        token: 'expense',
        cs: 'Výdaj',
        en: 'Expense'
      },
      {
        token: 'coupon',
        cs: 'Kupon',
        en: 'Coupon'
      },
      {
        token: 'settlement',
        cs: 'Vyrovnání',
        en: 'Settlement'
      },
      {
        token: 'sell',
        cs: 'Prodej',
        en: 'Sell'
      },
      {
        token: 'takeback',
        cs: 'Vratka',
        en: 'Take back'
      },
      {
        token: 'annulment',
        cs: 'Zrušení',
        en: 'Annulment'
      },
      {
        token: 'cash',
        cs: 'Hotovost',
        en: 'Cash'
      },
      {
        token: 'card',
        cs: 'Kreditní karta',
        en: 'Credit card'
      },
      {
        token: 'email',
        cs: 'E-mail',
        en: 'E-mail'
      },
      {
        token: 'phone',
        cs: 'Telefon',
        en: 'Phone'
      },
      {
        token: 'notes.add',
        cs: 'Přidat poznámky',
        en: 'Add notes'
      },
      {
        token: 'note.add',
        cs: 'Přidat poznámku',
        en: 'Add note'
      },
      {
        token: 'notes',
        cs: 'Poznámky',
        en: 'Notes'
      },
      {
        token: 'note',
        cs: 'Poznámka',
        en: 'Note'
      },
      {
        token: 'note.private',
        cs: 'Skrytá poznámka',
        en: 'Private note'
      },
      {
        token: 'percent',
        cs: 'Procento',
        en: 'Percent'
      },
      {
        token: 'amount',
        cs: 'Částka',
        en: 'Amount'
      },
      {
        token: 'add',
        cs: 'Přidat',
        en: 'Add'
      },
      {
        token: 'update',
        cs: 'Upravit',
        en: 'Update'
      },
      {
        token: 'ok',
        cs: 'Ok',
        en: 'Ok'
      },
      {
        token: 'item.add',
        cs: 'Přidat položku',
        en: 'Add item'
      },
      {
        token: 'operation.type',
        cs: 'Typ operace',
        en: 'Operation type'
      },
      {
        token: 'operation.title',
        cs: 'Název operace',
        en: 'Operation title'
      },
      {
        token: 'title',
        cs: 'Název',
        en: 'Title'
      },
      {
        token: 'operation.submit',
        cs: 'Přidat operaci',
        en: 'Add operation'
      },
      {
        token: 'operation.update',
        cs: 'Upravit operaci',
        en: 'Update operation'
      },
      {
        token: 'print',
        cs: 'Tisk',
        en: 'Print'
      },
      {
        token: 'cash.reported',
        cs: 'Zapsaný stav',
        en: 'Reported cash amount'
      },
      {
        token: 'cash.real',
        cs: 'Skutečný stav',
        en: 'Real cash amount'
      },
      {
        token: 'operation',
        cs: 'Operace',
        en: 'Operation'
      },
      {
        token: 'operations',
        cs: 'Operace',
        en: 'Operations'
      },
      {
        token: 'set',
        cs: 'Nastavit',
        en: 'Set'
      },
      {
        token: 'date',
        cs: 'Datum',
        en: 'Date'
      },
      {
        token: 'date.issue',
        cs: 'Datum vystavení',
        en: 'Date of issue'
      },
      {
        token: 'combination',
        cs: 'Kombinace',
        en: 'Combination'
      },
      {
        token: 'payment',
        cs: 'Platba',
        en: 'Payment'
      },
      {
        token: 'sum',
        cs: 'Součet',
        en: 'Sum'
      },
      {
        token: 'final',
        cs: 'Výsledek',
        en: 'Final amount'
      },
      {
        token: 'total',
        cs: 'Celkem',
        en: 'Total'
      },
      {
        token: 'reports',
        cs: 'Reporty',
        en: 'Reports'
      },
      {
        token: 'in',
        cs: 'Příjem',
        en: 'Income'
      },
      {
        token: 'out',
        cs: 'Výdaj',
        en: 'Expense'
      },
      {
        token: 'transfer',
        cs: 'Převod',
        en: 'Transfer'
      },

      { token: 'clearAll', cs: 'clearAll', en: 'clearAll' },
      { token: 'toggleJSON', cs: 'toggleJSON', en: 'toggleJSON' },
      { token: 'getQueries', cs: 'getQueries', en: 'getQueries' },

      { token: 'user.profile', cs: 'Můj profil', en: 'Profile' },
      { token: 'user.logout', cs: 'Odhlásit se', en: 'Logout' },

      { token: 'filtering', cs: 'Filtrování', en: 'Filtering' },
      { token: 'filter.btn', cs: 'Filtrovat', en: 'Filter' },
      { token: 'filter', cs: 'Filtrovat', en: 'Filter' },
      { token: 'clear', cs: 'Vyčistit', en: 'Clear' },

      { token: 'login.server', cs: 'Server', en: 'Server' },
      { token: 'login.remember', cs: 'Pamatovat si mě', en: 'Remember me' },
      { token: 'login.btn', cs: 'Přihlásit', en: 'Login' },

      { token: 'items', cs: 'Položky', en: 'Items' },

      { token: 'back', cs: 'Zpět', en: 'Back' },
      { token: 'name', cs: 'Název', en: 'Name' },
      { token: 'code', cs: 'Kód', en: 'Code' },
      { token: 'tools', cs: 'Nástroje', en: 'Tools' },

      { token: 'users', cs: 'Seznam uživatelů', en: 'List of users' },
      { token: 'users.new', cs: 'Přidat uživatele', en: 'Add user' },
      { token: 'users.edit', cs: 'Upravit', en: 'Edit' },
      { token: 'user.new', cs: 'Nový uživatel', en: 'New user' },
      { token: 'password', cs: 'Heslo', en: 'Password' },
      { token: 'firstname', cs: 'Jméno', en: 'First name' },
      { token: 'lastname', cs: 'Příjmení', en: 'Last name' },
      { token: 'user.edit', cs: 'Úprava uživatele', en: 'Edit user' },
      { token: 'user.btn.create', cs: 'Vytvořit uživatele', en: 'Create user' },
      { token: 'user.btn.update', cs: 'Upravit uživatele', en: 'Update user' },
      { token: 'user.btn.delete', cs: 'Smazat uživatele', en: 'Delete user' },
      { token: 'password.change', cs: 'Změna hesla', en: 'Change password' },
      { token: 'password.new', cs: 'Nové heslo', en: 'New password' },
      { token: 'password.repeat', cs: 'Heslo znovu', en: 'Password repeat' },
      { token: 'password.change.btn', cs: 'Změnit heslo', en: 'Change password' },

      { token: 'modal', cs: 'Modální okno', en: 'Modal window' },
      { token: 'modal.show', cs: 'Zobrazit modální okno', en: 'Show modal window' },

      { token: 'fulltext', cs: 'Fulltext', en: 'Fulltext' },
      { token: 'dateFrom', cs: 'Datum OD', en: 'Date From' },
      { token: 'dateTo', cs: 'Datum DO', en: 'Date Till' },
      { token: 'clear.options', cs: 'Vyčistit', en: 'Clear options' },
      { token: 'select', cs: 'Vybrat', en: 'Select' },
      { token: 'clear.list', cs: 'Vyčistit seznam', en: 'Clear list' },
      { token: 'available', cs: 'Dostupné', en: 'Available' },
      { token: 'all', cs: 'Vše', en: 'All' },
      { token: 'number', cs: 'Číslo', en: 'Number' },
      { token: 'load.next', cs: 'Načíst další', en: 'Load next page' },
      { token: 'created', cs: 'Vytvořeno', en: 'Created' },
      { token: 'min', cs: 'Min', en: 'Min' },
      { token: 'max', cs: 'Max', en: 'Max' },
      { token: 'cancel', cs: 'Storno', en: 'Cancel' },
      { token: 'yes', cs: 'Ano', en: 'Yes' },
      { token: 'no', cs: 'Ne', en: 'No' },
      { token: 'close', cs: 'Zavřít', en: 'Close' },
      { token: 'no.record', cs: 'Žádný záznam', en: 'No record' },
      { token: 'back.toList', cs: 'Zpět na seznam', en: 'Back to list' },
      { token: 'select.all', cs: 'Označit vše', en: 'Select all' },
      { token: 'select.none', cs: 'Vymazat výběr', en: 'Select none' },
      { token: 'select.invert', cs: 'Otočit výběr', en: 'Invert selection' },

      { token: 'pin', cs: 'PIN', en: 'PIN' },
      { token: 'type', cs: 'Typ', en: 'Type' },
      { token: 'payment', cs: 'Platba', en: 'Payment' },
      { token: 'dateCreated', cs: 'Vytvořeno', en: 'Created' },
      { token: 'addresses', cs: 'Adresy', en: 'Addresses' },
      { token: 'address', cs: 'Adresa', en: 'Address' },
      { token: 'status', cs: 'Stav', en: 'Status' },
      { token: 'date.from', cs: 'Od', en: 'From' },
      { token: 'date.to', cs: 'Do', en: 'To' },
      { token: 'no.payments', cs: 'Žádné platby', en: 'No payments' },
      { token: 'no.note', cs: 'Žádná poznámka', en: 'No note' },
      { token: 'no.note.private', cs: 'Žádná skrytá poznámka', en: 'No private note' },
      { token: 'no.image', cs: 'Žádný obrázek', en: 'No image' },
      { token: 'notice', cs: 'Upozornění', en: 'Notice' },
      { token: 'settings', cs: 'Nastavení', en: 'Settings' },
      { token: 'user.settings', cs: 'Uživatelská nastavení', en: 'User settings' },
      { token: 'last.searched', cs: 'Poslední hledané', en: 'Last searched' },
      { token: 'last.searched.empty', cs: 'prázdné', en: 'empty' },
      { token: 'none', cs: 'Žádný', en: 'None' },
      { token: 'confirmation', cs: 'Potvrzení', en: 'Confirmation' },
      { token: 'report.error', cs: 'Nahlásit chybu', en: 'Report error' },
      { token: 'time.created', cs: 'Čas vytvoření', en: 'Time created' },
      { token: 'user', cs: 'Uživatel', en: 'User' },
      { token: 'denied', cs: 'Sem nemůžeš!', en: 'Access denied' },

      { token: 'recieved', cs: 'Přijaté', en: 'Recieved' },
      { token: 'cancelled', cs: 'Zrušeno', en: 'Cancelled' },
      { token: 'confirm', cs: 'Potvrdit', en: 'Confirm' },
      { token: 'delete', cs: 'Smazat', en: 'Delete' },
      { token: 'show', cs: 'Zobrazit', en: 'Show' },
      { token: 'edit', cs: 'Upravit', en: 'Edit' },

      { token: 'coins', cs: 'Coiny', en: 'Coins' },
      { token: 'coin', cs: 'Coin', en: 'Coin' },
      { token: 'coin.name', cs: 'Název', en: 'Name' },
      { token: 'rig.name', cs: 'Název', en: 'Name' },
      { token: 'coin.symbol', cs: 'Symbol', en: 'Symbol' },
      { token: 'coin.btcRate', cs: 'Kurz k BTC', en: 'BTC rate' },
      { token: 'coin.btcRateUrl', cs: 'Ticker URL', en: 'Ticker URL' },
      { token: 'coin.btcRateUpdated', cs: 'Kurz aktualizován', en: 'Ticker updated at' },
      { token: 'rig', cs: 'Rig', en: 'Rig' },
      { token: 'rigs', cs: 'Rigy', en: 'Rigs' },
      { token: 'direction', cs: 'Směr', en: 'Direction' },
      { token: 'time', cs: 'Čas', en: 'Time' },
      { token: 'rate.btc', cs: 'Kurz k BTC', en: 'BTC rate' },
      { token: 'amount.btc', cs: 'Částka v BTC', en: 'BTC amount' },
      { token: 'amount.btc.oldRate', cs: 'Částka v BTC (zapsané kurzy)', en: 'BTC amount (entered rates)' },
      { token: 'amount.btc.newRate', cs: 'Částka v BTC (aktuální kurzy)', en: 'BTC amount (new rates)' },
      { token: 'balance', cs: 'Částka', en: 'Balance' },
      { token: 'records', cs: 'Záznamy', en: 'Records' },
      { token: 'record', cs: 'Záznam', en: 'Record' },
      { token: 'data.download', cs: 'Uložit data', en: 'Save data' },
      { token: 'data.upload', cs: 'Nahrát data', en: 'Load data' },
      { token: 'data.saveToFile', cs: 'Uložit data do souboru', en: 'Save data to file' },
      { token: 'just.bittrex', cs: 'Pouze Bittrex, povol CORS!', en: 'Just Bittrex, enable CORS!' },
      { token: 'progress', cs: 'Vývoj', en: 'Progress' },
      { token: 'languages', cs: 'Překlady', en: 'Translations' },
      { token: 'options', cs: 'Možnosti', en: 'Options' },

      { token: 'en', cs: 'English', en: 'English' },
      { token: 'cs', cs: 'Čeština', en: 'Čeština' },

    ];
  }
}
