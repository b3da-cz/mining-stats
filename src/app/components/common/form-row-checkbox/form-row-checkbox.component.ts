import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'form-row-checkbox',
  templateUrl: 'form-row-checkbox.component.html',
  styleUrls: ['form-row-checkbox.component.css'],
})
export class FormRowCheckboxComponent {
  @ViewChild('formRow') formRow: ElementRef;
  @Input() label: string;
  @Input() tooltipLabel: string;
  @Input() tooltipIcon: string;
  @Input() inputDisabled = false;
  @Input() inputBig = false;
  @Input() value: string;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  onNgModelChange(value: string): void {
    this.valueChange.emit(value);
  }
}
