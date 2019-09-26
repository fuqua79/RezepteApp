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
    console.log('selektieren Id= ', id);
    for (let i = 0; i < this.rezeptListe.length; i++) {
      this.rezeptListe[i].selected = false;
      if (this.rezeptListe[i].id === id) {
        this.rezeptListe[i].selected = true;
      }
    }
  }
}
