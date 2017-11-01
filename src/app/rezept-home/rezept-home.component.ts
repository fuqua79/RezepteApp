import {Component, OnInit} from '@angular/core';
import {RezeptService} from '../rezept/rezept.service';
import {Rezept} from "../rezept/dto/rezept";
import {Zutat} from "../rezept/dto/zutat";
import {NgRedux} from "ng2-redux";
import {IAppState} from "../common/redux/store";
import {INCREMENT} from "../common/redux/actions";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-rezept-home',
  templateUrl: './rezept-home.component.html',
  styleUrls: ['./rezept-home.component.css']
})
export class RezeptHomeComponent implements OnInit {

  public randomRezept: Rezept;
  public counter = 1;

  constructor(private rezeptService: RezeptService, private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.getRandomRezept();

///////////////////////////////////////
    //Old School
    let button2 = document.querySelector('.increment-button');
    button2.addEventListener('click', () => console.log('Clicked2!'));

    let button = document.querySelector('.increment-button');
    Observable.fromEvent(button, 'click')
      .subscribe(() => console.log('Clicked!'));
///////////////////////////////////////
//     this.test = "Häää";
  }

  increment(): void {
    console.log(">>>> increment()");
    this.ngRedux.dispatch({type: INCREMENT});
  }

  getRandomRezept(): void {
    console.log("-- RandomRezept aus dem Backend holen --");

    this.rezeptService.loadRandomRezept().subscribe(result => {
      console.log('RandomRezept erfolgreich geholt');

      console.log("result= ", result);
      this.randomRezept = result;
    });
  }

  deleteRezept(id: string): void {
    console.log("-- Rezept im Backend loeschen --");

    this.rezeptService.deleteRezept(id).subscribe(result => {
      console.log('Rezept erfolgreich geloescht');
      console.log("result= ", result);
    });
  }
}
