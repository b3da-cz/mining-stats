import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'form-row-select',
  templateUrl: 'form-row-select.component.html',
  styleUrls: ['form-row-select.component.css'],
})
export class FormRowSelectComponent implements OnInit, OnChanges {
  @ViewChild('formRow') formRow: ElementRef;
  @Input() label: string;
  @Input() tooltipLabel: string;
  @Input() tooltipIcon: string;
  @Input() options: any[];
  @Input() optionKey: string = 'id'; // in case of options object, specify prop
  @Input() optionKeyText: string = 'name'; // in case of options object, specify prop to show on option textValue
  @Input() value: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() valueChangeNative: EventEmitter<any> = new EventEmitter();
  @Output() onKeyPress: EventEmitter<any> = new EventEmitter();
  @Input() inputDisabled: boolean = false;
  @Input() classes: string[] = [];
  @Input() icon: string = 'fa-list';
  @Input() iconType = 'fal'; // fa5: fal, far, fas
  @Input() btnLabel: string;
  @Input() btnClasses: string[] = [];
  @Input() btnIcon: string;
  @Output() onBtnEvent: EventEmitter<any> = new EventEmitter();
  private classesDefault: string = 'form-control';
  classesString: string = '';
  iconClassesString: string = '';
  constructor() { }

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  onBtnClick(event: any): void {
    this.onBtnEvent.emit(event);
  }

  onInputValueChange(value: string): void {
    this.valueChangeNative.emit(value);
  }

  onNgModelChange(value: string): void {
    this.valueChange.emit(value);
  }

  onInputKeyPress(value: string): void {
    this.onKeyPress.emit(value);
  }

  private updateComponent(): void {
    // console.warn('updating form-row-select component'); // TODO: remove
    let classesAdditional = '';
    this.classes && this.classes.length > 0 ? this.classes.forEach(cls => {
      classesAdditional += ' ' + cls;
    }) : null;
    this.classesString = this.classesDefault + classesAdditional;

    // icon
    let iconClasses = '';
    if (this.icon && this.icon.length > 0) {
      // iconClasses += this.icon.split('-')[0]; // not really great with fa5 icons: they diff in light/solid/regular style prefix..
      iconClasses += this.iconType; // fa5 solution
      iconClasses += ' ' + this.icon;
    }
    this.iconClassesString = iconClasses;
  }
}
