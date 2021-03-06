import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  someText: string = "Hello World";
  someText2: string = "Hello World 2";
  selectedDate: Date = new Date("01/03/2020");
  maxDate: Date = new Date('02/03/2022');
  minDate: Date = new Date('03/03/2020');
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      DateRequired: fb.control({ value: '02/04/2020', disabled: false }, [Validators.required]),
      DateNR: fb.control(this.selectedDate),
      DateEnd: fb.control('03/05/2020'),
      TF: fb.control('text', Validators.required)
    })
  }
  getFormValidationErrors(fg: FormGroup) {
    const errs = [];
    Object.keys(fg.controls).forEach(key => {

      const controlErrors: ValidationErrors = fg.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errs.push('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
    return errs;
  }
  get DateNRValue() {
    return this.form.get('DateNR').value;
  }
  get DateEnd() {
    return this.form.get('DateEnd').value;
  }
  disableFC() {
    const control = this.form.get('DateRequired');
    control.enabled ? control.disable() : control.enable();
  }
}
