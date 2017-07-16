import { Component, OnInit, OnChanges, OnDestroy, Input, ViewChild } from '@angular/core';
import { ChartData } from '../../models';
declare const LineChart: any;


@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('chart') chartElement: any;
  @Input() data: ChartData;
  // @Input() fillColor = 'rgba(42, 116, 157, 0.44)';
  @Input() fillColor: string;
  // canvas: any;
  crosshairLabel: string;
  crosshairData: string;
  chart: any;
  chartId: string;
  isLoading = true;
  constructor() { }

  ngOnInit() {
    this.chartId = 'chart_' + (new Date().getTime()).toFixed(0).substr(-5) + '_' + Math.floor(Math.random() * 20);
    setTimeout(() => this.initChart(), 100);
    setTimeout(() => this.isLoading = false, 1000);
  }

  ngOnChanges() {
    if (this.chartId && this.chartId.length > 0 && this.chart) {
      this.initChart();
    }
  }

  ngOnDestroy() {}

  initChart(): void {
    if (!this.data) {
      console.warn('no data for chart init!');
      return;
    }
    const commonChartOptions = {
      lineWidth: 5,
      lineShadow: false,
      fillEnabled: this.fillColor && this.fillColor.length > 0,
      fillColor: this.fillColor,
      crosshairColor: '#9d1217',
      crosshairWidth: 2,
      crosshairEnabled: true,
      crosshairEventEnabled: true,
      crosshairDashed: false,
      tooltipEnabled: false,
      tooltipPrefix: '',
      labelFormatTimeEnabled: true,
      startAnimationEnabled: true,
    };
    this.chart = new LineChart(this.chartElement.nativeElement, Object.assign(commonChartOptions, {
      lineColor: this.data.color,
      tooltipPostfix: ' ' + this.data.unit,
      startAnimationSpeed: 8,
    }), {
      labels: this.data.labels,
      data: this.data.data,
    });
    this.chart.listenForCrosshairUpdate(e => {
      if (e.data && e.data.length > 0) {
        this.crosshairLabel = e.label;
        this.crosshairData = e.data;
      } else {
        this.crosshairLabel = null;
        this.crosshairData = null;
      }
    });
  }
}
