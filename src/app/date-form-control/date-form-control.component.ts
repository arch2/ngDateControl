import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

const providers = [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateFormControlComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    multi: true,
    useExisting: forwardRef(() => DateFormControlComponent),
  }
]
@Component({
  selector: 'app-date-form-control',
  templateUrl: './date-form-control.component.html',
  styleUrls: ['./date-form-control.component.scss'],
  providers: providers,
})
export class DateFormControlComponent implements ControlValueAccessor, Validator, OnDestroy, OnInit {
  disabled = false;
  calendarPicker: flatpickr.Instance;
  dateFormat: string = "m/d/Y";
  internalFormControl: FormControl;
  externalFormControl: FormControl;
  Unsubscribe: Subject<null>;
  @ViewChild("icon", { static: true }) iconElement: ElementRef;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() placeHolder: string = "mm/dd/yyyy"

  onChange: any = () => { };
  onTouched: any = () => { };
  constructor(private fb: FormBuilder) {
    this.Unsubscribe = new Subject();
    this.internalFormControl = this.fb.control(null);
    this.externalFormControl = this.fb.control(null);
    this.internalFormControl.valueChanges.pipe(
      debounceTime(500),
      tap(x => {
        const val = this.internalFormControl.value;
        const newDate = val ? new Date(val) : new Date(null);
        this.externalFormControl.setValue(newDate);
      }),
      takeUntil(this.Unsubscribe)
    ).subscribe();
    this.externalFormControl.valueChanges.pipe(
      tap(x => { this.onChange(x) }),
      takeUntil(this.Unsubscribe)
    ).subscribe()
  }
  ngOnInit(): void {
    this.calendarPicker = flatpickr(this.iconElement.nativeElement, this.getFlatPickrOptions()) as flatpickr.Instance;
  }
  writeValue(obj: any): void {
    this.internalFormControl.setValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    isDisabled ? this.internalFormControl.disable() : this.internalFormControl.enable();
  }
  validate(control: AbstractControl): ValidationErrors {
    this.internalFormControl.setValidators(control.validator)
    return control.valid ? null : control.errors;
  }
  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
  ngOnDestroy(): void {
    this.Unsubscribe.next();
    this.Unsubscribe.complete();
  }
  openCalendar(): void {
    this.calendarPicker.config.minDate = this.minDate;
    this.calendarPicker.config.maxDate = this.maxDate;
    this.calendarPicker.setDate(this.externalFormControl.value)
    setTimeout(() => {
      this.calendarPicker.open();
    }, 100);
  }

  getFlatPickrOptions() {
    const options: any = {
      // altFormat: this.altFormat,
      // altInput: this.altInput,
      // altInputClass: this.altInputClass,
      // allowInput: this.allowInput,
      // appendTo: this.appendTo,
      // ariaDateFormat: this.ariaDateFormat,
      // clickOpens: this.clickOpens,
      dateFormat: this.dateFormat,
      // defaultHour: this.defaultHour,
      // defaultMinute: this.defaultMinute,
      // defaultSeconds: this.defaultSeconds,
      // disable: this.disable,
      // disableMobile: this.disableMobile,
      // enable: this.enable,
      // enableTime: this.enableTime,
      // enableSeconds: this.enableSeconds,
      // formatDate: this.formatDate,
      // hourIncrement: this.hourIncrement,
      // defaultDate: new Date(this.externalFormControl.value),
      // inline: this.inline,
      // maxDate: this.maxDate,
      // minDate: this.minDate,
      // minuteIncrement: this.minuteIncrement,
      // mode: this.mode,
      // nextArrow: this.nextArrow,
      // noCalendar: this.noCalendar,
      // now: this.now,
      // parseDate: this.parseDate,
      // prevArrow: this.prevArrow,
      // shorthandCurrentMonth: this.shorthandCurrentMonth,
      // showMonths: this.showMonths,
      // monthSelectorType: this.monthSelectorType,
      // static: this.static,
      // time24hr: this.time24hr,
      // weekNumbers: this.weekNumbers,
      // getWeek: this.getWeek,
      // wrap: this.wrap,
      // plugins: this.plugins,
      // locale: this.locale,
      onChange: (selectedDates: Date[], dateString: string, instance: any) => {
        this.internalFormControl.setValue(dateString);
      },
      // onOpen: (selectedDates: Date[], dateString: string, instance: any) => {
      //   this.flatpickrOpen.emit({ selectedDates, dateString, instance });
      // },
      // onClose: (selectedDates: Date[], dateString: string, instance: any) => {
      //   this.flatpickrClose.emit({ selectedDates, dateString, instance });
      // },
      // onMonthChange: (
      //   selectedDates: Date[],
      //   dateString: string,
      //   instance: any
      // ) => {
      //   this.flatpickrMonthChange.emit({ selectedDates, dateString, instance });
      // },
      // onYearChange: (
      //   selectedDates: Date[],
      //   dateString: string,
      //   instance: any
      // ) => {
      //   this.flatpickrYearChange.emit({ selectedDates, dateString, instance });
      // },
      // onReady: (selectedDates: Date[], dateString: string, instance: any) => {
      //   this.flatpickrReady.emit({ selectedDates, dateString, instance });
      // },
      // onValueUpdate: (
      //   selectedDates: Date[],
      //   dateString: string,
      //   instance: any
      // ) => {
      //   this.flatpickrValueUpdate.emit({ selectedDates, dateString, instance });
      // },
      // onDayCreate: (
      //   selectedDates: Date[],
      //   dateString: string,
      //   instance: any,
      //   dayElement: HTMLElement
      // ) => {
      //   this.flatpickrDayCreate.emit({
      //     selectedDates,
      //     dateString,
      //     instance,
      //     dayElement
      //   });
      // }
    };
    return options;
  }
}