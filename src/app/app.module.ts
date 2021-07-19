import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'flatpickr/dist/flatpickr.css'; // you may need to adjust the css import depending on your build tool
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
