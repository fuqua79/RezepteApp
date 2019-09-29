import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RezeptService} from '../../service/rezept.service';
import {Rezept} from '../../model/rezept';


@Component({
  selector: 'app-rezept-liste',
  templateUrl: './rezept-liste.component.html',
  styleUrls: ['./rezept-liste.component.css'],
  providers: [RezeptService]
})
export class RezeptListeComponent implements OnInit {

  @Input()
  rezeptListe: Rezept[];

  @Input()
  isLoading: boolean;

  @Output()
  open = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  openRezept(id: string): void {
    this.open.emit(id);
  }

  selectRezept(id: string): void {
    for (let i = 0; i < this.rezeptListe.length; i++) {
      this.rezeptListe[i].selected = this.rezeptListe[i].id === id;
    }
  }
}
