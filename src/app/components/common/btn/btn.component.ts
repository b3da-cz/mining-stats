import { Component, OnInit, OnChanges, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'btn',
  templateUrl: 'btn.component.html',
  styleUrls: ['btn.component.css'],
})
export class BtnComponent implements OnInit, OnChanges {
  @ViewChild('btn') btn: ElementRef;
  @Input() label: string;
  @Input() btnType: string = 'button';
  @Input() btnDisabled: boolean = false;
  @Input() classes: string[] = [];
  @Input() icon: string;
  @Input() iconType = 'fal'; // fa5: fal, far, fas
  @Output() public onEvent: EventEmitter<any> = new EventEmitter();
  private classesDefault: string = 'btn';
  classesString: string = '';
  iconClassesString: string = '';
  constructor() { }

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  triggerEvent(): void {
    // console.warn(this.btn.nativeElement.id); // TODO: remove
    this.onEvent.emit(true);
  }

  private updateComponent(): void {
    // console.warn('updating btn component'); // TODO: remove
    let classesAdditional = '';
    this.classes && this.classes.length > 0 ? this.classes.forEach(cls => {
      classesAdditional += ' ' + cls;
    }) : null;
    this.classesString = this.classesDefault + classesAdditional + (classesAdditional.length > 0 ? '' : ' btn-default');

    // icon
    let iconClasses = '';
    if (this.icon && this.icon.length > 0) {
      // iconClasses += this.icon.split('-')[0]; // not really great with fa5 icons: they diff in light/solid/regular style prefix..
      iconClasses += this.iconType; // fa5 solution
      iconClasses += ' ' + this.icon + (this.label && this.label.length > 0 ? ' margin-right' : '');
    }
    this.iconClassesString = iconClasses;
  }
}
