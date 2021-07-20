import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
const providers = [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateControlComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DateControlComponent),
    multi: true
  }
];
@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [providers]
})
export class DateControlComponent implements OnInit, ControlValueAccessor  {
  value:any;
  disabled = false;

  @Input() public options: { key; value }[];

  onChange: any;
  onTouched: any;

  constructor() {}

  validate() {
    const isNotValid = this.value;
    return (
      isNotValid && {
        invalid: true
      }
    );
  }
  ngOnInit(): void {}

  evaluate(event): void {
    this.value = event;
    this.onChange(this.value);
    this.onTouched();
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}