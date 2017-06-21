import { Component } from '@angular/core';
import {RezeptService} from "./rezept.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RezeptService]
})
export class AppComponent {

  title = 'app by Mike mugglin';

  constructor() {
    this.mylogger('AppComponent');
  }

  ngOnInit() {
  }

  mylogger(text : string) : void {
    console.log(text);
  }

}
