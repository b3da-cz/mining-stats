export class Translation {
  public token: string;
  public cs: string;
  public en: string;
  public constructor(data: any = {}) {
    this.token = data.token || '';
    this.cs = data.cs || '';
    this.en = data.en || '';
  }
}
