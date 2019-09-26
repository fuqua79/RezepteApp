import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Rezept} from '../../model/rezept';


@Component({
  selector: 'app-rezept-home',
  templateUrl: './rezept-home.component.html',
  styleUrls: ['./rezept-home.component.css']
})
export class RezeptHomeComponent implements OnInit {

  @Input()
  randomRezept: Rezept;

  @Output()
  next = new EventEmitter<boolean>();

  @Output()
  open = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  getNextRezept(): void {
    this.next.emit(true);
  }

  openRezept(id: string): void {
    this.open.emit(id);
  }

}
