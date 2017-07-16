import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'form-row-input',
  templateUrl: 'form-row-input.component.html',
  styleUrls: ['form-row-input.component.css'],
})
export class FormRowInputComponent implements OnInit, OnChanges {
  @ViewChild('formRow') formRow: ElementRef;
  @Input() label: string;
  @Input() placeholder = '';
  @Input() tooltipLabel: string;
  @Input() tooltipIcon: string;
  @Input() value: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Output() valueChangeNative: EventEmitter<any> = new EventEmitter();
  @Output() onKeyPress: EventEmitter<any> = new EventEmitter();
  @Input() inputType: string = 'text';
  @Input() inputDisabled: boolean = false;
  @Input() classes: string[] = [];
  @Input() icon: string = 'fa-list';
  @Input() iconType = 'fal'; // fa5: fal, far, fas
  @Input() translateBarcode: boolean = false;
  @Input() replaceComma: boolean = false;
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
    // console.warn('updating form-row-input component'); // TODO: remove
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
