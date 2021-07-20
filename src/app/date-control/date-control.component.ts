import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateControlComponent),
    multi: true
  }]
})
export class DateControlComponent implements ControlValueAccessor, OnInit {
  private _value = null;
  private onChangeCallback: any;

  @ViewChild('input', { static: true })
  inputRef: ElementRef;
  @Input()
  get value(): Date { return this._value; }
  set value(value: Date) {
    this._value = value && typeof value === 'string' ? new Date(value) : new Date(null);
  }
  @Output()
  valueChange = new EventEmitter<Date>();

  ngOnInit() {
    const inputElement = <HTMLInputElement>this.inputRef.nativeElement;
    inputElement.onchange = () => this.onChange();
    inputElement.onkeyup = () => this.onChange();
  }

  writeValue(obj: any): void {
    if (obj !== this._value) {
      this._value = obj;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }
  // change events from the textarea
  private onChange() {
    const input = <HTMLInputElement>this.inputRef.nativeElement;
    // get value from text area
    const newValue = input.value;

    // update the form
    this.onChangeCallback(newValue);
  }
}