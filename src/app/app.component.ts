import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  title = 'app';
  selectedDate: Date = new Date("01/01/01");
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      textInput: this.fb.control("prefill"),
      dateInputOne: this.fb.control(new Date("06/07/08"), Validators.required),
      dateInputTwo: this.fb.control({ value: new Date("01/02/03"), disabled: true }),
      dateInputThree: this.fb.control(new Date(""))
    })
  }
}
