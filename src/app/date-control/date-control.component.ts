import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import flatpickr from 'flatpickr';
import { BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  internalDate: any;
  private currentValue: BehaviorSubject<any>;

  @Input() public options: { key; value }[];
  @ViewChild("inputField", { static: true }) inputField: ElementRef;
  @ViewChild("icon", { static: true }) iconElement: ElementRef;
  @ViewChild("hiddenDatePicker", { static: true }) hiddenDatePicker: ElementRef;

  onChange: any;
  onTouched: any;

  constructor() {
    this.currentValue = new BehaviorSubject<any>(this.value);
    this.currentValue.pipe(tap(x => {
      console.log('observable fired', x);
      this.value = x;
      console.log('what is value',this.value);
    })).subscribe();
  }

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
    // this.value = this.value ? new Date(this.value) : new Date();
    // flatpickr(this.inputField.nativeElement,null)
    const instance = flatpickr(this.iconElement.nativeElement, null) as flatpickr.Instance;
    instance.open();
    instance.config.onChange.push(this.DateSelectedEvent.bind(this))
    // instance._debouncedChange.pipe(
    //   map(x=>{console.log('value?',x)})
    // ).sub
    // instance.selectedDates

    // this.hiddenDatePicker.nativeElement.click();
    // console.log('click happened?');

  }
  DateSelectedEvent(selectedDates, dateStr, instance) {
    console.log('onchange fired', selectedDates, dateStr);
    // this.value = "test2"//selectedDates[0];
    this.currentValue.next(dateStr);
  }
  updateInput($event) {
    this.value = $event ? new Date($event) : new Date();
  }
}