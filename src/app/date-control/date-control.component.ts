import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss']
})
export class DateControlComponent implements OnInit {
  @Input()
  get value(): Date { return this._value; }
  set value(value: Date) {
    this._value = value && typeof value === 'string' ? new Date(value) : new Date(null);
  }
  private _value = null;
  @Output() valueChange = new EventEmitter<Date>();
  constructor() { }

  ngOnInit() {
  }

}
