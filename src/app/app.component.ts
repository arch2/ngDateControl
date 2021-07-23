import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  someText: string = "Hello World";
  someText2: string = "Hello World 2";
  selectedDate: Date = new Date("01/01/02");
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      DateRequired: fb.control('01/02/03', Validators.required),
      DateNR: fb.control(this.selectedDate),
      TF: fb.control('text', Validators.required)
    })
  }
}
