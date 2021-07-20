import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import flatpickr from 'flatpickr';
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
export class DateControlComponent implements OnInit, ControlValueAccessor {
  value: any;
  disabled = false;

  @Input() public options: { key; value }[];
  @ViewChild("inputField", { static: true }) inputField: ElementRef;

  onChange: any;
  onTouched: any;

  constructor() { }

  validate() {
    const isNotValid = this.value;
    return (
      isNotValid && {
        invalid: true
      }
    );
  }
  ngOnInit(): void { }

  evaluate(event): void {
    //this.value = event;
    //  console.log('value', this.value);
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
  openCalendar(): void {
    console.log("calendar event fired");
    // const options: any = {
    //   altFormat: this.altFormat,
    //   altInput: this.altInput,
    //   altInputClass: this.altInputClass,
    //   allowInput: this.allowInput,
    //   appendTo: this.appendTo,
    //   ariaDateFormat: this.ariaDateFormat,
    //   clickOpens: this.clickOpens,
    //   dateFormat: this.dateFormat,
    //   defaultHour: this.defaultHour,
    //   defaultMinute: this.defaultMinute,
    //   defaultSeconds: this.defaultSeconds,
    //   disable: this.disable,
    //   disableMobile: this.disableMobile,
    //   enable: this.enable,
    //   enableTime: this.enableTime,
    //   enableSeconds: this.enableSeconds,
    //   formatDate: this.formatDate,
    //   hourIncrement: this.hourIncrement,
    //   defaultDate: this.initialValue,
    //   inline: this.inline,
    //   maxDate: this.maxDate,
    //   minDate: this.minDate,
    //   minuteIncrement: this.minuteIncrement,
    //   mode: this.mode,
    //   nextArrow: this.nextArrow,
    //   noCalendar: this.noCalendar,
    //   now: this.now,
    //   parseDate: this.parseDate,
    //   prevArrow: this.prevArrow,
    //   shorthandCurrentMonth: this.shorthandCurrentMonth,
    //   showMonths: this.showMonths,
    //   monthSelectorType: this.monthSelectorType,
    //   static: this.static,
    //   time24hr: this.time24hr,
    //   weekNumbers: this.weekNumbers,
    //   getWeek: this.getWeek,
    //   wrap: this.wrap,
    //   plugins: this.plugins,
    //   locale: this.locale,
    //   onChange: (selectedDates: Date[], dateString: string, instance: any) => {
    //     this.flatpickrChange.emit({ selectedDates, dateString, instance });
    //   },
    //   onOpen: (selectedDates: Date[], dateString: string, instance: any) => {
    //     this.flatpickrOpen.emit({ selectedDates, dateString, instance });
    //   },
    //   onClose: (selectedDates: Date[], dateString: string, instance: any) => {
    //     this.flatpickrClose.emit({ selectedDates, dateString, instance });
    //   },
    //   onMonthChange: (
    //     selectedDates: Date[],
    //     dateString: string,
    //     instance: any
    //   ) => {
    //     this.flatpickrMonthChange.emit({ selectedDates, dateString, instance });
    //   },
    //   onYearChange: (
    //     selectedDates: Date[],
    //     dateString: string,
    //     instance: any
    //   ) => {
    //     this.flatpickrYearChange.emit({ selectedDates, dateString, instance });
    //   },
    //   onReady: (selectedDates: Date[], dateString: string, instance: any) => {
    //     this.flatpickrReady.emit({ selectedDates, dateString, instance });
    //   },
    //   onValueUpdate: (
    //     selectedDates: Date[],
    //     dateString: string,
    //     instance: any
    //   ) => {
    //     this.flatpickrValueUpdate.emit({ selectedDates, dateString, instance });
    //   },
    //   onDayCreate: (
    //     selectedDates: Date[],
    //     dateString: string,
    //     instance: any,
    //     dayElement: HTMLElement
    //   ) => {
    //     this.flatpickrDayCreate.emit({
    //       selectedDates,
    //       dateString,
    //       instance,
    //       dayElement
    //     });
    //   }
    // };
    // flatpickr(this.elm.nativeElement,options)
    var testDate = new Date(this.value);
    testDate != null ? this.value = new Date() : this.value = testDate;
    flatpickr(this.inputField.nativeElement, null);
  }
}