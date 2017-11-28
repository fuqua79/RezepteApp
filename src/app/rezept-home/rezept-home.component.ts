import {Component, OnInit} from '@angular/core';
import {RezeptService} from '../rezept/rezept.service';
import {Rezept} from "../rezept/dto/rezept";

import {NgRedux} from "@angular-redux/store";
import {IAppState} from "../common/redux/store";
import {DECREMENT, INCREMENT} from "../common/redux/actions";

import {Observable} from 'rxjs';
import {Router} from "@angular/router";


@Component({
  selector: 'app-rezept-home',
  templateUrl: './rezept-home.component.html',
  styleUrls: ['./rezept-home.component.css']
})
export class RezeptHomeComponent implements OnInit {

  public randomRezept: Rezept;
  public counter$ : Observable<number>;

  constructor(private rezeptService: RezeptService,
              private ngRedux: NgRedux<IAppState>,
              private router: Router) {
    this.counter$ = ngRedux.select<number>('counter');
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
  }

  increment(): void {
    console.log(">>>> increment()");
    this.ngRedux.dispatch({type: INCREMENT});
  }

  decrement(): void {
    console.log(">>>> decrement()");
    this.ngRedux.dispatch({type: DECREMENT});
  }

  getRandomRezept(): void {
    console.log("-- RandomRezept aus dem Backend holen --");

    this.rezeptService.loadRandomRezept().subscribe(rezept => {
      console.log('RandomRezept erfolgreich geholt');
      console.log("result= ", rezept);
      this.randomRezept = rezept;
    });
  }

  openRezept(id: string): void {
    console.log('Rezpet oeffnen mit id= ', id);
    this.router.navigate(['/rezept/' + id]);
  }

}
