import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RezeptService} from '../../service/rezept.service';
import {Rezept} from '../../model/rezept';
import {SuchParameter} from '../../model/suchParameter';


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
  optionsArt: string[];

  @Input()
  isLoading: boolean;

  @Output()
  open = new EventEmitter<string>();

  @Output()
  search = new EventEmitter<SuchParameter>();

  public searchInputText: string;
  public searchInputZeit: number;
  public searchInputArt: string;

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

  searchRezept() {
    this.search.emit({
      text: this.searchInputText,
      zeit: this.searchInputZeit,
      art: this.searchInputArt
    });
  }

  clearArt() {
    this.searchInputArt = '';
  }
}
