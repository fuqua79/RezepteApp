import { Component } from '@angular/core';
import {RezeptService} from "./rezept/rezept.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RezeptService]
})
export class AppComponent {

  constructor() {
    console.log('AppComponent started...');
  }

  ngOnInit() {
  }

}

