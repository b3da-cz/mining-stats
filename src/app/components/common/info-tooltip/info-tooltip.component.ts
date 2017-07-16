import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'info-tooltip',
  templateUrl: 'info-tooltip.component.html',
  styleUrls: ['info-tooltip.component.css'],
})
export class InfoTooltipComponent implements OnInit, OnChanges {
  @ViewChild('infoTooltip') btn: ElementRef;
  @Input() label: string;
  @Input() icon: string;
  @Input() iconType = 'fal'; // fa5: fal, far, fas
  iconClassesDefault: string = 'fa fa-info-circle tooltip-top';
  iconClassesString: string = '';
  constructor() { }

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  private updateComponent(): void {
    let iconClasses = '';
    if (this.icon && this.icon.length > 0) {
      // iconClasses += this.icon.split('-')[0]; // not really great with fa5 icons: they diff in light/solid/regular style prefix..
      iconClasses += this.iconType; // fa5 solution
      iconClasses += ' ' + this.icon + ' tooltip-top';
    } else {
      iconClasses = this.iconClassesDefault;
    }
    this.iconClassesString = iconClasses;
  }
}
