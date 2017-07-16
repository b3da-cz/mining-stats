import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { isUndefined } from 'util';
import { UuidUtil } from '../../../utils';


@Component({
  selector: 'form-row-select-multiple',
  templateUrl: 'form-row-select-multiple.component.html',
  styleUrls: ['form-row-select-multiple.component.css'],
})
export class FormRowSelectMultipleComponent implements OnInit, OnChanges {
  @ViewChild('formRow') formRow: ElementRef;
  @ViewChild('select2el') select2el: ElementRef;
  @Input() label: string;
  @Input() tooltipLabel: string;
  @Input() tooltipIcon: string;
  @Input() options: any[] = [];
  @Input() optionKey: string = 'id'; // in case of options object, specify prop
  @Input() optionKeyText: string = 'name'; // in case of options object, specify prop to show on option textValue
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() inputDisabled: boolean = false;
  @Input() isMultiple: boolean;
  @Input() classes: string[] = [];
  private classesDefault: string = '';
  elementId: string;
  optionsFormatted: Select2OptionData[];
  select2options: Select2Options = {
    width: '100%',
    multiple: isUndefined(this.isMultiple) ? true : this.isMultiple,
  };
  classesString: string = '';
  constructor() {
    this.elementId = UuidUtil.generate();
  }

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  onNgModelChange(value: any): void {
    this.valueChange.emit(Array.isArray(value) ? value : value && value.value ? value.value : value);
  }

  populate(options: any) {
    const selectedOptionsFormatted = options.map(o => o[this.optionKey]);
    $('#' + this.elementId + ' select').val(selectedOptionsFormatted).trigger('change');
    // console.warn('#' + this.elementId + ' select2 populate ', selectedOptionsFormatted, this.options); // TODO: remove
  }

  clearVal() {
    $('#' + this.elementId + ' select').val('').trigger('change');
  }

  openList() {
    $('#' + this.elementId + ' select').select2('open');
  }

  closeList() {
    $('#' + this.elementId + ' select').select2('close');
  }

  private updateComponent(): void {
    this.select2options = {
      width: '100%',
      multiple: isUndefined(this.isMultiple) ? true : this.isMultiple,
    };
    this.optionsFormatted = this.options.map(o => {
      return { id: o[this.optionKey], text: o[this.optionKeyText] };
    });

    // console.warn('updating form-row-select-multiple component'); // TODO: remove
    let classesAdditional = '';
    this.classes && this.classes.length > 0 ? this.classes.forEach(cls => {
      classesAdditional += ' ' + cls;
    }) : null;
    this.classesString = this.classesDefault + classesAdditional;
  }
}
