import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DateControlComponent } from './date-control/date-control.component';
import { DateFormControlComponent } from './date-form-control/date-form-control.component';

@NgModule({
  declarations: [
    AppComponent,
    DateControlComponent,
    DateFormControlComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlatpickrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
