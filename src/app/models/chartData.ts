export class ChartData {
  public name: string;
  public color: string;
  public unit: string;
  public labels: string[];
  public data: any[];

  public constructor(data: any = {}) {
    this.name = data.name || '';
    this.color = data.color || '';
    this.unit = data.unit || '';
    this.labels = data.labels && data.labels.length > 0 ? data.labels : [];
    this.data = data.data && data.data.length > 0 ? data.data : [];
  }
}
