import { Component } from '@angular/core';

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
}
